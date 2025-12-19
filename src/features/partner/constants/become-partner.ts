import {
  Wallet,
  Calendar,
  Shield,
  Heart,
  Sparkles,
  BadgeCheck,
  TrendingUp,
  MessageCircleHeart,
  type LucideIcon,
} from 'lucide-react';

export interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

export interface Step {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
  color: string;
}

export const benefits: Benefit[] = [
  {
    icon: Wallet,
    title: 'Thu nhập linh hoạt',
    description: 'Tự định giá dịch vụ và nhận thanh toán nhanh chóng, minh bạch.',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    icon: Calendar,
    title: 'Chủ động thời gian',
    description: 'Tự sắp xếp lịch làm việc phù hợp với cuộc sống của bạn.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Shield,
    title: 'An toàn & Bảo mật',
    description: 'Hệ thống xác minh danh tính và bảo vệ thông tin cá nhân.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: Heart,
    title: 'Kết nối ý nghĩa',
    description: 'Mang lại giá trị thực sự cho người cần được lắng nghe.',
    color: 'bg-rose-100 text-rose-600',
  },
];

export const steps: Step[] = [
  {
    number: '01',
    title: 'Gửi hồ sơ đăng ký',
    description: 'Điền thông tin cá nhân và chuyên môn của bạn',
    icon: Sparkles,
  },
  {
    number: '02',
    title: 'Xác minh danh tính',
    description: 'Đội ngũ Cogie sẽ xem xét và xác minh hồ sơ',
    icon: BadgeCheck,
  },
  {
    number: '03',
    title: 'Thiết lập hồ sơ',
    description: 'Cài đặt lịch làm việc, giá dịch vụ và giới thiệu bản thân',
    icon: TrendingUp,
  },
  {
    number: '04',
    title: 'Bắt đầu nhận booking',
    description: 'Kết nối với khách hàng và tạo ra những cuộc trò chuyện ý nghĩa',
    icon: MessageCircleHeart,
  },
];

export const faqs: FAQ[] = [
  {
    question: 'Làm thế nào để trở thành Partner trên Cogie?',
    answer:
      'Bạn chỉ cần điền form đăng ký bên dưới với thông tin cá nhân và chuyên môn. Đội ngũ Cogie sẽ xem xét hồ sơ trong vòng 24-48 giờ và liên hệ lại với bạn.',
  },
  {
    question: 'Cogie có thu phí từ Partner không?',
    answer:
      'Cogie thu một khoản phí hoa hồng nhỏ từ mỗi booking thành công. Bạn sẽ nhận được thông tin chi tiết về chính sách phí khi hồ sơ được duyệt.',
  },
  {
    question: 'Tôi có thể tự định giá dịch vụ không?',
    answer:
      'Hoàn toàn có thể! Bạn toàn quyền quyết định mức giá cho mỗi giờ làm việc của mình dựa trên kinh nghiệm và chuyên môn.',
  },
  {
    question: 'Làm sao để đảm bảo an toàn khi gặp khách hàng?',
    answer:
      'Cogie có hệ thống xác minh danh tính cho cả Partner và khách hàng. Ngoài ra, bạn có thể chọn địa điểm gặp mặt công cộng và có hệ thống báo cáo nếu gặp vấn đề.',
  },
  {
    question: 'Tôi cần có chứng chỉ hay bằng cấp gì không?',
    answer:
      'Không bắt buộc. Tuy nhiên, nếu bạn có các chứng chỉ liên quan (tâm lý học, coaching, v.v.), đây sẽ là lợi thế giúp bạn thu hút khách hàng hơn.',
  },
];

export const stats: Stat[] = [
  { value: '500+', label: 'Partner đang hoạt động' },
  { value: '10,000+', label: 'Kết nối thành công' },
  { value: '4.9/5', label: 'Đánh giá trung bình' },
  { value: '98%', label: 'Tỷ lệ hài lòng' },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Minh Anh',
    role: 'Partner từ 2023',
    content:
      'Cogie đã giúp tôi có thêm thu nhập linh hoạt bên cạnh công việc chính. Quan trọng hơn, tôi cảm thấy có ý nghĩa khi được lắng nghe và chia sẻ với mọi người.',
    avatar: 'MA',
    color: 'bg-orange-200',
  },
  {
    name: 'Thanh Hà',
    role: 'Partner từ 2024',
    content:
      'Quy trình đăng ký nhanh chóng và đội ngũ hỗ trợ rất tận tình. Tôi yêu thích sự linh hoạt về thời gian mà Cogie mang lại.',
    avatar: 'TH',
    color: 'bg-blue-200',
  },
];
