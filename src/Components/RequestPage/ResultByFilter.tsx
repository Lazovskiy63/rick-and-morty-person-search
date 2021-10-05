import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Icon from '@mui/material/Icon';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useParams,
  useLocation,
} from 'react-router-dom';
type ResultByFilter = {
  query: any;
  setCurrentLink: Function;
};
const ResultByFilter = ({ query, setCurrentLink }: ResultByFilter) => {
  const historyRoute = useHistory();

  const [resultsByFilter, setResultsByFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState(2);
  const [infoPages, setInfoPages] = useState(1);

  const onChangePagination = (event: any, value: number) => {
    setCurrentPage(value);
  };

  const REQUEST_INPUT2S: any = gql`
    query Characters(
      $page: Int
      $status: String
      $species: String
      $gender: String
      $type: String
    ) {
      characters(
        page: $page
        filter: {
          status: $status
          species: $species
          gender: $gender
          type: $type
        }
      ) {
        info {
          pages
        }
        results {
          name
          status
          species
          type
          gender
          image
          id
        }
      }
    }
  `;
  const { data, loading, error } = useQuery(REQUEST_INPUT2S, {
    variables: {
      page: currentPage,
      status: query.status === 'nevermind' ? '' : query.status,
      species: query.species === 'nevermind' ? '' : query.species,
      gender: query.gender === 'nevermind' ? '' : query.gender,
      type: query.type === 'nevermind' ? '' : query.type,
    },
  });

  let arrayResults: any = [];
  // useEffect(() => {
  //   console.log('pathName', location.pathname);
  // }, [location]);

  useEffect(() => {
    // const url = `/search?status=${query.status}&species=${
    //   query.species
    // }&gender=${query.gender}&type=${query.type.replace(/\)|\(/g, '')}/`;
    // setCurrentLink(url);
    // historyRoute.push(url);
    if (error) {
      setResultsByFilter([]);
      setInfoPages(0);
    }

    if (!loading && !error) {
      setResultsByFilter(Object.values(data.characters.results));
      setInfoPages(data.characters.info.pages);
    }
  }, [data, error]);

  return (
    <div>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {resultsByFilter.map((person: any) => {
          return (
            <Card
              key={person.id}
              sx={{
                width: '9.1vw',
                minHeight: 320,
                maxHeight: 320,
                margin: 0.5,
                overflow: 'auto',
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={person.image}
                alt={person.name}
              />
              <CardContent>
                <Typography sx={{ marginTop: -2 }}>{person.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  status: {person.status} <br /> species: {person.species}
                  <br />
                  gender: {person.gender}
                  <br />
                  type: {person.type}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
      <Container
        sx={{
          display: 'flex',
          position: 'fixed',
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* rows per page
        <Select defaultValue={2} sx={{ width: 60, height: 40 }}>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
        </Select> */}
        {currentPage} of {infoPages}
        <Pagination
          onChange={onChangePagination}
          count={infoPages}
          shape="rounded"
          showFirstButton
          showLastButton
        />
        {/* <Button onClick={() => console.log(location.pathname)}>Locat</Button> */}
      </Container>
    </div>
  );
};
export default ResultByFilter;
