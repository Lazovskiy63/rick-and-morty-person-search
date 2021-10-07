/** @jsxRuntime classic /
/* @jsx jsx */

import { jsx, css } from '@emotion/react';
import {
  Card,
  CardMedia,
  Typography,
  Popper,
  Fade,
  Paper,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { PersonOutputType } from '../types/types';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import DialogPersonDescription from './DialogPersonDescription';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface CardPersonArgs {
  person: PersonOutputType;
}

interface CharParams {
  param: string;
  value: string;
}

export const CharParams = ({ param, value }: CharParams) => {
  return (
    <Typography>
      <b>{param}:</b> {value}
    </Typography>
  );
};

const CardPerson = ({ person }: CardPersonArgs) => {
  const [isVisibleEpisodes, setIsVisibleEpisodes] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
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
          `}
        >
          ...
        </label>
      </div>
    </Card>
  );
};
export default CardPerson;
