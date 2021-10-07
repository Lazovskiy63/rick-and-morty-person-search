/** @jsxRuntime classic /
/* @jsx jsx */

import { jsx, css } from '@emotion/react';
import { useState } from 'react';
import { PersonOutputType } from '../types/types';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { CardMedia, Typography } from '@mui/material';
import { CharParams } from './CardPerson';
interface DialogPersonDescriptionArgs {
  onChange: Function;
  value: boolean;
  person: any;
}
const DialogPersonDescription = ({
  onChange,
  person,
  value,
}: DialogPersonDescriptionArgs) => {
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuDialogContent-root': {},
    '& .MuDialogActions-root': {},
  }));
  return (
    <BootstrapDialog
      fullWidth={true}
      onClose={() => onChange(false)}
      aria-labelledby="customized-dialog-title"
      open={value}
    >
      <div
        css={css`
          text-align: center;
          margin-top: 5px;
        `}
      >
        {person.name}
      </div>

      <div
        css={css`
          padding: 15px;
          display: grid;
          grid-gap: 10px;
          grid-template-columns: 294px;
          grid-template-rows: 290px;
          grid-template-areas:
            'image  episodes '
            'main   episodes ';
        `}
      >
        <div
          css={css`
            width: px;
            height: 470px;
            grid-area: image;
          `}
        >
          <img alt={person.name} src={person.image} />
        </div>
        <div
          css={css`
            grid-area: main;
          `}
        >
          <CharParams param="Status" value={person.status} />
          <CharParams param="Species" value={person.species} />
          <CharParams param="Gender" value={person.gender} />
          <CharParams param="Type" value={person.type || 'none'} />
        </div>
        <div
          css={css`
            padding: 4px;
            height: 60vh;
            // height: 100px;
            overflow: auto;
            grid-area: episodes;
          `}
        >
          {person.episode.length === 1 ? <b>Episode:</b> : <b>Episodes:</b>}
          <ol
            css={css`
              margin-top: 1px;
              margin-left: -18px;
            `}
          >
            {person.episode.map((episode: { name: string }, index: number) => {
              return (
                <a
                  css={css`
                    text-decoration: none;
                    color: black;
                    font-style: oblique;
                  `}
                  rel="noreferrer"
                  target="_blank"
                  href={
                    `https://www.google.com/search?q=rick and morty ${episode.name}&oq=rick and morty` +
                    episode.name
                  }
                  key={person.id + episode.name + 'popper'}
                >
                  <li> {episode.name}</li>
                </a>
              );
            })}
          </ol>
        </div>
      </div>
      <CardMedia />
    </BootstrapDialog>
  );
};
export default DialogPersonDescription;
