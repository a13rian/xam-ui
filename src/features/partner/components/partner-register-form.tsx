'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/shared/components/ui';
import { Textarea } from '@/shared/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';
import {
  AccountTypeEnum,
  type AccountType,
  type RegisterAccountRequest,
} from '../types';
import { usePartnerRegister } from '../api';

const partnerFormSchema = z
  .object({
    type: z.nativeEnum(AccountTypeEnum, {
      message: 'Vui lòng chọn loại tài khoản',
    }),
    displayName: z
      .string()
      .min(2, 'Tên hiển thị phải có ít nhất 2 ký tự')
      .max(200, 'Tên hiển thị không được vượt quá 200 ký tự'),
    specialization: z.string().max(100).optional(),
    yearsExperience: z
      .string()
      .optional()
      .refine(
        (val) =>
          !val ||
          (!Number.isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 50),
        {
          message: 'Số năm kinh nghiệm phải từ 0 đến 50',
        }
      ),
    certificationsText: z.string().max(1000).optional(),
    portfolio: z
      .string()
      .url('Link portfolio không hợp lệ')
      .max(255)
      .optional()
      .or(z.literal('')),
    personalBio: z.string().max(1000).optional(),
    businessName: z.string().max(200).optional(),
    description: z.string().max(2000).optional(),
    taxId: z.string().max(50).optional(),
    businessLicense: z.string().max(100).optional(),
    companySize: z.string().max(20).optional(),
    website: z
      .string()
      .url('Website không hợp lệ')
      .max(255)
      .optional()
      .or(z.literal('')),
    socialFacebook: z
      .string()
      .url('Facebook URL không hợp lệ')
      .max(255)
      .optional()
      .or(z.literal('')),
    socialInstagram: z
      .string()
      .url('Instagram URL không hợp lệ')
      .max(255)
      .optional()
      .or(z.literal('')),
    socialTiktok: z
      .string()
      .url('TikTok URL không hợp lệ')
      .max(255)
      .optional()
      .or(z.literal('')),
    establishedDate: z.string().optional(),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: 'Bạn cần đồng ý với Điều khoản dịch vụ và Chính sách bảo mật',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.type === AccountTypeEnum.BUSINESS) {
      if (!data.businessName || !data.businessName.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['businessName'],
          message: 'Tên doanh nghiệp là bắt buộc cho tài khoản doanh nghiệp',
        });
      }
    }
  });

type PartnerFormValues = z.infer<typeof partnerFormSchema>;

function mapFormToPayload(values: PartnerFormValues): RegisterAccountRequest {
  const {
    type,
    displayName,
    specialization,
    yearsExperience,
    certificationsText,
    portfolio,
    personalBio,
    businessName,
    description,
    taxId,
    businessLicense,
    companySize,
    website,
    socialFacebook,
    socialInstagram,
    socialTiktok,
    establishedDate,
  } = values;

  const payload: RegisterAccountRequest = {
    type: type as AccountType,
    displayName: displayName.trim(),
  };

  if (type === AccountTypeEnum.INDIVIDUAL) {
    if (specialization) payload.specialization = specialization.trim();
    if (yearsExperience) {
      const num = Number.parseInt(yearsExperience, 10);
      if (!Number.isNaN(num)) {
        payload.yearsExperience = num;
      }
    }
    if (certificationsText) {
      const list = certificationsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      if (list.length) payload.certifications = list;
    }
    if (portfolio) payload.portfolio = portfolio.trim();
    if (personalBio) payload.personalBio = personalBio.trim();
  }

  if (type === AccountTypeEnum.BUSINESS) {
    if (businessName) payload.businessName = businessName.trim();
    if (description) payload.description = description.trim();
    if (taxId) payload.taxId = taxId.trim();
    if (businessLicense) payload.businessLicense = businessLicense.trim();
    if (companySize) payload.companySize = companySize.trim();
    if (website) payload.website = website.trim();

    const socialMedia: Record<string, string> = {};
    if (socialFacebook) socialMedia.facebook = socialFacebook.trim();
    if (socialInstagram) socialMedia.instagram = socialInstagram.trim();
    if (socialTiktok) socialMedia.tiktok = socialTiktok.trim();
    if (Object.keys(socialMedia).length) payload.socialMedia = socialMedia;

    if (establishedDate) payload.establishedDate = establishedDate;
  }

  return payload;
}

