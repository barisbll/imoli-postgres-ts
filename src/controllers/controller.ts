import { RequestHandler } from "express";

import Movie from "../models/Movie";
import MovieList from "../models/MovieList";
import MovieListMovie from "../models/MovieListMovie";
import MoviePeople from "../models/MoviePeople";
import People from "../models/People";

import { _setupDatabase } from "../util/setup-db";
const _excelHelper = require("../util/excel");

export const getFilms: RequestHandler = async (req, res, next) => {
  try {
    let movies = await Movie.findAll();

    if (movies.length === 6) {
      return res.status(200).json({ movies });
    }

    await _setupDatabase();

    movies = await Movie.findAll();

    res.status(200).json({ movies });
  } catch (err) {
    next(err);
  }
};

export const postFavorites: RequestHandler = async (req, res, next) => {
  const { name } = req.body;
  const { ids } = req.body;

  try {
    const foundMovieList = await MovieList.findAll({ where: { name: name } });

    if (foundMovieList.length > 0) {
      throw new Error(
        "There is already a favorite list registered with that name"
      );
    }

    const movieList = await MovieList.create({
      name: name,
    });

    const movies = [];
    for (const counter in ids) {
      const movie = await Movie.findByPk(ids[counter]);

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
  } catch (err) {
    next(err);
  }
};

export const getFavorites: RequestHandler = async (req, res, next) => {
  const { page = 1, limit = 2 } = req.query;
  try {
    // response array to be returned
    const response: any = [];

    // Find all the favorites lists
    const movieLists = await MovieList.findAll({
      // @ts-ignore
      limit: limit,
      // @ts-ignore
      offset: limit * (page - 1),
    });

    // First loop find one favorite list and push its name to do the response object
    for (let movieListCounter in movieLists) {
      const movieListId = movieLists[movieListCounter].id;

      const movieListMovieResults = await MovieListMovie.findAll({
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

        const movie = await Movie.findByPk(movieListMovieId);

        tempMovies.push(movie);
      }

      // Push temp movies to the response array
      response[movieListCounter].movies.push(...tempMovies);
    }

    res.status(200).json({ res: response });
  } catch (err) {
    next(err);
  }
};

export const getFavorite: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const movieList = await MovieList.findByPk(id);

    if (!movieList) {
      throw new Error("There is no favorite list with given id");
    }

    const responseObject: any = {
      id: movieList.id,
      movieListName: movieList.name,
      movies: [],
    };

    const movieListMovieResults = await MovieListMovie.findAll({
      where: { movieListId: movieList.id },
    });

    const tempMovies = [];

    for (let counter in movieListMovieResults) {
      const movieListMovieId = movieListMovieResults[counter].movieId;

      const movie = await Movie.findByPk(movieListMovieId);

      tempMovies.push(movie);
    }

    responseObject.movies.push(...tempMovies);

    res.json({ responseObject });
  } catch (err) {
    next(err);
  }
};

export const getFile: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const movieList = await MovieList.findByPk(id);

    if (!movieList) {
      throw new Error("There is no favorite list with given id");
    }

    const responseObject: any = {
      id: movieList.id,
      movieListName: movieList.name,
      movies: [],
      chars: [],
    };

    const tempMovies = [];
    const charsObject: any = { chars: [], ids: [] };

    const movieListMovieResults = await MovieListMovie.findAll({
      where: { movieListId: movieList.id },
    });

    for (let counter in movieListMovieResults) {
      // Fetching movies and adding to the tempMovies array
      const movieListMovieId = movieListMovieResults[counter].movieId;
      const movie: any = await Movie.findByPk(movieListMovieId);
      tempMovies.push(movie);

      // Fetching moviePeople records for one movie
      const moviePeopleResults: any = await MoviePeople.findAll({
        where: { movieId: movie.id },
      });

      // Fetching people from moviePeopleResult and adding to Set
      for (let moviePeopleCounter in moviePeopleResults) {
        const people: any = await People.findByPk(
          moviePeopleResults[moviePeopleCounter].peopleId
        );

        if (people.id in charsObject.ids) {
          continue;
        } else {
          charsObject.ids.push(people.id);
        }

        charsObject.chars.push(people);
      }
    }

    responseObject.movies.push(...tempMovies);
    responseObject.chars.push(...charsObject.chars);

    _excelHelper(responseObject, res);
  } catch (err) {
    next(err);
  }
};
