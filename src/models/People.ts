import {
  Table,
  Column,
  Model,
  Unique,
  BelongsToMany,
} from "sequelize-typescript";
import Movie from "./Movie";
import MoviePeople from "./MoviePeople";

@Table
class People extends Model {
  @Unique
  @Column
  name!: string;

  @BelongsToMany(() => Movie, () => MoviePeople)
  movies!: Movie[];
}

export default People;
