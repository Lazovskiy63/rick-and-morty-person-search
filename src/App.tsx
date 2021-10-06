import React from 'react';
import logo from './logo.svg';
import './App.css';
import RickAndMortySearchPersonApp from './Components/RickAndMortySearchPerson';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './graphQlApollo/apolloClient';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <RickAndMortySearchPersonApp />
    </ApolloProvider>
  );
}

export default App;
