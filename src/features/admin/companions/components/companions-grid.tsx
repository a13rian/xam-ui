import { AdminCompanionCard } from './companion-card';

// Mock data - will be replaced with API data
const mockCompanions = [1, 2, 3, 4, 5, 6].map((i) => ({
  id: i,
  name: `Companion ${i}`,
  location: 'New York, USA',
  rating: 4 + i * 0.1,
  reviewCount: 120 + i,
  hourlyRate: 50 + i * 10,
  isVerified: true,
}));

export function CompanionsGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {mockCompanions.map((companion) => (
        <AdminCompanionCard key={companion.id} {...companion} />
      ))}
    </div>
  );
}
