
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

export interface Person {
  surname: string;
  person_id: number;
  christian_name: string;
  fullName: string;
  date_of_birth: number;
  place_of_birth: string;
  date_of_death?: number;
  occupation: string;
  additional_notes: string;
  reference: string;
  id_card_no: string;
  photos: string[];
  family: {
    names_of_parents: string;
    names_of_children: string;
  };
  naturalization: {
    date_of_naturalisation: string;
    no_of_cert: string;
    issued_at: string;
  };
  residence: {
    town_or_city: string;
    home_at_death: string;
  };
  has_photo: boolean;
  migration: {
    date_of_arrival_aus: string;
    date_of_arrival_nt: string;
    arrival_period: string;
    data_source: string;
  };
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
