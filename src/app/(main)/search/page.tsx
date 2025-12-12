import { SearchPageClient } from "@/components/search/search-page-client";
import { mockProperties } from "@/lib/mock-data/properties";

export const metadata = {
  title: "Search Properties | Cogie",
  description: "Find your perfect vacation rental from our curated collection of properties.",
};

export default function SearchPage() {
  return <SearchPageClient initialProperties={mockProperties} />;
}
