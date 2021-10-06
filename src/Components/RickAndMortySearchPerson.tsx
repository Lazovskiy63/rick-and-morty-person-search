import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom';

import RequestPage from './RequestPage/RequestPage';
import { useEffect, useState } from 'react';

const RickAndMortySearchPersonApp = () => {
  let history = useHistory();
  const [currentLink, setCurrentLink] = useState(
    '/rick-and-morty-search-person/'
  );

  return (
    <Router>
      <Route path={currentLink}>
        <RequestPage />
      </Route>
      <Route exact path="/">
        <Redirect to="/rick-and-morty-search-person/?status=none&species=none&gender=none&type=none" />
      </Route>
    </Router>
  );
};

export default RickAndMortySearchPersonApp;
