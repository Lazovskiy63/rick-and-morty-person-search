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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  Redirect,
  useHistory,
} from 'react-router-dom';

type RequestPageArgs = { setCurrentLink: Function };
const RequestPage = ({ setCurrentLink }: RequestPageArgs) => {
  let location = useLocation();
  const params = new URLSearchParams(location.search);

  const [status, setStatus] = useState(params.get('status'));
  const [species, setSpecies] = useState(params.get('species'));
  const [gender, setGender] = useState(params.get('gender'));
  const [type, setType] = useState(params.get('type'));
  let history = useHistory();
  useEffect(() => {
    console.log('eff');
    console.log('effPATH+SEARCH', location.pathname + location.search);
    history.push(location.pathname + location.search);
  }, [status, species, gender, type]);

  const [dataFromGraphQl, setDataFromGraphQl] = useState('');
  const [resultByFilters, setResultByFilters] = useState('');
  console.log('location: ', location.pathname, 'search: ', location.search);
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

  // const status = params.get('status');
  // const species = params.get('species');
  // const gender = params.get('gender');
  // const type = params.get('type');
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

  const handleChangeInputs = (event: any, type: any) => {
    const value = event.target.value;
    switch (type) {
      case TYPE_INPUT.STATUS:
        console.log(value);
        // setStatus(value);
        params.set('status', value);
        break;
      case TYPE_INPUT.SPECIES:
        params.set('species', value);
        setSpecies(value);
        break;
      case TYPE_INPUT.GENDER:
        params.set('gender', value);
        setGender(value);
        break;
      default:
        params.set('type', value);
        setType(value);
    }
  };

  const arrayPersonsWithRepeat = Object.values(dataFromGraphQl);
  const selectInputs: any = {
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

  return (
    <div>
      <Box display="flex">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={status}
            onChange={(e) => handleChangeInputs(e, TYPE_INPUT.STATUS)}
            label="Status"
            sx={{ width: '110px', overflow: 'hidden' }}
          >
            <MenuItem value={'nevermind'}>nevermind</MenuItem>
            <MenuItem value={'Alive'}>Alive</MenuItem>
            <MenuItem value={'Dead'}>Dead</MenuItem>
            <MenuItem value={'unknown'}>Unknown</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Species
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={species}
            onChange={(e) => handleChangeInputs(e, TYPE_INPUT.SPECIES)}
            label="Status"
            sx={{ width: '110px', overflow: 'hidden' }}
          >
            <MenuItem value={'nevermind'}>nevermind</MenuItem>
            {selectInputs.speciesArray.map((species: any) => {
              return (
                <MenuItem key={species} value={species}>
                  {species}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={gender}
            onChange={(e) => handleChangeInputs(e, TYPE_INPUT.GENDER)}
            label="Status"
            sx={{ width: '110px', overflow: 'hidden' }}
          >
            <MenuItem value={'nevermind'}>nevermind</MenuItem>
            {selectInputs.genderArray.map((gender: any) => {
              return (
                <MenuItem key={gender} value={gender}>
                  {gender}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={type}
              onChange={(e) => handleChangeInputs(e, TYPE_INPUT.TYPE)}
              label="Status"
              sx={{ width: '110px', overflow: 'hidden' }}
            >
              <MenuItem value={'nevermind'}>nevermind</MenuItem>
              {selectInputs.typeArray.map((type: any) => {
                return (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <ResultByFilter
          setCurrentLink={setCurrentLink}
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
