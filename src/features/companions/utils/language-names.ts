/**
 * Language code to display name mapping
 */
export const LANGUAGE_NAMES: Record<string, string> = {
  vi: 'Tiếng Việt',
  en: 'English',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  fr: 'Français',
};

/**
 * Get display name for a language code
 */
export function getLanguageName(code: string): string {
  return LANGUAGE_NAMES[code] || code;
}
