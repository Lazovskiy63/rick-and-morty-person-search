/** @jsxRuntime classic /
/* @jsx jsx */

import { jsx, css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { PersonOutputType, STANDART_SELECT_VALUE } from '../types/types';
import CardPerson from './CardPerson';
type QueryType = {
  status: string | null[] | null;
  species: string | null[] | null;
  gender: string | null[] | null;
  type: string | null[] | null;
};
interface ResultByFilterArgs {
  query: QueryType;
  currentPage: any;
  setInfoPages: Function;
}
const ResultByFilter = ({
  setInfoPages,
  currentPage,
  query,
}: ResultByFilterArgs) => {
  const [resultsByFilter, setResultsByFilter] = useState([]);

  const REQUEST_INPUT2S = gql`
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
          location {
            name
          }
          episode {
            name
          }
        }
      }
    }
  `;
  const { data, loading, error } = useQuery(REQUEST_INPUT2S, {
    variables: {
      page: currentPage,
      status: query.status === STANDART_SELECT_VALUE ? '' : query.status,
      species: query.species === STANDART_SELECT_VALUE ? '' : query.species,
      gender: query.gender === STANDART_SELECT_VALUE ? '' : query.gender,
      type: query.type === STANDART_SELECT_VALUE ? '' : query.type,
    },
  });

  useEffect(() => {
    if (error) {
      setResultsByFilter([]);
      setInfoPages(0);
    }

    if (!loading && !error) {
      setResultsByFilter(Object.values(data.characters.results));
      setInfoPages(data.characters.info.pages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);
  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
        overflow: auto;
        justify-content: space-around;
        height: 95vh;

        ::-webkit-scrollbar {
          display: none;
        }
      `}
    >
      <div
        css={css`
          height: 104px;
          width: 100vw;
        `}
      ></div>
      {resultsByFilter.map((person: PersonOutputType) => {
        return <CardPerson key={person.id} person={person} />;
      })}
    </div>
  );
};
export default ResultByFilter;
