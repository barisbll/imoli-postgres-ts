"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavoriteIdResponse = exports.getFavoritesResponse = void 0;
// http://localhost:8080/favorites?page=1&limit=3 called
exports.getFavoritesResponse = {
    res: [
        {
            id: 1,
            movieListName: "fav1",
            movies: [
                {
                    id: 1,
                    title: "A New Hope",
                    releaseDate: "1977-05-25T00:00:00.000Z",
                    createdAt: "2022-05-03T15:52:01.642Z",
                    updatedAt: "2022-05-03T15:52:01.642Z",
                },
                {
                    id: 5,
                    title: "The Phantom Menace",
                    releaseDate: "1999-05-19T00:00:00.000Z",
                    createdAt: "2022-05-03T15:52:04.640Z",
                    updatedAt: "2022-05-03T15:52:04.640Z",
                },
                {
                    id: 6,
                    title: "Attack of the Clones",
                    releaseDate: "2002-05-16T00:00:00.000Z",
                    createdAt: "2022-05-03T15:52:04.974Z",
                    updatedAt: "2022-05-03T15:52:04.974Z",
                },
            ],
        },
        {
            id: 2,
            movieListName: "fav2",
            movies: [
                {
                    id: 1,
                    title: "A New Hope",
                    releaseDate: "1977-05-25T00:00:00.000Z",
                    createdAt: "2022-05-03T15:52:01.642Z",
                    updatedAt: "2022-05-03T15:52:01.642Z",
                },
                {
                    id: 3,
                    title: "Return of the Jedi",
                    releaseDate: "1983-05-25T00:00:00.000Z",
                    createdAt: "2022-05-03T15:52:02.424Z",
                    updatedAt: "2022-05-03T15:52:02.424Z",
                },
                {
                    id: 4,
                    title: "Revenge of the Sith",
                    releaseDate: "2005-05-19T00:00:00.000Z",
                    createdAt: "2022-05-03T15:52:02.809Z",
                    updatedAt: "2022-05-03T15:52:02.809Z",
                },
            ],
        },
        {
            id: 3,
            movieListName: "fav3",
            movies: [],
        },
    ],
};
// http://localhost:8080/favorite/5 called
exports.getFavoriteIdResponse = {
    responseObject: {
        id: 5,
        movieListName: "fav4",
        movies: [
            {
                id: 1,
                title: "A New Hope",
                releaseDate: "1977-05-25T00:00:00.000Z",
                createdAt: "2022-05-03T15:52:01.642Z",
                updatedAt: "2022-05-03T15:52:01.642Z",
            },
            {
                id: 3,
                title: "Return of the Jedi",
                releaseDate: "1983-05-25T00:00:00.000Z",
                createdAt: "2022-05-03T15:52:02.424Z",
                updatedAt: "2022-05-03T15:52:02.424Z",
            },
            {
                id: 4,
                title: "Revenge of the Sith",
                releaseDate: "2005-05-19T00:00:00.000Z",
                createdAt: "2022-05-03T15:52:02.809Z",
                updatedAt: "2022-05-03T15:52:02.809Z",
            },
        ],
    },
};
