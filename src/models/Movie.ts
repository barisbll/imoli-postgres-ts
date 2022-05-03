import {
  Table,
  Column,
  Model,
  Unique,
  BelongsToMany,
} from "sequelize-typescript";
import MovieList from "./MovieList";
import MovieListMovie from "./MovieListMovie";
import MoviePeople from "./MoviePeople";
import People from "./People";

@Table
class Movie extends Model {
  @Unique
  @Column
  title!: string;

  @Unique
  @Column
  releaseDate!: Date;

  @BelongsToMany(() => MovieList, () => MovieListMovie)
  movieLists!: MovieList[];

  @BelongsToMany(() => People, () => MoviePeople)
  peoples!: People[];
}

export default Movie;
