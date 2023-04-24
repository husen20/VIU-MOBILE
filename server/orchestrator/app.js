const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { GenresDefs, GenresResolvers } = require('./schema/genres');
const { MoviesDefs, MoviesResolvers } = require('./schema/movies');
const { UserDefs, UserResolvers } = require('./schema/user');

const server = new ApolloServer({
  typeDefs: [MoviesDefs, UserDefs, GenresDefs],
  resolvers: [MoviesResolvers, UserResolvers, GenresResolvers],
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
