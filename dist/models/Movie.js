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
const MovieList_1 = __importDefault(require("./MovieList"));
const MovieListMovie_1 = __importDefault(require("./MovieListMovie"));
const MoviePeople_1 = __importDefault(require("./MoviePeople"));
const People_1 = __importDefault(require("./People"));
let Movie = class Movie extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Movie.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Movie.prototype, "releaseDate", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => MovieList_1.default, () => MovieListMovie_1.default),
    __metadata("design:type", Array)
], Movie.prototype, "movieLists", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => People_1.default, () => MoviePeople_1.default),
    __metadata("design:type", Array)
], Movie.prototype, "peoples", void 0);
Movie = __decorate([
    sequelize_typescript_1.Table
], Movie);
exports.default = Movie;
