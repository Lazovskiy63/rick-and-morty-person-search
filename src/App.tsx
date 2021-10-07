import './App.css';
import RickAndMortySearchPersonApp from './Components/RickAndMortySearchPerson';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './graphQlApollo/apolloClient';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <RickAndMortySearchPersonApp />
    </ApolloProvider>
  );
}

export default App;
