import {
  Table,
  Column,
  Model,
  AllowNull,
  Unique,
  BelongsToMany,
} from "sequelize-typescript";
import Movie from "./Movie";
import MovieListMovie from "./MovieListMovie";

@Table
class MovieList extends Model {
  @AllowNull
  @Unique
  @Column
  name!: string;

  @BelongsToMany(() => Movie, () => MovieListMovie)
  movies!: Movie[];
}

export default MovieList;
