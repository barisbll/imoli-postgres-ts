"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Movie_1 = __importDefault(require("./Movie"));
const MovieListMovie_1 = __importDefault(require("./MovieListMovie"));
let MovieList = class MovieList extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull,
    sequelize_typescript_1.Unique,
    __metadata("design:type", String)
], MovieList.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Movie_1.default, () => MovieListMovie_1.default),
    __metadata("design:type", Array)
], MovieList.prototype, "movies", void 0);
MovieList = __decorate([
    sequelize_typescript_1.Table
], MovieList);
exports.default = MovieList;
