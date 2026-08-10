export interface Country {
  code: string
  name: string
  dial: string
  flag: string
  europe?: boolean
}

export const COUNTRIES: Country[] = [
  // ── Europe (priority) ──────────────────────────────
  { code: 'GB', name: 'United Kingdom',  dial: '+44',  flag: '🇬🇧', europe: true },
  { code: 'DE', name: 'Germany',         dial: '+49',  flag: '🇩🇪', europe: true },
  { code: 'FR', name: 'France',          dial: '+33',  flag: '🇫🇷', europe: true },
  { code: 'IT', name: 'Italy',           dial: '+39',  flag: '🇮🇹', europe: true },
  { code: 'ES', name: 'Spain',           dial: '+34',  flag: '🇪🇸', europe: true },
  { code: 'NL', name: 'Netherlands',     dial: '+31',  flag: '🇳🇱', europe: true },
  { code: 'BE', name: 'Belgium',         dial: '+32',  flag: '🇧🇪', europe: true },
  { code: 'AT', name: 'Austria',         dial: '+43',  flag: '🇦🇹', europe: true },
  { code: 'CH', name: 'Switzerland',     dial: '+41',  flag: '🇨🇭', europe: true },
  { code: 'PT', name: 'Portugal',        dial: '+351', flag: '🇵🇹', europe: true },
  { code: 'PL', name: 'Poland',          dial: '+48',  flag: '🇵🇱', europe: true },
  { code: 'CZ', name: 'Czech Republic',  dial: '+420', flag: '🇨🇿', europe: true },
  { code: 'HU', name: 'Hungary',         dial: '+36',  flag: '🇭🇺', europe: true },
  { code: 'RO', name: 'Romania',         dial: '+40',  flag: '🇷🇴', europe: true },
  { code: 'BG', name: 'Bulgaria',        dial: '+359', flag: '🇧🇬', europe: true },
  { code: 'GR', name: 'Greece',          dial: '+30',  flag: '🇬🇷', europe: true },
  { code: 'SE', name: 'Sweden',          dial: '+46',  flag: '🇸🇪', europe: true },
  { code: 'NO', name: 'Norway',          dial: '+47',  flag: '🇳🇴', europe: true },
  { code: 'DK', name: 'Denmark',         dial: '+45',  flag: '🇩🇰', europe: true },
  { code: 'FI', name: 'Finland',         dial: '+358', flag: '🇫🇮', europe: true },
  { code: 'IE', name: 'Ireland',         dial: '+353', flag: '🇮🇪', europe: true },
  { code: 'SK', name: 'Slovakia',        dial: '+421', flag: '🇸🇰', europe: true },
  { code: 'HR', name: 'Croatia',         dial: '+385', flag: '🇭🇷', europe: true },
  { code: 'SI', name: 'Slovenia',        dial: '+386', flag: '🇸🇮', europe: true },
  { code: 'EE', name: 'Estonia',         dial: '+372', flag: '🇪🇪', europe: true },
  { code: 'LV', name: 'Latvia',          dial: '+371', flag: '🇱🇻', europe: true },
  { code: 'LT', name: 'Lithuania',       dial: '+370', flag: '🇱🇹', europe: true },
  { code: 'LU', name: 'Luxembourg',      dial: '+352', flag: '🇱🇺', europe: true },
  { code: 'MT', name: 'Malta',           dial: '+356', flag: '🇲🇹', europe: true },
  { code: 'CY', name: 'Cyprus',          dial: '+357', flag: '🇨🇾', europe: true },
  // ── Rest of world ──────────────────────────────────
  { code: 'US', name: 'United States',   dial: '+1',   flag: '🇺🇸' },
  { code: 'CA', name: 'Canada',          dial: '+1',   flag: '🇨🇦' },
  { code: 'AU', name: 'Australia',       dial: '+61',  flag: '🇦🇺' },
  { code: 'IN', name: 'India',           dial: '+91',  flag: '🇮🇳' },
  { code: 'CN', name: 'China',           dial: '+86',  flag: '🇨🇳' },
  { code: 'JP', name: 'Japan',           dial: '+81',  flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea',     dial: '+82',  flag: '🇰🇷' },
  { code: 'BR', name: 'Brazil',          dial: '+55',  flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico',          dial: '+52',  flag: '🇲🇽' },
  { code: 'ZA', name: 'South Africa',    dial: '+27',  flag: '🇿🇦' },
  { code: 'NG', name: 'Nigeria',         dial: '+234', flag: '🇳🇬' },
  { code: 'PK', name: 'Pakistan',        dial: '+92',  flag: '🇵🇰' },
  { code: 'BD', name: 'Bangladesh',      dial: '+880', flag: '🇧🇩' },
  { code: 'TR', name: 'Turkey',          dial: '+90',  flag: '🇹🇷' },
  { code: 'SA', name: 'Saudi Arabia',    dial: '+966', flag: '🇸🇦' },
  { code: 'AE', name: 'UAE',             dial: '+971', flag: '🇦🇪' },
  { code: 'EG', name: 'Egypt',           dial: '+20',  flag: '🇪🇬' },
  { code: 'AR', name: 'Argentina',       dial: '+54',  flag: '🇦🇷' },
  { code: 'ID', name: 'Indonesia',       dial: '+62',  flag: '🇮🇩' },
  { code: 'PH', name: 'Philippines',     dial: '+63',  flag: '🇵🇭' },
]
