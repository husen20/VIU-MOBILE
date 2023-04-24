const axios = require('axios');
const redis = require('../config/redis');
const URL_EXPRESS = process.env.APP_URL || 'http://localhost:4002';
const URL_MONGO = process.env.USER_URL || 'http://localhost:4001';

const MoviesDefs = `#graphql

    type Casts {
      id: Int
      movieId: Int
      name: String
      profilePict: String
    }

    type Genre {
        id: Int
        name: String
    }

    type Author {
        _id: String
        username: String
        email: String
        phoneNumber: String
        address: String
    }
 
    type Movies {
      id: Int
      authorId: String
      title: String
      genreId: Int
      synopsis: String
      imgUrl: String
      trailerUrl: String
      rating: Int
      Genre: Genre
      Author: Author
      Casts: [Casts]
    }

    type Query {
      movies: [Movies]
      detailMovie(id: Int) : Movies
    }

    input newCasts {
      name: String
      profilePict: String
    }

    input MovieForm {
      authorId: String
      title: String
      genreId: Int
      synopsis: String
      imgUrl: String
      trailerUrl: String
      rating: Int
      Casts: [newCasts]
    }

    input Movie {
      id: Int
      authorId: String
      title: String
      genreId: Int
      synopsis: String
      imgUrl: String
      trailerUrl: String
      rating: Int
      Casts: [newCasts]
    }

    type Response {
      message: String
    }

    type Mutation {
      addMovie(newMovie: MovieForm) : Response
      editMovie(movie: Movie) : Response
      deleteMovie(id: Int) : Response
    }
  `;

const MoviesResolvers = {
  Query: {
    movies: async () => {
      try {
        const moviesCache = await redis.get('app:movies');

        if (moviesCache) {
          return JSON.parse(moviesCache);
        }

        const { data } = await axios({
          url: `${URL_EXPRESS}/movies`,
          method: 'GET',
        });

        const { data: author } = await axios({
          url: `${URL_MONGO}/users`,
        });

        data.forEach((elMovies) => {
          author.forEach((elAuthor) => {
            if (elMovies.authorId == elAuthor._id) {
              elMovies.Author = elAuthor;
            }
          });
        });

        await redis.set('app:movies', JSON.stringify(data));

        return data;
      } catch (error) {
        console.log(error);
      }
    },

    detailMovie: async (parent, args) => {
      try {
        const { data } = await axios({
          url: `${URL_EXPRESS}/movies/${args.id}`,
          method: 'GET',
        });

        const { data: author } = await axios({
          url: `${URL_MONGO}/users`,
        });

        author.forEach((elAuthor) => {
          if (data.authorId == elAuthor._id) {
            data.Author = elAuthor;
          }
        });

        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    addMovie: async (parent, args) => {
      try {
        const { title, genreId, synopsis, imgUrl, trailerUrl, Casts, rating, authorId } = args.newMovie;
        console.log(args);
        const { data } = await axios({
          url: `${URL_EXPRESS}/movies`,
          method: 'POST',
          data: {
            title,
            genreId,
            synopsis,
            imgUrl,
            trailerUrl,
            Casts,
            rating,
            authorId,
          },
        });

        await redis.del('app:movies');

        return data;
      } catch (error) {
        console.log(error);
      }
    },

    editMovie: async (parent, args) => {
      try {
        const { id, title, genreId, synopsis, imgUrl, trailerUrl, Casts, rating, authorId } = args.movie;

        const { data } = await axios({
          url: `${URL_EXPRESS}/movies`,
          method: 'PUT',
          data: {
            id,
            title,
            genreId,
            synopsis,
            imgUrl,
            trailerUrl,
            Casts,
            rating,
            authorId,
          },
        });

        await redis.del('app:movies');

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    deleteMovie: async (parent, args) => {
      try {
        const { data } = await axios({
          url: `${URL_EXPRESS}/movies/${args.id}`,
          method: 'DELETE',
        });

        await redis.del('app:movies');

        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { MoviesResolvers, MoviesDefs };
