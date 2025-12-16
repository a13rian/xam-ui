import { SearchPageClient } from '@/features/search';
import { mockCompanions } from '@/shared/mock-data';

export const metadata = {
  title: 'Tìm kiếm người đồng hành | Cogie',
  description:
    'Tìm người để trò chuyện, tâm sự và gặp mặt ngoài đời. Kết nối với những người bạn đồng hành phù hợp.',
};

export default function SearchPage() {
  return <SearchPageClient initialCompanions={mockCompanions} />;
}
