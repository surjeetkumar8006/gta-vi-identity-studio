import mongoose, { Schema, Document } from 'mongoose';

export interface IProfile extends Document {
  shareId: string;
  name: string;
  alias: string;
  role: string;
  crew: string;
  customCrewName?: string;
  motto?: string;
  photoUrl: string;
  editedPhotoUrl?: string;
  wantedEditedPhotoUrl?: string;
  activeStylePreset: string;
  stats: {
    streetRep: number;
    money: number;
    influence: number;
    risk: number;
  };
  territory: string;
  property: string;
  vehicle: string;
  bountyAmount: number;
  wantedStars: number;
  respectVotes: number;
  viewsCount: number;
  createdAt: Date;
}

const ProfileSchema: Schema = new Schema({
  shareId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  alias: { type: String, required: true },
  role: { type: String, required: true, default: 'hustler' },
  crew: { type: String, required: true, default: 'solo' },
  customCrewName: { type: String, default: '' },
  motto: { type: String, default: '' },
  photoUrl: { type: String, required: true },
  editedPhotoUrl: { type: String, default: null },
  wantedEditedPhotoUrl: { type: String, default: null },
  activeStylePreset: { type: String, required: true, default: 'vice_sunset' },
  stats: {
    streetRep: { type: Number, default: 80 },
    money: { type: Number, default: 70 },
    influence: { type: Number, default: 85 },
    risk: { type: Number, default: 75 },
  },
  territory: { type: String, required: true, default: 'downtown' },
  property: { type: String, required: true, default: 'nightclub' },
  vehicle: { type: String, required: true, default: 'sports_car' },
  bountyAmount: { type: Number, required: true, default: 500000 },
  wantedStars: { type: Number, required: true, default: 5 },
  respectVotes: { type: Number, default: 0 },
  viewsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const Profile = mongoose.model<IProfile>('Profile', ProfileSchema);
