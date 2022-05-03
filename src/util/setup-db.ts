import axios from "axios";

import Movie from "../models/Movie";
import People from "../models/People";

const _createPeopleCallHelper = async (character: string) => {
  try {
    const response = await axios.get(character);

    const people = await People.create({
      name: response.data.name,
    });

    // Calling helper function
    for (let i = 0; i < response.data.films.length; i++) {
      await _createMovieMakeRelations(response.data.films[i], people);
    }
  } catch (err) {
    console.log(err);
  }
};

// Takes film url as parameter,
// Creates a movie if not exists and makes the relation
const _createMovieMakeRelations = async (film: string, people: People) => {
  const response = await axios.get(film);

  const movieResponse = await Movie.findAll({
    where: { title: response.data.title },
  });

  if (movieResponse.length === 0) {
    const movie: Movie = await Movie.create({
      title: response.data.title,
      releaseDate: new Date(response.data.release_date),
    });

    await movie.$add("peoples", people);
  } else {
    await movieResponse[0].$add("peoples", people);
  }
};

export const _setupDatabase = async () => {
  const characterUrls = new Set<string>();
  try {
    const moviesResponse = await axios.get("https://swapi.dev/api/films");

    const fetchedMovies = moviesResponse.data;

    // Add unique characters's urls to the set
    fetchedMovies.results.forEach((film: any) => {
      film.characters.forEach((character: string) => {
        characterUrls.add(character);
      });
    });

    const characterUrlsArray = Array.from(characterUrls);

    for (let i = 0; i < characterUrlsArray.length; i++) {
      await _createPeopleCallHelper(characterUrlsArray[i]);
    }
  } catch (err) {}
};
