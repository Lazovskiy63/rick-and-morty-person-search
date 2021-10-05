import React from 'react';
import logo from './logo.svg';
import './App.css';
import RickAndMortySearchPersonApp from './Components/RickAndMortySearchPerson';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';
import apolloClient from './graphQlApollo/apolloClient';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <RickAndMortySearchPersonApp />
    </ApolloProvider>
  );
}

export default App;
