import {
  CompanionsHeader,
  CompanionsFilters,
  CompanionsGrid,
} from '@/features/admin/companions';

export default function AdminCompanionsPage() {
  return (
    <div className="space-y-8">
      <CompanionsHeader />
      <CompanionsFilters />
      <CompanionsGrid />
    </div>
  );
}
