
import { Migrant, Admin, SearchFilters, AnalyticsData } from '@/types';

// Extended mock data
const mockMigrants: Migrant[] = [
  {
    id: 1,
    fullName: "Giuseppe Rossi",
    firstName: "Giuseppe",
    lastName: "Rossi",
    birthYear: 1925,
    birthPlace: "Venice, Veneto, Italy",
    deathYear: 1995,
    arrivalYear: 1951,
    region: "Veneto",
    settlement: "Darwin",
    occupation: "Construction Worker",
    mainPhoto: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    photos: ["https://images.unsplash.com/photo-1482938289607-e9573fc25ebb"],
    biography: "Giuseppe Rossi arrived in Darwin in 1951 as part of the post-war migration wave.",
    family: { parents: "Antonio Rossi, Maria Venetian", children: "Carlo Rossi, Anna Rossi-Smith" },
    naturalization: { date: "1956-03-15", certificate: "NAT-1956-0234", issuedAt: "Darwin" },
    residence: { townOrCity: "Darwin", homeAtDeath: "15 Cavenagh Street, Darwin" },
    hasPhoto: true
  },
  {
    id: 2,
    fullName: "Giuseppe Martinez",
    firstName: "Giuseppe",
    lastName: "Martinez",
    birthYear: 1928,
    birthPlace: "Naples, Campania, Italy",
    arrivalYear: 1953,
    region: "Campania",
    settlement: "Katherine",
    occupation: "Baker",
    mainPhoto: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66",
    photos: ["https://images.unsplash.com/photo-1566492031773-4f4e44671d66"],
    biography: "Giuseppe Martinez established the first Italian bakery in Katherine.",
    family: { parents: "Luigi Martinez, Rosa Napolitano", children: "Marco Martinez, Sofia Martinez" },
    naturalization: { date: "1958-07-20", certificate: "NAT-1958-0445", issuedAt: "Katherine" },
    residence: { townOrCity: "Katherine", homeAtDeath: "12 Baker Street, Katherine" },
    hasPhoto: true
  },
  {
    id: 3,
    fullName: "Maria Rossi",
    firstName: "Maria",
    lastName: "Rossi",
    birthYear: 1930,
    birthPlace: "Florence, Tuscany, Italy",
    arrivalYear: 1955,
    region: "Tuscany",
    settlement: "Alice Springs",
    occupation: "Teacher",
    mainPhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc",
    photos: ["https://images.unsplash.com/photo-1494790108755-2616b612b5bc"],
    biography: "Maria Rossi was a dedicated educator who taught Italian culture.",
    family: { parents: "Francesco Rossi, Elena Fiorentino", children: "Giuseppe Rossi Jr., Anna Rossi" },
    naturalization: { date: "1960-04-15", certificate: "NAT-1960-0678", issuedAt: "Alice Springs" },
    residence: { townOrCity: "Alice Springs", homeAtDeath: "23 School Road, Alice Springs" },
    hasPhoto: true
  },
  {
    id: 4,
    fullName: "Antonio Giuseppe",
    firstName: "Antonio",
    lastName: "Giuseppe",
    birthYear: 1932,
    birthPlace: "Rome, Lazio, Italy",
    arrivalYear: 1956,
    region: "Lazio",
    settlement: "Darwin",
    occupation: "Engineer",
    photos: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"],
    biography: "Antonio Giuseppe worked on major infrastructure projects in Darwin.",
    family: { parents: "Giuseppe Antonio, Maria Romano", children: "Luigi Giuseppe, Elena Giuseppe" },
    naturalization: { date: "1961-09-10", certificate: "NAT-1961-0890", issuedAt: "Darwin" },
    residence: { townOrCity: "Darwin", homeAtDeath: "45 Engineering Ave, Darwin" },
    hasPhoto: false
  },
  {
    id: 5,
    fullName: "Giuseppe Benedetti",
    firstName: "Giuseppe",
    lastName: "Benedetti",
    birthYear: 1920,
    birthPlace: "Catania, Sicily, Italy",
    deathYear: 1988,
    arrivalYear: 1948,
    region: "Sicily",
    settlement: "Darwin",
    occupation: "Fisherman",
    photos: ["https://images.unsplash.com/photo-1566492031773-4f4e44671d66"],
    biography: "Giuseppe Benedetti pioneered modern fishing techniques in Darwin.",
    family: { parents: "Salvatore Benedetti, Carmela Sicilian", children: "Antonio Benedetti, Rosa Benedetti-Jones" },
    naturalization: { date: "1953-07-10", certificate: "NAT-1953-0045", issuedAt: "Darwin" },
    residence: { townOrCity: "Darwin", homeAtDeath: "8 Fisherman's Wharf, Darwin" },
    hasPhoto: false
  }
];

