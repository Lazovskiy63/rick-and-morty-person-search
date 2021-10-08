/** @jsxRuntime classic /
/* @jsx jsx */

import { jsx, css } from '@emotion/react';
import { Card, CardMedia, Typography } from '@mui/material';
import { useState } from 'react';
import { PersonOutputType } from '../types/types';

import DialogPersonDescription from './DialogPersonDescription';

interface CardPersonArgs {
  person: PersonOutputType;
}

type CharParamsType = {
  param: string;
  value: string;
};

export const CharParams = ({ param, value }: CharParamsType) => {
  return (
    <Typography>
      <b>{param}:</b> {value}
    </Typography>
  );
};

const CardPerson = ({ person }: CardPersonArgs) => {
  const [isOpenDialogPersonDescription, setIsOpenDialogPersonDescription] =
    useState(false);

  return (
    <Card
      key={person.id}
      sx={{
        width: 200,
        margin: 0.5,
        boxShadow:
          'box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
        height: 'fit-content',
      }}
    >
      <DialogPersonDescription
        person={person}
        onChange={setIsOpenDialogPersonDescription}
        value={isOpenDialogPersonDescription}
      />
      <Typography
        sx={{
          textAlign: 'center',
          height: '25px',
          overflow: 'hidden',
        }}
      >
        {person.name}
      </Typography>
      <CardMedia
        component="img"
        height="200"
        image={person.image}
        alt={person.name}
      />
      <div
        css={css`
          justify-content: space-between;
          z-index: -1;
          height: 170px;
          display: flex;
          ::-webkit-scrollbar {
            display: none;
          }

          overflow: auto;
        `}
      >
        <Typography>
          <CharParams param="Status" value={person.status} />
          <CharParams param="Species" value={person.species} />
          <CharParams param="Gender" value={person.gender} />
          <CharParams param="Type" value={person.type || 'none'} />
        </Typography>

        <label
          onClick={() => setIsOpenDialogPersonDescription(true)}
          css={css`
            align-self: self-end;
            border-top-left-radius: 2px;
            padding: 5px 15px;
            background-color: #ececec;
            user-select: none;
            -moz-user-select: none;
            -khtml-user-select: none;
            -webkit-user-select: none;
            -o-user-select: none;
            &:hover {
              background-color: #aeaeae;
              cursor: cell;
            }
          `}
        >
          ...
        </label>
      </div>
    </Card>
  );
};
export default CardPerson;
