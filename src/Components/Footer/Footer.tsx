/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Pagination, Typography, Paper } from '@mui/material';
interface FooterArgs {
  currentPage: any;
  infoPages: any;
  setCurrentPage: Function;
}
const Footer = ({ currentPage, infoPages, setCurrentPage }: FooterArgs) => {
  return (
    <div
      id="footer"
      css={css`
        min-width: 350px;
        height: 5vh;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
      `}
    >
      {currentPage} of {infoPages}
      <Pagination
        onChange={(e, value) => setCurrentPage(value)}
        count={infoPages}
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </div>
  );
};
export default Footer;
