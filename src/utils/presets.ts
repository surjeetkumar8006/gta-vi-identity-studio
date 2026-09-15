import type { Territory, Property, Vehicle, StylePreset, CharacterProfile } from '../types/empire';

// Sample SVG Avatars for instant preview
const createSvgAvatar = (bg1: string, bg2: string, iconText: string, accessory: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bg1}" />
        <stop offset="0%" stop-color="${bg2}" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="400" height="400" fill="url(#grad)" />
    <!-- Sun disk -->
    <circle cx="200" cy="180" r="110" fill="#ff007f" opacity="0.35" />
    <circle cx="200" cy="180" r="85" fill="#ff8a00" opacity="0.6" />
    
    <!-- Synth lines -->
    <line x1="0" y1="320" x2="400" y2="320" stroke="#00f0ff" stroke-width="2" opacity="0.5" />
    <line x1="0" y1="350" x2="400" y2="350" stroke="#00f0ff" stroke-width="3" opacity="0.7" />
    <line x1="0" y1="380" x2="400" y2="380" stroke="#ff007f" stroke-width="4" opacity="0.9" />

    <!-- Palm Trees Silhouette -->
    <path d="M 30,400 Q 50,280 80,240 Q 60,220 20,240 Q 70,200 100,230 Q 110,180 60,180 Q 120,190 120,240 L 90,400 Z" fill="#090714" />
    <path d="M 370,400 Q 350,290 320,250 Q 340,230 380,250 Q 330,210 300,240 Q 290,190 340,190 Q 280,200 280,250 L 310,400 Z" fill="#090714" />

    <!-- Avatar Character Silhouette -->
    <circle cx="200" cy="170" r="55" fill="#120e29" stroke="#00f0ff" stroke-width="4" filter="url(#glow)" />
    <path d="M 120,360 Q 130,250 200,250 Q 270,250 280,360 Z" fill="#120e29" stroke="#ff007f" stroke-width="4" filter="url(#glow)" />

    <!-- Text Badge -->
    <text x="200" y="180" font-family="'Orbitron', sans-serif" font-size="38" font-weight="900" fill="#ffffff" text-anchor="middle">${iconText}</text>
    <text x="200" y="320" font-family="'Inter', sans-serif" font-size="16" font-weight="800" fill="#00f0ff" text-anchor="middle" letter-spacing="4">${accessory}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const CHARACTER_PRESETS = [
  {
    id: 'preset_lucia',
    name: 'Lucia (Hustler)',
    role: 'hustler',
    avatar: createSvgAvatar('#ff007f', '#3a0ca3', 'L', 'VICE HUSTLER'),
  },
  {
    id: 'preset_jason',
    name: 'Jason (Racer)',
    role: 'street_racer',
    avatar: createSvgAvatar('#00f0ff', '#7209b7', 'J', 'DRIFT KING'),
  },
  {
    id: 'preset_boss',
    name: 'El Patron (Mogul)',
    role: 'entrepreneur',
    avatar: createSvgAvatar('#ff8a00', '#4a0e17', 'E', 'SYNDICATE BOSS'),
  },
  {
    id: 'preset_hacker',
    name: 'Viper (Hacker)',
    role: 'hacker',
    avatar: createSvgAvatar('#4cc9f0', '#10002b', 'V', 'CYBER GHOST'),
  },
  {
    id: 'preset_biker',
    name: 'Axel (Biker)',
    role: 'biker',
    avatar: createSvgAvatar('#f72585', '#240046', 'A', 'OUTLAW BIKER'),
  },
];

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: 'vice_sunset',
    name: '🌴 Vice City Sunset',
    subtitle: 'Classic Synthwave & Neon Glow',
    accentColor: '#ff007f',
    badge: 'VICE CLASSIC',
    filterEffect: 'contrast(120%) saturate(140%) hue-rotate(-10deg)',
    description: 'Vibrant pink-orange sunset tones with high contrast aesthetics.',
  },
  {
    id: 'midnight_syndicate',
    name: '🌃 Midnight Syndicate',
    subtitle: 'Electric Cyan & Dark Vault',
    accentColor: '#00f0ff',
    badge: 'MIDNIGHT',
    filterEffect: 'contrast(130%) brightness(95%) hue-rotate(180deg)',
    description: 'Underground cybernetic dark blue and neon cyan tones.',
  },
  {
    id: 'neon_heist',
    name: '🔥 Neon Heist',
    subtitle: 'High Voltage Gold & Fire',
    accentColor: '#ff8a00',
    badge: 'HEIST MASTER',
    filterEffect: 'saturate(180%) sepia(20%) brightness(105%)',
    description: 'Aggressive warm glow engineered for high stakes action.',
  },
  {
    id: 'street_outlaw',
    name: '🏎️ Street Outlaw',
    subtitle: 'Gritty CRT Scanlines & Grain',
    accentColor: '#9d4edd',
    badge: 'STREET OUTLAW',
    filterEffect: 'grayscale(30%) contrast(140%) brightness(110%)',
    description: 'Raw high-octane speedrunner aesthetic.',
  },
  {
    id: 'luxury_king',
    name: '💎 Luxury Mogul',
    subtitle: 'Pure Gold & Diamond Shine',
    accentColor: '#ffd700',
    badge: 'LUXURY MOGUL',
    filterEffect: 'sepia(40%) saturate(160%) brightness(110%)',
    description: 'Exclusive 24K gold tint for Vice City elite.',
  },
];

