// ============================================
// Favorites Types
// ============================================

import type { Companion } from '@/features/companions';

export interface FavoriteCompanion extends Companion {
  favoritedAt: string;
}

export interface FavoritesListResponse {
  items: FavoriteCompanion[];
  total: number;
}
