/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
import { ForecastCompact } from 'components/ForecastCompact';
import qs from 'query-string';
import { FC } from 'react';
import { singleQueryString } from 'utils/helpers';
import { theme } from 'utils/theme';

export const App: FC = () => {
  const { noBg, site, latlon, interval, withTitle } = qs.parse(
    window.location.search,
  );
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
  let showTitle = false;
  try {
    showTitle = JSON.parse(singleQueryString(withTitle) || 'false');
  } catch (e) {
    // no-op
  }

  return (
    <div className="vh-100 flex flex-column justify-between">
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
        showTitle={showTitle}
      />
      <a
        className="mt2 self-start color-inherit link hover-gray"
        css={css`
          font-size: 0.5rem;
        `}
        href="https://en.ilmatieteenlaitos.fi/open-data-licence"
        target="_blank"
        rel="noreferrer noopener"
      >
        ©&nbsp;Ilmatieteen laitos
      </a>
    </div>
  );
};
