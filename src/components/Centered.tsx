/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FC } from 'react';

export const Centered: FC = ({ children }) => (
  <div className="vh-100 flex justify-center items-center">{children}</div>
);
