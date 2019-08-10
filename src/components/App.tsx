/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
import { ForecastCompact } from 'components/ForecastCompact';
import qs from 'query-string';
import { FC, Fragment } from 'react';
import { singleQueryString } from 'utils/helpers';
import { theme } from 'utils/theme';

export const App: FC = () => {
  const { noBg, site, latlon, interval } = qs.parse(window.location.search);
  let noBackground = false;
  try {
    noBackground = JSON.parse(singleQueryString(noBg) || 'false');
  } catch (e) {
    // no-op
  }
  const latlonStr = singleQueryString(latlon);
  const siteStr = singleQueryString(site);
  const hourIntervalStr = singleQueryString(interval);
  const hourIntervalInt =
    (hourIntervalStr && parseInt(hourIntervalStr, 10)) || undefined;

  return (
    <Fragment>
      <Global
        styles={css`
          @import url('https://fonts.googleapis.com/css?family=Roboto:400,700');
          * {
            box-sizing: border-box;
          }
          html {
            font-size: 5vw;
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
      <ForecastCompact
        params={{
          site: siteStr,
          latlon: latlonStr,
          hourInterval: hourIntervalInt,
        }}
      />
    </Fragment>
  );
};
