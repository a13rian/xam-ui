// Types
export type {
  CompanionLocation,
  CompanionProfile as CompanionProfileType,
  CompanionPricing,
  CompanionRating,
  CompanionBadge,
  Companion,
  MapBounds,
  MapViewState,
  CompanionsListResponse,
} from './types';

// API
export {
  fetchCompanions,
  getCompanion,
  useCompanions,
  useCompanion,
  type CompanionSearchParams,
} from './api';

// Utils
export { formatPrice } from './utils/format-price';
export { LANGUAGE_NAMES, getLanguageName } from './utils/language-names';

// Components
export {
  CompanionCard,
  CompanionCardBadge,
  CompanionCardCarousel,
  CompanionList,
  CompanionMap,
  CompanionDetailClient,
  CompanionHeader,
  CompanionHero,
  CompanionProfile,
  CompanionGallery,
  CompanionBio,
} from './components';
