
export type UserRole = 'CUSTOMER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Court {
  id: string;
  name: string;
  description: string;
  type: 'Indoor' | 'Outdoor' | 'Basement';
  imageUrl: string;
}

export type MatchType = 'Singles' | 'Doubles' | 'Drills';
export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro';

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  courtId: string;
  date: string; // ISO format
  timeSlot: string;
  status: 'Confirmed' | 'Cancelled';
  matchType: MatchType;
  skillLevel: SkillLevel;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export enum AppView {
  LOGIN,
  CUSTOMER_DASHBOARD,
  ADMIN_DASHBOARD,
}
