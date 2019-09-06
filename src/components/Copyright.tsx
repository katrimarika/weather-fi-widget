/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FC } from 'react';

export const Copyright: FC = () => (
  <a
    className="pt2 self-start color-inherit link hover-gray"
    css={css`
      margin-top: auto;
      font-size: 0.5rem;
    `}
    href="https://en.ilmatieteenlaitos.fi/open-data-licence"
    target="_blank"
    rel="noreferrer noopener"
  >
    Data ©&nbsp;Ilmatieteen laitos
  </a>
);
