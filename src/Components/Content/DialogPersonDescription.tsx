/** @jsxRuntime classic /
/* @jsx jsx */

import { jsx, css } from '@emotion/react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { CardMedia } from '@mui/material';
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
          font-style: normal;
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
