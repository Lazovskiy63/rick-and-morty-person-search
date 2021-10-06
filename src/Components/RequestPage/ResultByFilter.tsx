import { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Pagination from '@mui/material/Pagination';
import { useHistory } from 'react-router-dom';
type ResultByFilter = {
  query: any;
};
const ResultByFilter = ({ query }: ResultByFilter) => {
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
      status: query.status === 'none' ? '' : query.status,
      species: query.species === 'none' ? '' : query.species,
      gender: query.gender === 'none' ? '' : query.gender,
      type: query.type === 'none' ? '' : query.type,
    },
  });

  let arrayResults: any = [];

  useEffect(() => {
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
        {currentPage} of {infoPages}
        <Pagination
          onChange={onChangePagination}
          count={infoPages}
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </Container>
    </div>
  );
};
export default ResultByFilter;
