
export interface SortOption {
  field: keyof Person;
  direction: 'asc' | 'desc';
}

export interface FilterOptions {
  fullName: string;
  christian_name: string;
  surname: string;
  date_of_birth: string;
  date_of_arrival_nt: string;
  place_of_birth: string;
  town_or_city: string;
  occupation: string;
  arrival_period: string;
  has_photo: boolean | null;
  date_range: {
    start: string;
    end: string;
  };
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface MigrantQueryParams extends PaginationParams {
  filters: Partial<FilterOptions>;
  sort: SortOption;
}

export interface ApiResponse<T> {
  data: T;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
