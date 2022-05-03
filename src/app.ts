import { ErrorRequestHandler } from "express";

import { get404 } from "./controllers/404";
import createServer from "./util/server";
import sequelize from "./util/database";

const app = createServer();

sequelize
  .sync()
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(get404);

const errHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (!error.status) error.status = 500;
  res.status(error.status).json({ error: error.message });
};

app.use(errHandler);
