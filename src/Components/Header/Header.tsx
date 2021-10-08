/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx, css } from '@emotion/react';

import { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import ResultByFilter from '../Content/Content';
import { useLocation, useHistory } from 'react-router-dom';
import SelectFilters from './SelectFilters';
import { GraphQlResultType, STANDART_SELECT_VALUE } from '../types/types';
const START_URL =
  '/rick-and-morty-search-person/?status=none&species=none&gender=none&type=none';
interface HeaderArgs {
  status: any;
  species: any;
  gender: any;
  type: any;
  setStatus: any;
  setSpecies: any;
  setGender: any;
  setType: any;
  infoPages: any;
  setCurrentPage: Function;
  currentPage: any;
}
const Header = ({
  status,
  species,
  gender,
  type,
  setStatus,
  setSpecies,
  setGender,
  setType,
  currentPage,
  setCurrentPage,
  infoPages,
}: HeaderArgs) => {
  let location = useLocation();
  const params = new URLSearchParams(location.search);
  let history = useHistory();

  const [dataFromGraphQl, setDataFromGraphQl] = useState<GraphQlResultType[]>(
    []
  );

  const REQUEST_INPUTS = gql`
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

  type GraphQlDataType = {
    characters: {
      results: GraphQlResultType[];
    };
  };
  interface QueryOutputs {
    data: GraphQlDataType | undefined;
    loading: boolean;
  }
  const { data, loading }: QueryOutputs = useQuery(REQUEST_INPUTS, {
    variables: {
      status: status === STANDART_SELECT_VALUE ? '' : status,
    },
  });
  useEffect(() => {
    setStatus(params.get('status'));
    setSpecies(params.get('species'));
    setGender(params.get('gender'));
    setType(params.get('type'));
  }, []);
  useEffect(() => {
    if (!infoPages) {
      setCurrentPage(1);
    }
    history.push(
      location.pathname +
        `?status=${status}&species=${species}&gender=${gender}&type=${type}`
    );
    if (data) {
      setDataFromGraphQl(data.characters.results);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, species, gender, type, loading]);

  type SelectInputsType = {
    statusArray: string[];
    speciesArray: string[];
    genderArray: string[];
    typeArray: string[];
  };
  const selectInputs: SelectInputsType = {
    statusArray: ['Alive', 'Dead', 'unknown'],
    speciesArray: [],
    genderArray: [],
    typeArray: [],
  };

  for (const graphQlResult of Object.values(dataFromGraphQl)) {
    if (!selectInputs.speciesArray.includes(graphQlResult.species)) {
      selectInputs.speciesArray.push(graphQlResult.species);
    }
    if (!selectInputs.genderArray.includes(graphQlResult.gender)) {
      selectInputs.genderArray.push(graphQlResult.gender);
    }
    if (!selectInputs.typeArray.includes(graphQlResult.type || 'unknown')) {
      selectInputs.typeArray.push(graphQlResult.type || 'unknown');
    }
  }
  return (
    <div
      css={css`
        position: fixed;
        top: 25px;
        left: 0;
        width: 100vw;
        height: 7vh;
        display: flex;
        justify-content: center;
        align-items: end;
        min-height: 55px;
      `}
    >
      <div
        css={css`
          justify-content: space-around;
          box-shadow: rgb(0 0 0 / 49%) 1px 5px 12px;
          background-color: white;
          // width: 55vw;
          width: fit-content;
          padding: 5px;
          height: 5vh;
          border-radius: 4px;
          display: flex;
          margin-top: 10px;

          min-height: 55px;
        `}
      >
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
          sx={{ height: '50px' }}
          onClick={() => {
            history.push(START_URL);
            setStatus(STANDART_SELECT_VALUE);
            setSpecies(STANDART_SELECT_VALUE);
            setGender(STANDART_SELECT_VALUE);
            setType(STANDART_SELECT_VALUE);
          }}
        >
          clear filters
        </Button>
      </div>
    </div>
  );
};
export default Header;