export const TERRITORIES: Territory[] = [
  {
    id: 'downtown',
    name: 'Downtown Vice',
    tagline: 'Skyscrapers & Financial Heists',
    dangerLevel: 'HIGH (4/5 Stars)',
    controlBonus: '+25% Money & Influence',
    iconName: 'Building2',
    color: '#ff007f',
  },
  {
    id: 'vice_beach',
    name: 'Ocean Beach',
    tagline: 'Sun, Luxury Clubs & Smuggling',
    dangerLevel: 'MEDIUM (3/5 Stars)',
    controlBonus: '+20% Nightclub Revenue',
    iconName: 'Palmtree',
    color: '#00f0ff',
  },
  {
    id: 'port_gellhorn',
    name: 'Port Gellhorn',
    tagline: 'Industrial Shipyards & Cargo',
    dangerLevel: 'EXTREME (5/5 Stars)',
    controlBonus: '+30% Black Market Shipments',
    iconName: 'Ship',
    color: '#ff8a00',
  },
  {
    id: 'marina',
    name: 'Star Island Marina',
    tagline: 'Yachts & High Society Deals',
    dangerLevel: 'LOW (2/5 Stars)',
    controlBonus: '+15% VIP Protection',
    iconName: 'Anchor',
    color: '#ffd700',
  },
  {
    id: 'industrial',
    name: 'Little Haiti Outskirts',
    tagline: 'Underground Racing & Chop Shops',
    dangerLevel: 'HIGH (4/5 Stars)',
    controlBonus: '+25% Street Racing Bets',
    iconName: 'Wrench',
    color: '#9d4edd',
  },
];

export const PROPERTIES: Property[] = [
  {
    id: 'nightclub',
    name: 'Malibu Neon Club',
    category: 'Entertainment Empire',
    income: '$85,000 / day',
    description: 'The premier nightlife hotspot in Vice Beach. Launders cash seamlessly.',
    icon: 'Music',
  },
  {
    id: 'auto_garage',
    name: 'VCPD Impound Chop Shop',
    category: 'Automotive Syndicate',
    income: '$65,000 / day',
    description: 'Modifies high-end exotic cars and strips exotic parts for export.',
    icon: 'Car',
  },
  {
    id: 'mansion',
    name: 'Star Island Waterfront Villa',
    category: 'Command Headquarters',
    income: '$120,000 / day',
    description: 'Fortified estate with helipad, private dock, and security vault.',
    icon: 'Home',
  },
  {
    id: 'marina_slip',
    name: 'Ocean Drive Yacht Slip',
    category: 'Maritime Operations',
    income: '$90,000 / day',
    description: 'Controls offshore speedboats and international cargo smuggling.',
    icon: 'Anchor',
  },
  {
    id: 'business',
    name: 'Cyber Vault Data Haven',
    category: 'Tech Syndicate',
    income: '$110,000 / day',
    description: 'Encrypts syndicate communications and executes high-tier crypto heists.',
    icon: 'Shield',
  },
];

export const VEHICLES: Vehicle[] = [
  {
    id: 'sports_car',
    name: 'Pegassi Vice GT (Exotic)',
    topSpeed: '225 MPH',
    type: 'Supercar',
    icon: 'Zap',
  },
  {
    id: 'superbike',
    name: 'Shitzu Hakuchou Turbo',
    topSpeed: '210 MPH',
    type: 'Superbike',
    icon: 'Flame',
  },
  {
    id: 'speed_boat',
    name: 'Squalo Offshore Racer',
    topSpeed: '115 Knots',
    type: 'Speedboat',
    icon: 'Navigation',
  },
  {
    id: 'classic_muscle',
    name: 'Vapid Vice Muscle 1986',
    topSpeed: '195 MPH',
    type: 'Classic Muscle',
    icon: 'Award',
  },
];

export const DEFAULT_PROFILE: CharacterProfile = {
  photoUrl: CHARACTER_PRESETS[0].avatar,
  editedPhotoUrl: null,
  activeStylePreset: 'vice_sunset',
  name: 'Alex',
  alias: 'The Ghost',
  role: 'street_racer',
  crew: 'night_riders',
  customCrewName: 'Vice Kings',
  motto: 'Never trust the night. Rules are made to be broken.',
  stats: {
    streetRep: 85,
    money: 70,
    influence: 90,
    risk: 75,
  },
  selectedScenarios: ['heist_bank'],
  territory: 'downtown',
  property: 'nightclub',
  vehicle: 'sports_car',
  bountyAmount: 500000,
  wantedStars: 5,
  lastSeenLocation: 'Downtown Vice City',
  wantedEditedPhotoUrl: null,
};
