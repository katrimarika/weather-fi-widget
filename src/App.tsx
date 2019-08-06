/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
import { FC, Fragment } from 'react';
import { theme } from 'theme';

export const App: FC = () => {
  const noBackground = window.location.search.includes('noBg');

  return (
    <Fragment>
      <Global
        styles={css`
          @import url('https://fonts.googleapis.com/css?family=Roboto:400,700');
          * {
            box-sizing: border-box;
          }
          html {
            font-size: '1.57vw';
          }
          body {
            margin: 0;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            -webkit-overflow-scrolling: touch;
            background: ${noBackground
              ? theme.colors.transparent
              : theme.colors.black};
            color: ${theme.colors.white};
            font-family: ${theme.fonts.body};
            position: relative;
          }
        `}
      />
      Content
    </Fragment>
  );
};
