import { InMemoryCache, ApolloClient } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://e026-2001-448a-304e-407d-44a-1daf-5ae7-e40.ngrok-free.app/',
  cache: new InMemoryCache(),
});

export default client;
