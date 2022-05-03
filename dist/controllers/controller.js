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
exports.getFile = exports.getFavorite = exports.getFavorites = exports.postFavorites = exports.getFilms = void 0;
const Movie_1 = __importDefault(require("../models/Movie"));
const MovieList_1 = __importDefault(require("../models/MovieList"));
const MovieListMovie_1 = __importDefault(require("../models/MovieListMovie"));
const MoviePeople_1 = __importDefault(require("../models/MoviePeople"));
const People_1 = __importDefault(require("../models/People"));
const setup_db_1 = require("../util/setup-db");
const _excelHelper = require("../util/excel");
const getFilms = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let movies = yield Movie_1.default.findAll();
        if (movies.length === 6) {
            return res.status(200).json({ movies });
        }
        yield (0, setup_db_1._setupDatabase)();
        movies = yield Movie_1.default.findAll();
        res.status(200).json({ movies });
    }
    catch (err) {
        next(err);
    }
});
exports.getFilms = getFilms;
const postFavorites = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const { ids } = req.body;
    try {
        const foundMovieList = yield MovieList_1.default.findAll({ where: { name: name } });
        if (foundMovieList.length > 0) {
            throw new Error("There is already a favorite list registered with that name");
        }
        const movieList = yield MovieList_1.default.create({
            name: name,
        });
        const movies = [];
        for (const counter in ids) {
            const movie = yield Movie_1.default.findByPk(ids[counter]);
            if (movie === null) {
                movieList.destroy();
                throw new Error("There is no film with id " + ids[counter]);
            }
            movieList.$add("movies", movie);
            movies.push(movie);
        }
        res.status(201).json({
            movieListName: name,
            movies,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.postFavorites = postFavorites;
const getFavorites = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 2 } = req.query;
    try {
        // response array to be returned
        const response = [];
        // Find all the favorites lists
        const movieLists = yield MovieList_1.default.findAll({
            // @ts-ignore
            limit: limit,
            // @ts-ignore
            offset: limit * (page - 1),
        });
        // First loop find one favorite list and push its name to do the response object
        for (let movieListCounter in movieLists) {
            const movieListId = movieLists[movieListCounter].id;
            const movieListMovieResults = yield MovieListMovie_1.default.findAll({
                where: { movieListId: movieListId },
            });
            response.push({
                id: movieListId,
                movieListName: movieLists[movieListCounter].name,
                movies: [],
            });
            const tempMovies = [];
            // Second loop fetch all the movies from the favorite and push it to tempMovies
            for (let counter in movieListMovieResults) {
                const movieListMovieId = movieListMovieResults[counter].movieId;
                const movie = yield Movie_1.default.findByPk(movieListMovieId);
                tempMovies.push(movie);
            }
            // Push temp movies to the response array
            response[movieListCounter].movies.push(...tempMovies);
        }
        res.status(200).json({ res: response });
    }
    catch (err) {
        next(err);
    }
});
exports.getFavorites = getFavorites;
const getFavorite = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const movieList = yield MovieList_1.default.findByPk(id);
        if (!movieList) {
            throw new Error("There is no favorite list with given id");
        }
        const responseObject = {
            id: movieList.id,
            movieListName: movieList.name,
            movies: [],
        };
        const movieListMovieResults = yield MovieListMovie_1.default.findAll({
            where: { movieListId: movieList.id },
        });
        const tempMovies = [];
        for (let counter in movieListMovieResults) {
            const movieListMovieId = movieListMovieResults[counter].movieId;
            const movie = yield Movie_1.default.findByPk(movieListMovieId);
            tempMovies.push(movie);
        }
        responseObject.movies.push(...tempMovies);
        res.json({ responseObject });
    }
    catch (err) {
        next(err);
    }
});
exports.getFavorite = getFavorite;
const getFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const movieList = yield MovieList_1.default.findByPk(id);
        if (!movieList) {
            throw new Error("There is no favorite list with given id");
        }
        const responseObject = {
            id: movieList.id,
            movieListName: movieList.name,
            movies: [],
            chars: [],
        };
        const tempMovies = [];
        const charsObject = { chars: [], ids: [] };
        const movieListMovieResults = yield MovieListMovie_1.default.findAll({
            where: { movieListId: movieList.id },
        });
        for (let counter in movieListMovieResults) {
            // Fetching movies and adding to the tempMovies array
            const movieListMovieId = movieListMovieResults[counter].movieId;
            const movie = yield Movie_1.default.findByPk(movieListMovieId);
            tempMovies.push(movie);
            // Fetching moviePeople records for one movie
            const moviePeopleResults = yield MoviePeople_1.default.findAll({
                where: { movieId: movie.id },
            });
            // Fetching people from moviePeopleResult and adding to Set
            for (let moviePeopleCounter in moviePeopleResults) {
                const people = yield People_1.default.findByPk(moviePeopleResults[moviePeopleCounter].peopleId);
                if (people.id in charsObject.ids) {
                    continue;
                }
                else {
                    charsObject.ids.push(people.id);
                }
                charsObject.chars.push(people);
            }
        }
        responseObject.movies.push(...tempMovies);
        responseObject.chars.push(...charsObject.chars);
        _excelHelper(responseObject, res);
    }
    catch (err) {
        next(err);
    }
});
exports.getFile = getFile;
