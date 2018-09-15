export interface Movies {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Awards?: string;
  imdbRating?: string;
  BoxOffice?: string;
  Website?: string;
}

export interface MovieResponse {
  Search?: Movies[];
  Response: string;
  Error?: string;
  totalResults?: string;
}
