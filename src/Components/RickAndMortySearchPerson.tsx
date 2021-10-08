import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Header from './Header/Header';
import Content from './Content/Content';
import Footer from './Footer/Footer';
import { useEffect, useState } from 'react';
import backgroundImage from '../assets/background.jpg';

const RickAndMortySearchPersonApp = () => {
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');
  const [gender, setGender] = useState('');
  const [type, setType] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [infoPages, setInfoPages] = useState(1);
  useEffect(() => {
    document.body.style.position = 'fixed'; //?
    document.body.style.backgroundImage = `url(${backgroundImage})`;
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
          infoPages={infoPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <Content
          currentPage={currentPage}
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
