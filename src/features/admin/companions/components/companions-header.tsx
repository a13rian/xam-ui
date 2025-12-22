import { Button } from '@/shared/components/ui/button';

export function CompanionsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Companions</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage companion profiles and applications.
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">Review Applications</Button>
        <Button>Add Companion</Button>
      </div>
    </div>
  );
}
