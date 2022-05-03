import path from "path";
import { Sequelize } from "sequelize-typescript";

const modelPath = path.join(__dirname, "..", "models");

const sequelize = new Sequelize({
  database: "imoli_postgres_ts",
  dialect: "postgres",
  username: "barisbll",
  password: "postgresql",
  models: [modelPath],
});

export default sequelize;
