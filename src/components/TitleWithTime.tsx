/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FC } from 'react';
import { leading0 } from 'utils/helpers';

export const TitleWithTime: FC<{ title: string; time?: number }> = ({
  title,
  time,
}) => {
  const date = time ? new Date(time) : undefined;
  return (
    <h1 className="f4 fw7 mt0 mb2">
      <span>{title}</span>
      {date ? (
        <span className="f6 fw4 db mt1">{`${date.toLocaleDateString('fi', {
          day: '2-digit',
          month: '2-digit',
        })}\u00a0${leading0(date.getHours())}:${leading0(
          date.getMinutes(),
        )}`}</span>
      ) : null}
    </h1>
  );
};