let mockAdmins: Admin[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    role: "Super Admin",
    status: "Active",
    createdAt: "2024-01-01",
    lastLogin: "2024-01-15"
  },
  {
    id: 2,
    name: "Editor Smith",
    email: "editor@example.com",
    role: "Editor",
    status: "Active",
    createdAt: "2024-01-05",
    lastLogin: "2024-01-14"
  },
  {
    id: 3,
    name: "Viewer Jones",
    email: "viewer@example.com",
    role: "Viewer",
    status: "Inactive",
    createdAt: "2024-01-10"
  }
];

export class ApiService {
  static async searchMigrants(filters: SearchFilters): Promise<Migrant[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return mockMigrants.filter(migrant => {
      const matchesFirstName = !filters.firstName || 
        migrant.firstName.toLowerCase().includes(filters.firstName.toLowerCase());
      
      const matchesLastName = !filters.lastName || 
        migrant.lastName.toLowerCase().includes(filters.lastName.toLowerCase());
      
      const matchesRegion = !filters.region || 
        migrant.region.toLowerCase().includes(filters.region.toLowerCase());
      
      const matchesSettlement = !filters.settlement || 
        migrant.settlement.toLowerCase().includes(filters.settlement.toLowerCase());
      
      const matchesYearFrom = !filters.yearFrom || 
        migrant.arrivalYear >= parseInt(filters.yearFrom);
      
      const matchesYearTo = !filters.yearTo || 
        migrant.arrivalYear <= parseInt(filters.yearTo);

      return matchesFirstName && matchesLastName && matchesRegion && 
             matchesSettlement && matchesYearFrom && matchesYearTo;
    });
  }

  static async getMigrantById(id: number): Promise<Migrant | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockMigrants.find(migrant => migrant.id === id) || null;
  }

  static async getAllMigrants(): Promise<Migrant[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockMigrants;
  }

  static async getAdmins(): Promise<Admin[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockAdmins;
  }

  static async createAdmin(admin: Omit<Admin, 'id' | 'createdAt'>): Promise<Admin> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newAdmin: Admin = {
      ...admin,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    mockAdmins.push(newAdmin);
    return newAdmin;
  }

  static async updateAdmin(id: number, updates: Partial<Admin>): Promise<Admin | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockAdmins.findIndex(admin => admin.id === id);
    if (index === -1) return null;
    
    mockAdmins[index] = { ...mockAdmins[index], ...updates };
    return mockAdmins[index];
  }

  static async deleteAdmin(id: number): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockAdmins.findIndex(admin => admin.id === id);
    if (index === -1) return false;
    
    mockAdmins.splice(index, 1);
    return true;
  }

  static async getAnalytics(): Promise<AnalyticsData> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const regionCounts = mockMigrants.reduce((acc, migrant) => {
      acc[migrant.region] = (acc[migrant.region] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const yearCounts = mockMigrants.reduce((acc, migrant) => {
      const decade = Math.floor(migrant.arrivalYear / 10) * 10;
      acc[decade] = (acc[decade] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    const settlementCounts = mockMigrants.reduce((acc, migrant) => {
      acc[migrant.settlement] = (acc[migrant.settlement] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalMigrants: mockMigrants.length,
      totalAdmins: mockAdmins.filter(admin => admin.status === 'Active').length,
      recordsThisMonth: Math.floor(Math.random() * 20) + 5,
      recordsAdded: Math.floor(Math.random() * 10) + 2,
      migrantsByRegion: Object.entries(regionCounts).map(([name, value]) => ({ name, value })),
      migrantsByYear: Object.entries(yearCounts).map(([year, count]) => ({ year: parseInt(year), count })),
      migrantsBySettlement: Object.entries(settlementCounts).map(([name, value]) => ({ name, value }))
    };
  }
}
