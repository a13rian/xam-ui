'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Building2,
  FileText,
  Link as LinkIcon,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Clock,
  Save,
} from 'lucide-react';
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
  Badge,
} from '@/shared/components/ui';
import { Progress } from '@/shared/components/ui/progress';
import { Textarea } from '@/shared/components/ui/textarea';
import { cn } from '@/shared/lib/utils';
import {
  AccountTypeEnum,
  type AccountType,
  type RegisterAccountRequest,
} from '../types';
import { usePartnerRegister } from '../api';
import { AvatarUpload } from './avatar-upload';
import { CertificationList } from './certification-list';
import { SocialMediaInput } from './social-media-input';
import { ProfilePreviewCard } from './profile-preview-card';
import { useFormDraft, formatLastSaved } from '../hooks/use-form-draft';

// Animation variants
const premiumEase = [0.22, 1, 0.36, 1] as const;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 40 : -40,
    opacity: 0,
  }),
};

const partnerFormSchema = z
  .object({
    type: z.nativeEnum(AccountTypeEnum, {
      message: 'Vui lòng chọn loại tài khoản',
    }),
    avatar: z.string().optional(),
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
    certifications: z.array(z.string()).optional(),
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
    avatar,
    displayName,
    specialization,
    yearsExperience,
    certifications,
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

  if (avatar) payload.avatar = avatar;

  if (type === AccountTypeEnum.INDIVIDUAL) {
    if (specialization) payload.specialization = specialization.trim();
    if (yearsExperience) {
      const num = Number.parseInt(yearsExperience, 10);
      if (!Number.isNaN(num)) {
        payload.yearsExperience = num;
      }
    }
    if (certifications && certifications.length > 0) {
      payload.certifications = certifications;
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

// Step configuration
const steps = [
  { id: 1, title: 'Loại tài khoản', shortTitle: 'Loại TK', icon: User },
  { id: 2, title: 'Thông tin cơ bản', shortTitle: 'Cơ bản', icon: FileText },
  { id: 3, title: 'Chi tiết', shortTitle: 'Chi tiết', icon: LinkIcon },
  { id: 4, title: 'Xác nhận', shortTitle: 'Xác nhận', icon: CheckCircle2 },
];

// Character limit component
function CharacterCount({
  current,
  max,
  className,
}: {
  current: number;
  max: number;
  className?: string;
}) {
  const isNearLimit = current > max * 0.8;
  const isOverLimit = current > max;

  return (
    <span
      className={cn(
        'text-xs transition-colors',
        isOverLimit
          ? 'text-red-500'
          : isNearLimit
            ? 'text-amber-500'
            : 'text-charcoal-light/50',
        className
      )}
    >
      {current}/{max}
    </span>
  );
}

export function PartnerRegisterForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [showDraftPrompt, setShowDraftPrompt] = useState(false);
  const { mutateAsync } = usePartnerRegister();

  // Form draft hook
  const { saveDraft, loadDraft, clearDraft, hasDraft, lastSaved } =
    useFormDraft<Partial<PartnerFormValues>>('partner-register');

  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: {
      type: AccountTypeEnum.INDIVIDUAL,
      displayName: '',
      certifications: [],
      agreeTerms: false,
    },
  });

  const watchType = form.watch('type');
  const watchDisplayName = form.watch('displayName');
  const watchSpecialization = form.watch('specialization');
  const watchBusinessName = form.watch('businessName');
  const watchBio = form.watch('personalBio');
  const watchDescription = form.watch('description');
  const watchAvatar = form.watch('avatar');
  const watchCertifications = form.watch('certifications');

  const totalSteps = 4;

  // Calculate progress percentage
  const calculateProgress = useCallback(() => {
    const values = form.getValues();
    let filledFields = 0;
    let totalFields = 0;

    // Required fields
    totalFields += 2; // type, displayName
    if (values.type) filledFields++;
    if (values.displayName?.trim()) filledFields++;

    // Optional fields based on account type
    if (values.type === AccountTypeEnum.INDIVIDUAL) {
      totalFields += 4; // avatar, specialization, bio, certifications
      if (values.avatar) filledFields++;
      if (values.specialization?.trim()) filledFields++;
      if (values.personalBio?.trim()) filledFields++;
      if (values.certifications && values.certifications.length > 0)
        filledFields++;
    } else {
      totalFields += 4; // businessName, description, website, social
      if (values.businessName?.trim()) filledFields++;
      if (values.description?.trim()) filledFields++;
      if (values.website?.trim()) filledFields++;
      if (
        values.socialFacebook?.trim() ||
        values.socialInstagram?.trim() ||
        values.socialTiktok?.trim()
      )
        filledFields++;
    }

    // Terms
    totalFields += 1;
    if (values.agreeTerms) filledFields++;

    return Math.round((filledFields / totalFields) * 100);
  }, [form]);

  const [progress, setProgress] = useState(0);

  // Update progress when form values change
  useEffect(() => {
    const subscription = form.watch(() => {
      setProgress(calculateProgress());
    });
    return () => subscription.unsubscribe();
  }, [form, calculateProgress]);

  // Check for draft on mount
  useEffect(() => {
    if (hasDraft) {
      setShowDraftPrompt(true);
    }
  }, [hasDraft]);

  // Auto-save form data
  useEffect(() => {
    const subscription = form.watch((data) => {
      // Don't save if form is empty
      if (data.displayName || data.businessName || data.specialization) {
        saveDraft(data as Partial<PartnerFormValues>);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, saveDraft]);

  const handleRestoreDraft = () => {
    const draft = loadDraft();
    if (draft) {
      form.reset({
        ...form.getValues(),
        ...draft,
      });
      toast.success('Đã khôi phục bản nháp!');
    }
    setShowDraftPrompt(false);
  };

  const handleDiscardDraft = () => {
    clearDraft();
    setShowDraftPrompt(false);
  };

  const goToStep = (step: number) => {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof PartnerFormValues)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ['type'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['displayName'];
      if (watchType === AccountTypeEnum.BUSINESS) {
        fieldsToValidate.push('businessName');
      }
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid && currentStep < totalSteps) {
      goToStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  };

  const onSubmit = async (values: PartnerFormValues) => {
    setSubmitting(true);
    try {
      const payload = mapFormToPayload(values);
      await mutateAsync(payload);
      clearDraft();
      form.reset({
        type: values.type,
        displayName: '',
        certifications: [],
        agreeTerms: false,
      });
      setCurrentStep(1);
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
    <div className="overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-sm">
      {/* Draft restore prompt */}
      <AnimatePresence>
        {showDraftPrompt && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-amber-200 bg-amber-50"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3">
              <div className="flex items-center gap-2 text-sm text-amber-800">
                <Save className="h-4 w-4" />
                <span>
                  Bạn có bản nháp chưa hoàn thành
                  {lastSaved && (
                    <span className="text-amber-600">
                      {' '}
                      ({formatLastSaved(lastSaved)})
                    </span>
                  )}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleDiscardDraft}
                  className="text-amber-700 hover:bg-amber-100 hover:text-amber-800"
                >
                  Bỏ qua
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleRestoreDraft}
                  className="bg-amber-600 text-white hover:bg-amber-700"
                >
                  Khôi phục
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header with Progress */}
      <div className="border-b border-charcoal/5 bg-cream/50 px-6 py-5 sm:px-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-medium text-charcoal sm:text-2xl">
              Đăng Ký Đối Tác
            </h2>
            <p className="mt-1 text-sm text-charcoal-light">
              Hoàn thành các bước bên dưới để gửi hồ sơ
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-charcoal-light" />
            <span className="text-charcoal-light">~5 phút</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-charcoal-light">Tiến độ hoàn thành</span>
            <span className="font-medium text-lavender-dark">{progress}%</span>
          </div>
          <Progress
            value={progress}
            className="h-2 bg-charcoal/10 [&>div]:bg-lavender-dark"
          />
        </div>
      </div>

      {/* Progress Steps */}
      <div className="border-b border-charcoal/5 px-6 py-4 sm:px-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                type="button"
                onClick={() => step.id < currentStep && goToStep(step.id)}
                disabled={step.id > currentStep}
                className={cn(
                  'flex items-center gap-2 transition-all',
                  step.id === currentStep && 'text-lavender-dark',
                  step.id < currentStep &&
                    'cursor-pointer text-charcoal hover:text-lavender-dark',
                  step.id > currentStep && 'cursor-not-allowed text-charcoal/30'
                )}
              >
                <motion.div
                  animate={{
                    scale: step.id === currentStep ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.2, ease: premiumEase }}
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors',
                    step.id === currentStep &&
                      'border-lavender-dark bg-lavender/20',
                    step.id < currentStep &&
                      'border-lavender-dark bg-lavender-dark text-white',
                    step.id > currentStep && 'border-charcoal/20'
                  )}
                >
                  {step.id < currentStep ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <step.icon className="h-4 w-4" />
                  )}
                </motion.div>
                <span className="hidden text-sm font-medium md:inline">
                  {step.title}
                </span>
                <span className="text-xs font-medium md:hidden">
                  {step.shortTitle}
                </span>
              </button>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'mx-2 h-0.5 w-6 transition-colors sm:w-8 lg:w-12',
                    step.id < currentStep ? 'bg-lavender-dark' : 'bg-charcoal/10'
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="min-h-[420px] px-6 py-6 sm:px-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: premiumEase }}
              >
                {/* Step 1: Account Type */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display text-lg font-medium text-charcoal">
                        Chọn loại tài khoản
                      </h3>
                      <p className="mt-1 text-sm text-charcoal-light">
                        Bạn đăng ký với tư cách cá nhân hay doanh nghiệp?
                      </p>
                    </div>

                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="grid gap-4 sm:grid-cols-2">
                              {/* Individual Card */}
                              <motion.label
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2, ease: premiumEase }}
                                className={cn(
                                  'group flex cursor-pointer flex-col gap-3 rounded-2xl border-2 p-5 transition-colors',
                                  field.value === AccountTypeEnum.INDIVIDUAL
                                    ? 'border-lavender-dark bg-lavender/10'
                                    : 'border-charcoal/10 hover:border-lavender/50 hover:bg-cream/50'
                                )}
                              >
                                <input
                                  type="radio"
                                  className="sr-only"
                                  value={AccountTypeEnum.INDIVIDUAL}
                                  checked={
                                    field.value === AccountTypeEnum.INDIVIDUAL
                                  }
                                  onChange={() =>
                                    field.onChange(AccountTypeEnum.INDIVIDUAL)
                                  }
                                />
                                <div
                                  className={cn(
                                    'flex h-12 w-12 items-center justify-center rounded-xl transition-colors',
                                    field.value === AccountTypeEnum.INDIVIDUAL
                                      ? 'bg-lavender-dark text-white'
                                      : 'bg-cream text-charcoal-light group-hover:bg-lavender/20 group-hover:text-lavender-dark'
                                  )}
                                >
                                  <User className="h-6 w-6" />
                                </div>
                                <div>
                                  <div className="font-medium text-charcoal">
                                    Cá nhân
                                  </div>
                                  <div className="mt-1 text-sm text-charcoal-light">
                                    Companion tự do, hoạt động độc lập
                                  </div>
                                </div>
                                {field.value === AccountTypeEnum.INDIVIDUAL && (
                                  <Badge className="w-fit bg-lavender-dark text-white">
                                    Đã chọn
                                  </Badge>
                                )}
                              </motion.label>

                              {/* Business Card */}
                              <motion.label
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2, ease: premiumEase }}
                                className={cn(
                                  'group flex cursor-pointer flex-col gap-3 rounded-2xl border-2 p-5 transition-colors',
                                  field.value === AccountTypeEnum.BUSINESS
                                    ? 'border-lavender-dark bg-lavender/10'
                                    : 'border-charcoal/10 hover:border-lavender/50 hover:bg-cream/50'
                                )}
                              >
                                <input
                                  type="radio"
                                  className="sr-only"
                                  value={AccountTypeEnum.BUSINESS}
                                  checked={
                                    field.value === AccountTypeEnum.BUSINESS
                                  }
                                  onChange={() =>
                                    field.onChange(AccountTypeEnum.BUSINESS)
                                  }
                                />
                                <div
                                  className={cn(
                                    'flex h-12 w-12 items-center justify-center rounded-xl transition-colors',
                                    field.value === AccountTypeEnum.BUSINESS
                                      ? 'bg-lavender-dark text-white'
                                      : 'bg-cream text-charcoal-light group-hover:bg-lavender/20 group-hover:text-lavender-dark'
                                  )}
                                >
                                  <Building2 className="h-6 w-6" />
                                </div>
                                <div>
                                  <div className="font-medium text-charcoal">
                                    Doanh nghiệp
                                  </div>
                                  <div className="mt-1 text-sm text-charcoal-light">
                                    Agency, công ty hoặc tổ chức
                                  </div>
                                </div>
                                {field.value === AccountTypeEnum.BUSINESS && (
                                  <Badge className="w-fit bg-lavender-dark text-white">
                                    Đã chọn
                                  </Badge>
                                )}
                              </motion.label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 2: Basic Info */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display text-lg font-medium text-charcoal">
                        Thông tin cơ bản
                      </h3>
                      <p className="mt-1 text-sm text-charcoal-light">
                        Thông tin này sẽ hiển thị trên hồ sơ công khai của bạn
                      </p>
                    </div>

                    {/* Avatar Upload */}
                    <div className="flex justify-center py-2">
                      <FormField
                        control={form.control}
                        name="avatar"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <AvatarUpload
                                value={field.value}
                                onChange={field.onChange}
                                fallbackName={watchDisplayName}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="displayName"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel className="text-charcoal">
                              Tên hiển thị{' '}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <CharacterCount
                              current={field.value?.length || 0}
                              max={200}
                            />
                          </div>
                          <FormControl>
                            <Input
                              placeholder="Ví dụ: Linh Nguyễn • Lắng nghe & chia sẻ"
                              className="border-charcoal/10 bg-cream/30 focus:border-lavender-dark focus:ring-lavender/20"
                              {...field}
                            />
                          </FormControl>
                          <p className="text-xs text-charcoal-light">
                            Tên này sẽ xuất hiện trên hồ sơ công khai của bạn
                          </p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {watchType === AccountTypeEnum.BUSINESS && (
                      <FormField
                        control={form.control}
                        name="businessName"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between">
                              <FormLabel className="text-charcoal">
                                Tên doanh nghiệp{' '}
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <CharacterCount
                                current={field.value?.length || 0}
                                max={200}
                              />
                            </div>
                            <FormControl>
                              <Input
                                placeholder="Ví dụ: Cogie Studio"
                                className="border-charcoal/10 bg-cream/30 focus:border-lavender-dark focus:ring-lavender/20"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {watchType === AccountTypeEnum.INDIVIDUAL && (
                      <>
                        <FormField
                          control={form.control}
                          name="specialization"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center justify-between">
                                <FormLabel className="text-charcoal">
                                  Chuyên môn chính
                                </FormLabel>
                                <CharacterCount
                                  current={field.value?.length || 0}
                                  max={100}
                                />
                              </div>
                              <FormControl>
                                <Input
                                  placeholder="Ví dụ: Lắng nghe tâm sự, mentor nghề nghiệp..."
                                  className="border-charcoal/10 bg-cream/30 focus:border-lavender-dark focus:ring-lavender/20"
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
                              <FormLabel className="text-charcoal">
                                Số năm kinh nghiệm
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min={0}
                                  max={50}
                                  placeholder="Ví dụ: 3"
                                  className="border-charcoal/10 bg-cream/30 focus:border-lavender-dark focus:ring-lavender/20"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                  </div>
                )}

                {/* Step 3: Details */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display text-lg font-medium text-charcoal">
                        {watchType === AccountTypeEnum.INDIVIDUAL
                          ? 'Hồ sơ chi tiết'
                          : 'Thông tin doanh nghiệp'}
                      </h3>
                      <p className="mt-1 text-sm text-charcoal-light">
                        Thông tin bổ sung giúp hồ sơ của bạn nổi bật hơn
                      </p>
                    </div>

                    {watchType === AccountTypeEnum.INDIVIDUAL ? (
                      <>
                        <FormField
                          control={form.control}
                          name="personalBio"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center justify-between">
                                <FormLabel className="text-charcoal">
                                  Giới thiệu bản thân
                                </FormLabel>
                                <CharacterCount
                                  current={field.value?.length || 0}
                                  max={1000}
                                />
                              </div>
                              <FormControl>
                                <Textarea
                                  rows={4}
                                  placeholder="Giới thiệu ngắn gọn về bản thân, phong cách trò chuyện, chủ đề bạn quan tâm..."
                                  className="border-charcoal/10 bg-cream/30 focus:border-lavender-dark focus:ring-lavender/20"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="certifications"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-charcoal">
                                Chứng chỉ & Bằng cấp
                              </FormLabel>
                              <FormControl>
                                <CertificationList
                                  value={field.value || []}
                                  onChange={field.onChange}
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
                              <FormLabel className="text-charcoal">
                                Link portfolio
                              </FormLabel>
                              <FormControl>
                                <SocialMediaInput
                                  platform="website"
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    ) : (
                      <>
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center justify-between">
                                <FormLabel className="text-charcoal">
                                  Mô tả doanh nghiệp
                                </FormLabel>
                                <CharacterCount
                                  current={field.value?.length || 0}
                                  max={2000}
                                />
                              </div>
                              <FormControl>
                                <Textarea
                                  rows={4}
                                  placeholder="Mô tả ngắn về dịch vụ, đội ngũ và giá trị mà bạn mang lại..."
                                  className="border-charcoal/10 bg-cream/30 focus:border-lavender-dark focus:ring-lavender/20"
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
                                <FormLabel className="text-charcoal">
                                  Mã số thuế
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Nhập mã số thuế"
                                    className="border-charcoal/10 bg-cream/30 focus:border-lavender-dark focus:ring-lavender/20"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="companySize"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-charcoal">
                                  Quy mô công ty
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Ví dụ: 1–5, 6–20..."
                                    className="border-charcoal/10 bg-cream/30 focus:border-lavender-dark focus:ring-lavender/20"
                                    {...field}
                                  />
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
                              <FormLabel className="text-charcoal">
                                Website
                              </FormLabel>
                              <FormControl>
                                <SocialMediaInput
                                  platform="website"
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="space-y-3">
                          <FormLabel className="text-charcoal">
                            Mạng xã hội
                          </FormLabel>
                          <div className="grid gap-3 sm:grid-cols-3">
                            <FormField
                              control={form.control}
                              name="socialFacebook"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <SocialMediaInput
                                      platform="facebook"
                                      value={field.value}
                                      onChange={field.onChange}
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
                                  <FormControl>
                                    <SocialMediaInput
                                      platform="instagram"
                                      value={field.value}
                                      onChange={field.onChange}
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
                                  <FormControl>
                                    <SocialMediaInput
                                      platform="tiktok"
                                      value={field.value}
                                      onChange={field.onChange}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Step 4: Confirmation */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display text-lg font-medium text-charcoal">
                        Xác nhận & Gửi hồ sơ
                      </h3>
                      <p className="mt-1 text-sm text-charcoal-light">
                        Kiểm tra lại thông tin và đồng ý điều khoản
                      </p>
                    </div>

                    {/* Profile Preview */}
                    <ProfilePreviewCard
                      avatar={watchAvatar}
                      displayName={watchDisplayName}
                      accountType={watchType}
                      specialization={watchSpecialization}
                      businessName={watchBusinessName}
                      bio={
                        watchType === AccountTypeEnum.INDIVIDUAL
                          ? watchBio
                          : watchDescription
                      }
                      certifications={watchCertifications}
                    />

                    <FormField
                      control={form.control}
                      name="agreeTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start gap-3 space-y-0 rounded-xl border border-charcoal/10 bg-white p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="mt-0.5 border-charcoal/30 data-[state=checked]:border-lavender-dark data-[state=checked]:bg-lavender-dark"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-snug">
                            <FormLabel className="text-sm font-normal text-charcoal">
                              Tôi đồng ý với{' '}
                              <a
                                href="/terms"
                                target="_blank"
                                className="font-medium text-lavender-dark hover:underline"
                              >
                                Điều khoản dịch vụ
                              </a>{' '}
                              và{' '}
                              <a
                                href="/privacy"
                                target="_blank"
                                className="font-medium text-lavender-dark hover:underline"
                              >
                                Chính sách bảo mật
                              </a>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between border-t border-charcoal/5 bg-cream/30 px-6 py-4 sm:px-8">
            <Button
              type="button"
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="text-charcoal hover:bg-charcoal/5 hover:text-charcoal"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Button>

            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-lavender-dark text-white hover:bg-lavender-dark/90"
              >
                Tiếp theo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={submitting}
                className="bg-lavender-dark text-white hover:bg-lavender-dark/90"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  <>
                    Gửi hồ sơ
                    <CheckCircle2 className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
