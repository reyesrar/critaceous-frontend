export interface Movie {
  id: string;
  title: string;
  poster: string;
  synopsis: string;
  releaseDate: string;
  genres: string[];
  // Rating from regular users
  userRating: number;
  // Rating from critics
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
  // Marks comment as a critic review
  isCritic: boolean;
}