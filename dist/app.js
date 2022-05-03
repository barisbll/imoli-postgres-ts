"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _404_1 = require("./controllers/404");
const server_1 = __importDefault(require("./util/server"));
const database_1 = __importDefault(require("./util/database"));
const app = (0, server_1.default)();
database_1.default
    .sync()
    .then((result) => {
    app.listen(8080);
})
    .catch((err) => {
    console.log(err);
});
app.use(_404_1.get404);
const errHandler = (error, req, res, next) => {
    if (!error.status)
        error.status = 500;
    res.status(error.status).json({ error: error.message });
};
app.use(errHandler);
