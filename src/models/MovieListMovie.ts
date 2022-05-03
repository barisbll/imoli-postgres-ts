import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import Movie from "./Movie";
import MovieList from "./MovieList";

@Table
class MovieListMovie extends Model {
  @ForeignKey(() => Movie)
  @Column
  movieId!: number;

  @ForeignKey(() => MovieList)
  @Column
  movieListId!: number;
}

export default MovieListMovie;
