import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  Redirect,
  useHistory,
} from 'react-router-dom';

import RequestPage from './RequestPage/RequestPage';
import { useState } from 'react';
//    '/rick-and-morty-search-person/search?status=nevermind?species=nevermind?gender=nevermind?type=nevermind'
//<Redirect to={{ pathname: currentLink, search: '?name=akfga' }} />
const RickAndMortySearchPersonApp = () => {
  const [currentLink, setCurrentLink] = useState(
    '/rick-and-morty-search-person/'
  );

  return (
    <Router>
      <Route exact path={currentLink}>
        <RequestPage setCurrentLink={setCurrentLink} />
      </Route>
      <Redirect
        to={{
          pathname: currentLink,
          search:
            '?status=never1mind&species=neve2rmind&gender=nev3ermind&type=ne4vermind',
        }}
      />
    </Router>
  );
};

export default RickAndMortySearchPersonApp;
