/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
import { ForecastCompact } from 'components/ForecastCompact';
import { ForecastDisplay } from 'components/ForecastDisplay';
import { ForecastList } from 'components/ForecastList';
import { ObservationDisplay } from 'components/ObservationDisplay';
import qs from 'query-string';
import { FC, Fragment } from 'react';
import {
  queryStringBoolean,
  queryStringInt,
  queryStringNumber,
  singleQueryString,
} from 'utils/helpers';
import { theme } from 'utils/theme';

export const App: FC = () => {
  const {
    nobg,
    site,
    latlon,
    interval,
    title,
    list,
    count,
    observation,
    lang,
    fontsize,
    padding,
  } = qs.parse(window.location.search);
  const noBackground = queryStringBoolean(nobg);
  const latlonStr = singleQueryString(latlon);
  const siteStr = singleQueryString(site);
  const hourIntervalInt = queryStringInt(interval);
  const showTitle = queryStringBoolean(title);
  const asList = queryStringBoolean(list);
  const numResults = queryStringInt(count);
  const showObservation = queryStringBoolean(observation);
  const parsedLang = singleQueryString(lang);
  const fontSizeOverride = queryStringNumber(fontsize);
  const extraPadding = queryStringNumber(padding);
  const language =
    parsedLang && (parsedLang === 'fi' || parsedLang === 'en')
      ? parsedLang
      : 'fi';
  const rootFontSize =
    fontSizeOverride || (showObservation ? 6.5 : asList ? 7.25 : 5);

  return (
    <Fragment>
      <Global
        styles={css`
          @import url('https://fonts.googleapis.com/css?family=Roboto:400,700');
          * {
            box-sizing: border-box;
          }
          html {
            font-size: ${rootFontSize}vw;
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
            padding: ${extraPadding || 0}px;
          }
        `}
      />
      {showObservation ? (
        <ObservationDisplay
          params={{
            site: siteStr,
            latlon: latlonStr,
          }}
          showTitle={showTitle}
          lang={language}
        />
      ) : (
        <ForecastDisplay
          params={{
            site: siteStr,
            latlon: latlonStr,
            hourInterval: hourIntervalInt,
            numResults:
              asList && numResults ? Math.min(numResults, 24) : undefined,
          }}
          showTitle={showTitle}
          component={asList ? ForecastList : ForecastCompact}
        />
      )}
    </Fragment>
  );
};