export function PartnerRegisterForm() {
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePartnerRegister();

  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: {
      type: AccountTypeEnum.INDIVIDUAL,
      displayName: '',
      agreeTerms: false,
    },
  });

  const watchType = form.watch('type');

  const onSubmit = async (values: PartnerFormValues) => {
    setSubmitting(true);
    try {
      const payload = mapFormToPayload(values);
      await mutateAsync(payload);
      form.reset({
        type: values.type,
        displayName: '',
        agreeTerms: false,
      });
    } catch (error) {
      const msg =
        error && typeof error === 'object' && 'message' in error
          ? (error as { message: string }).message
          : 'Có lỗi xảy ra. Vui lòng thử lại.';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">
          Đăng ký trở thành Partner
        </h1>
        <p className="text-sm text-gray-500">
          Hoàn thành thông tin bên dưới để gửi hồ sơ đăng ký. Đội ngũ Cogie sẽ
          xem xét và phê duyệt trong thời gian sớm nhất.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-3">
            <FormLabel>Loại tài khoản</FormLabel>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      className="grid gap-3 sm:grid-cols-2"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4 hover:border-orange-400 hover:bg-orange-50">
                        <RadioGroupItem
                          value={AccountTypeEnum.INDIVIDUAL}
                          className="mt-1"
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            Cá nhân
                          </div>
                          <div className="text-xs text-gray-500">
                            Bạn là companion tự do, hoạt động độc lập.
                          </div>
                        </div>
                      </label>
                      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4 hover:border-orange-400 hover:bg-orange-50">
                        <RadioGroupItem
                          value={AccountTypeEnum.BUSINESS}
                          className="mt-1"
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            Doanh nghiệp / Agency
                          </div>
                          <div className="text-xs text-gray-500">
                            Bạn đại diện cho tổ chức, agency hoặc công ty.
                          </div>
                        </div>
                      </label>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên hiển thị</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ví dụ: Linh Nguyễn • Lắng nghe & chia sẻ"
                    {...field}
                  />
                </FormControl>
                <p className="text-xs text-gray-500">
                  Tên này sẽ xuất hiện trên hồ sơ công khai của bạn.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchType === AccountTypeEnum.INDIVIDUAL && (
            <div className="space-y-4 rounded-xl bg-gray-50 p-4">
              <h2 className="text-sm font-semibold text-gray-800">
                Hồ sơ cá nhân
              </h2>
              <FormField
                control={form.control}
                name="specialization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chuyên môn chính</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ví dụ: Lắng nghe tâm sự, mentor nghề nghiệp..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yearsExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số năm kinh nghiệm</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={50}
                        placeholder="Ví dụ: 3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="certificationsText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chứng chỉ (mỗi dòng 1 chứng chỉ)</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder={
                          'Ví dụ:\nChứng chỉ tư vấn tâm lý ABC\nKhóa học lắng nghe chủ động XYZ'
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="portfolio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link portfolio (nếu có)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personalBio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giới thiệu bản thân</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="Giới thiệu ngắn gọn về bản thân, phong cách trò chuyện, chủ đề bạn quan tâm..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {watchType === AccountTypeEnum.BUSINESS && (
            <div className="space-y-4 rounded-xl bg-gray-50 p-4">
              <h2 className="text-sm font-semibold text-gray-800">
                Thông tin doanh nghiệp / agency
              </h2>
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên doanh nghiệp *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ví dụ: Cogie Studio, ABC Agency..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả doanh nghiệp</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="Mô tả ngắn về dịch vụ, đội ngũ và giá trị mà bạn mang lại..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="taxId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mã số thuế</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập mã số thuế (nếu có)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="businessLicense"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giấy phép kinh doanh</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Số giấy phép hoặc mô tả ngắn"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="companySize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quy mô công ty</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ví dụ: 1–5, 6–20, 21–50..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="establishedDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ngày thành lập</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-4 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name="socialFacebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://facebook.com/..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="socialInstagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://instagram.com/..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="socialTiktok"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TikTok</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://tiktok.com/@..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          <FormField
            control={form.control}
            name="agreeTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start gap-3 space-y-0 rounded-xl bg-gray-50 p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-0.5"
                  />
                </FormControl>
                <div className="space-y-1 leading-snug">
                  <FormLabel className="text-sm font-normal text-gray-700">
                    Tôi đồng ý với{' '}
                    <a
                      href="/terms"
                      className="font-medium text-orange-600 hover:underline"
                    >
                      Điều khoản dịch vụ
                    </a>{' '}
                    và{' '}
                    <a
                      href="/privacy"
                      className="font-medium text-orange-600 hover:underline"
                    >
                      Chính sách bảo mật
                    </a>
                    .
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600"
              disabled={submitting}
            >
              {submitting ? 'Đang gửi hồ sơ...' : 'Gửi hồ sơ đăng ký'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
