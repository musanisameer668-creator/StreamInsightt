export type PlatformName = 'Netflix' | 'Prime Video' | 'Disney+' | 'HBO Max' | 'Hulu' | 'Apple TV+';

export type ContentType = 'Movie' | 'TV Show';

export interface StreamingItem {
  id: string;
  title: string;
  platform: PlatformName;
  type: ContentType;
  releaseYear: number;
  genre: string;
  imdbRating: number;
  streamHoursMillions: number;
  country: string;
  ageCertification: string;
  runtimeMinutes: number;
  seasons?: number;
  posterUrl?: string;
  addedYear: number;
}

export interface PlatformMetric {
  platform: PlatformName;
  totalTitles: number;
  moviesCount: number;
  tvShowsCount: number;
  avgRating: number;
  totalHours: number;
  topGenre: string;
  color: string;
}

export interface FilterOptions {
  platform: PlatformName | 'All';
  type: ContentType | 'All';
  genre: string;
  searchQuery: string;
  minYear: number;
  maxYear: number;
  sortBy: 'rating' | 'hours' | 'year' | 'title';
  sortOrder: 'asc' | 'desc';
}

export interface KPIStats {
  totalTitles: number;
  totalMovies: number;
  totalTVShows: number;
  avgRating: number;
  totalStreamHoursMillions: number;
  topPlatform: string;
  topGenre: string;
}

export interface AIInsightResult {
  success: boolean;
  insight: string;
  recommendations: string[];
  error?: string;
}
