
export interface Landmark {
  id: string;
  title: string;
  description: string;
  category: 'literary' | 'historical' | 'art' | 'philosophy' | 'myths';
  subCategory?: 'modernism' | 'war' | 'tragedy' | 'journey' | 'romance' | 'mystery';
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  literaryWork?: string;
  author?: string;
  historicalPeriod?: string;
  yearBuilt?: number;
  yearWritten?: number;
  characterPaths?: CharacterPath[];
  images: string[];
  contributedBy?: string;
  createdAt: string;
  funFacts: string[];
  quotes?: string[];
  visitingInfo?: {
    address: string;
    openingHours?: string;
    website?: string;
    ticketPrice?: string;
  };
  significance: string;
  verificationStatus: 'pending' | 'verified' | 'featured';
  tags: string[];
}

export interface CharacterPath {
  id: string;
  characterName: string;
  workTitle: string;
  pathPoints: PathPoint[];
  description: string;
  estimatedWalkTime: number;
  difficulty: 'easy' | 'moderate' | 'challenging';
}

export interface PathPoint {
  latitude: number;
  longitude: number;
  description: string;
  chapterReference?: string;
  quote?: string;
  order: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  contributionsCount: number;
  joinedAt: string;
  badges: Badge[];
  verificationLevel: 'novice' | 'contributor' | 'expert' | 'curator';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export interface Tour {
  id: string;
  title: string;
  description: string;
  landmarks: string[];
  estimatedDuration: number;
  difficulty: 'easy' | 'moderate' | 'challenging';
  theme: string;
  createdBy: string;
  rating: number;
  downloadCount: number;
}
