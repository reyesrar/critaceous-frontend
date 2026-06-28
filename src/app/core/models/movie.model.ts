export interface Movie {
  id: string;
  title: string;
  poster: string;
  synopsis: string;
  releaseDate: string;
  genres: string[];
  actors: string[];
  directors: string[];
  userRating: number;
  criticRating: number;
  popularity: number;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  movieId: string;
  movieTitle: string;
  content: string;
  rating: number;
  createdAt: string;
  isCritic: boolean;
}