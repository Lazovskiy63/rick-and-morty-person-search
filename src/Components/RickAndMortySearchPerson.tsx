import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Header from './Header/Header';
import Content from './Content/Content';
import Footer from './Footer/Footer';
import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const RickAndMortySearchPersonApp = () => {
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');
  const [gender, setGender] = useState('');
  const [type, setType] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [infoPages, setInfoPages] = useState(1);
  useEffect(() => {
    document.body.style.position = 'fixed'; //?
  }, []);
  return (
    <Router>
      <Route path={'/rick-and-morty-search-person/'}>
        <Header
          status={status}
          species={species}
          gender={gender}
          type={type}
          setStatus={setStatus}
          setSpecies={setSpecies}
          setGender={setGender}
          setType={setType}
        />
        <Content
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setInfoPages={setInfoPages}
          query={{
            status: status,
            species: species,
            gender: gender,
            type: type,
          }}
        />
        <Footer
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          infoPages={infoPages}
        />
      </Route>
      <Route exact path="/">
        <Redirect to="/rick-and-morty-search-person/?status=none&species=none&gender=none&type=none" />
      </Route>
    </Router>
  );
};

export default RickAndMortySearchPersonApp;
