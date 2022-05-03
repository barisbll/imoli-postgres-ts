"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._setupDatabase = void 0;
const axios_1 = __importDefault(require("axios"));
const Movie_1 = __importDefault(require("../models/Movie"));
const People_1 = __importDefault(require("../models/People"));
const _createPeopleCallHelper = (character) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(character);
        const people = yield People_1.default.create({
            name: response.data.name,
        });
        // Calling helper function
        for (let i = 0; i < response.data.films.length; i++) {
            yield _createMovieMakeRelations(response.data.films[i], people);
        }
    }
    catch (err) {
        console.log(err);
    }
});
// Takes film url as parameter,
// Creates a movie if not exists and makes the relation
const _createMovieMakeRelations = (film, people) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(film);
    const movieResponse = yield Movie_1.default.findAll({
        where: { title: response.data.title },
    });
    if (movieResponse.length === 0) {
        const movie = yield Movie_1.default.create({
            title: response.data.title,
            releaseDate: new Date(response.data.release_date),
        });
        yield movie.$add("peoples", people);
    }
    else {
        yield movieResponse[0].$add("peoples", people);
    }
});
const _setupDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const characterUrls = new Set();
    try {
        const moviesResponse = yield axios_1.default.get("https://swapi.dev/api/films");
        const fetchedMovies = moviesResponse.data;
        // Add unique characters's urls to the set
        fetchedMovies.results.forEach((film) => {
            film.characters.forEach((character) => {
                characterUrls.add(character);
            });
        });
        const characterUrlsArray = Array.from(characterUrls);
        for (let i = 0; i < characterUrlsArray.length; i++) {
            yield _createPeopleCallHelper(characterUrlsArray[i]);
        }
    }
    catch (err) { }
});
exports._setupDatabase = _setupDatabase;
