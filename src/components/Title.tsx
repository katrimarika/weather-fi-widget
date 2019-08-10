/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FC } from 'react';

export const Title: FC<{ title: string }> = ({ title }) => (
  <h1 className="f3 fw7 mt0 mb2">{title}</h1>
);
