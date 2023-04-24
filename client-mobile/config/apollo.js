import { InMemoryCache, ApolloClient } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://3d95-2001-448a-304e-498c-d8d6-2c98-1019-723c.ngrok-free.app',
  cache: new InMemoryCache(),
});

export default client;
