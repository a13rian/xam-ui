import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchAccountForSSR } from '@/features/search/api';
import { mapPublicAccountToCompanion } from '@/features/search/utils';
import { CompanionDetailClient } from '../../../../features/companions/components/companion-detail-client';

interface CompanionPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Generate dynamic metadata for SEO
 * This runs on the server and provides meta tags for crawlers
 */
export async function generateMetadata({
  params,
}: CompanionPageProps): Promise<Metadata> {
  const { id } = await params;
  const account = await fetchAccountForSSR(id);

  if (!account) {
    return {
      title: 'Không tìm thấy',
      description: 'Trang này không tồn tại',
    };
  }

  const title = account.displayName;
  const description =
    account.tagline ||
    account.personalBio?.slice(0, 160) ||
    `Xem hồ sơ của ${account.displayName}`;

  // Get the first image for og:image
  const ogImage =
    account.coverImageUrl ||
    account.avatarUrl ||
    (account.gallery.length > 0 ? account.gallery[0].imageUrl : null);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      images: ogImage ? [{ url: ogImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

/**
 * Server Component that fetches data and renders the page
 * Data is fetched on the server for SEO
 */
export default async function CompanionDetailPage({
  params,
}: CompanionPageProps) {
  const { id } = await params;
  const account = await fetchAccountForSSR(id);

  if (!account) {
    notFound();
  }

  // Map account to companion format for the client component
  const companion = mapPublicAccountToCompanion(account);

  return <CompanionDetailClient companion={companion} />;
}
