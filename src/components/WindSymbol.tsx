/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import WindDirectionIcon from 'assets/wind-direction.svg';
import { FC, Fragment } from 'react';

export const WindSymbol: FC<{
  windspeedms?: number;
  winddirection?: number;
}> = ({ windspeedms, winddirection }) => (
  <div
    className="f7 relative flex items-center justify-center"
    css={css`
      width: 1.5rem;
      height: 1.5rem;
    `}
  >
    {windspeedms !== undefined && winddirection !== undefined && (
      <Fragment>
        <img
          src={WindDirectionIcon}
          className="absolute w-100 h-100"
          css={css`
            transform: rotate(${winddirection + 180}deg);
          `}
          alt=""
        />
        <div>{windspeedms && Math.round(windspeedms)}</div>
      </Fragment>
    )}
  </div>
);
