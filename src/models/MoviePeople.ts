import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import Movie from "./Movie";
import People from "./People";

@Table
class MoviePeople extends Model {
  @ForeignKey(() => Movie)
  @Column
  movieId!: number;

  @ForeignKey(() => People)
  @Column
  peopleId!: number;
}

export default MoviePeople;
