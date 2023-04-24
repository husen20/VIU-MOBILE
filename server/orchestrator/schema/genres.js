const axios = require('axios');
const redis = require('../config/redis');
const URL_EXPRESS = process.env.APP_URL || 'http://localhost:4002';

const GenresDefs = `#graphql

    type Genres {
        id: String
        name: String
    }

    type Query {
      genres: [Genres]
    }
    

  `;

const GenresResolvers = {
  Query: {
    genres: async () => {
      try {
        const genresCache = await redis.get('app:genres');

        if (genresCache) {
          return JSON.parse(genresCache);
        }

        const { data } = await axios({
          url: `${URL_EXPRESS}/genres`,
        });

        await redis.set('app:genres', JSON.stringify(data));

        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { GenresResolvers, GenresDefs };
