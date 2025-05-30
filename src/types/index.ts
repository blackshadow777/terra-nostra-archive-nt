
export interface Migrant {
  id: number;
  fullName: string;
  firstName: string;
  lastName: string;
  birthYear: number;
  birthPlace: string;
  deathYear?: number;
  arrivalYear: number;
  region: string;
  settlement: string;
  occupation: string;
  mainPhoto?: string;
  photos: string[];
  biography: string;
  family: {
    parents: string;
    children: string;
  };
  naturalization: {
    date: string;
    certificate: string;
    issuedAt: string;
  };
  residence: {
    townOrCity: string;
    homeAtDeath: string;
  };
  hasPhoto: boolean;
}

export interface Admin {
  id: number;
  name: string;
  email: string;
  role: 'Super Admin' | 'Editor' | 'Viewer';
  status: 'Active' | 'Inactive';
  profilePicture?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface SearchFilters {
  firstName: string;
  lastName: string;
  yearFrom: string;
  yearTo: string;
  region: string;
  settlement: string;
}

export interface AnalyticsData {
  totalMigrants: number;
  totalAdmins: number;
  recordsThisMonth: number;
  recordsAdded: number;
  migrantsByRegion: { name: string; value: number }[];
  migrantsByYear: { year: number; count: number }[];
  migrantsBySettlement: { name: string; value: number }[];
}
