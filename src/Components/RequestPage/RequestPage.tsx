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
import { Button, Container } from '@mui/material';
import { Box } from '@mui/system';
import ResultByFilter from './ResultByFilter';
import { TYPE_INPUT } from '../TYPES/INPUT_FORM';
import { useLocation, useHistory } from 'react-router-dom';
import SelectFilters from './SelectFilters';
const START_URL =
  '/rick-and-morty-search-person/?status=none&species=none&gender=none&type=none';
const RequestPage = () => {
  let location = useLocation();
  const params = new URLSearchParams(location.search);

  const [status, setStatus] = useState(params.get('status'));
  const [species, setSpecies] = useState(params.get('species'));
  const [gender, setGender] = useState(params.get('gender'));
  const [type, setType] = useState(params.get('type'));

  let history = useHistory();
  useEffect(() => {
    history.push(
      location.pathname +
        `?status=${status}&species=${species}&gender=${gender}&type=${type}`
    );
  }, [status, species, gender, type]);
  const [dataFromGraphQl, setDataFromGraphQl] = useState('');
  const REQUEST_INPUTS: any = gql`
    query Characters($status: String) {
      characters(filter: { status: $status }) {
        results {
          species
          gender
          type
        }
      }
    }
  `;

  const { data }: { data: any } = useQuery(REQUEST_INPUTS, {
    variables: {
      status: status,
    },
  });
  useEffect(() => {
    if (data) {
      setDataFromGraphQl(data.characters.results);
    }
  }, [data]);

  const arrayPersonsWithRepeat = Object.values(dataFromGraphQl);
  const selectInputs: any = {
    statusArray: ['Alive', 'Dead', 'unknown'],
    speciesArray: [],
    genderArray: [],
    typeArray: [],
  };

  arrayPersonsWithRepeat.forEach((item: any) => {
    if (!selectInputs.speciesArray.includes(item.species)) {
      selectInputs.speciesArray.push(item.species);
    }
    if (!selectInputs.genderArray.includes(item.gender)) {
      selectInputs.genderArray.push(item.gender);
    }
    if (!selectInputs.typeArray.includes(item.type || 'unknown')) {
      selectInputs.typeArray.push(item.type || 'unknown');
    }
  });
  console.log(selectInputs);
  return (
    <div>
      <Box display="flex">
        <SelectFilters
          value={status}
          onChange={setStatus}
          nameSelect={'Status'}
          options={selectInputs.statusArray}
        />
        <SelectFilters
          value={species}
          onChange={setSpecies}
          nameSelect={'Species'}
          options={selectInputs.speciesArray}
        />
        <SelectFilters
          value={gender}
          onChange={setGender}
          nameSelect={'Gender'}
          options={selectInputs.genderArray}
        />
        <SelectFilters
          value={type}
          onChange={setType}
          nameSelect={'Type'}
          options={selectInputs.typeArray}
        />

        <Button
          onClick={() => {
            history.push(START_URL);
            setStatus('none');
            setSpecies('none');
            setGender('none');
            setType('none');
          }}
        >
          Clear filters
        </Button>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <ResultByFilter
          query={{
            status: status,
            species: species,
            gender: gender,
            type: type,
          }}
        />
      </Box>
    </div>
  );
};
export default RequestPage;
