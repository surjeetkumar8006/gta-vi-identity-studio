export type RoleType = 'street_racer' | 'hustler' | 'entrepreneur' | 'hacker' | 'biker';
export type CrewType = 'solo' | 'night_riders' | 'vice_kings' | 'syndicate';
export type TerritoryId = 'downtown' | 'vice_beach' | 'port_gellhorn' | 'marina' | 'industrial';
export type PropertyId = 'nightclub' | 'auto_garage' | 'mansion' | 'marina_slip' | 'business';
export type VehicleId = 'sports_car' | 'superbike' | 'speed_boat' | 'classic_muscle';

export interface ReputationStats {
  streetRep: number;
  money: number;
  influence: number;
  risk: number;
}

export interface Territory {
  id: TerritoryId;
  name: string;
  tagline: string;
  dangerLevel: string;
  controlBonus: string;
  iconName: string;
  color: string;
}

export interface Property {
  id: PropertyId;
  name: string;
  category: string;
  income: string;
  description: string;
  icon: string;
}

export interface Vehicle {
  id: VehicleId;
  name: string;
  topSpeed: string;
  type: string;
  icon: string;
}

export interface StylePreset {
  id: string;
  name: string;
  subtitle: string;
  accentColor: string;
  badge: string;
  filterEffect: string;
  description: string;
}

export interface CharacterProfile {
  // Photo & Image Editor output
  photoUrl: string;
  editedPhotoUrl: string | null;
  activeStylePreset: string;

  // Step 3: Identity
  name: string;
  alias: string;
  role: RoleType;
  crew: CrewType;
  customCrewName: string;
  motto: string;

  // Step 4: Reputation
  stats: ReputationStats;
  selectedScenarios: string[];

  // Step 5: Empire
  territory: TerritoryId;
  property: PropertyId;
  vehicle: VehicleId;

  // Step 6: Wanted Poster specific fields
  bountyAmount: number;
  wantedStars: number;
  lastSeenLocation: string;
  wantedEditedPhotoUrl: string | null;
}
