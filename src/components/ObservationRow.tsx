/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FC, Fragment } from 'react';
import { ObservationProperties } from 'utils/fetcher';
import { rounded0Str, rounded1Str } from 'utils/helpers';

export const ObservationRow: FC<{
  property: ObservationProperties[number];
  value?: number;
  lang: 'fi' | 'en';
}> = ({ property, value, lang }) => {
  if (value === undefined) return null;
  if (property === 'snow_aws' && value === -1) return null;
  if (property === 'n_man' && value > 8) return null;

  const helpers = propertyHelpers[property];
  return (
    <div className="flex justify-between items-center pv2">
      <div className="mr2">{helpers[lang]}</div>
      <div>
        {helpers.transform ? helpers.transform(value) : value}
        {helpers.unit}
      </div>
    </div>
  );
};

const propertyHelpers: {
  [key in ObservationProperties[number]]: {
    fi: string;
    en: string;
    unit?: string;
    transform?: (v: number) => string;
  }
} = {
  t2m: {
    fi: 'Lämpötila',
    en: 'Temperature',
    unit: ' °C',
    transform: rounded1Str,
  },
  ws_10min: {
    fi: 'Tuuli',
    en: 'Wind',
    unit: ' m/s',
    transform: rounded0Str,
  },
  wg_10min: {
    fi: 'Puuska',
    en: 'Gust',
    unit: ' m/s',
    transform: rounded0Str,
  },
  wd_10min: {
    fi: 'Tuulen suunta',
    en: 'Wind direction',
  },
  rh: {
    fi: 'Kosteus',
    en: 'Humidity',
    unit: ' %',
    transform: rounded0Str,
  },
  td: {
    fi: 'Kastepiste',
    en: 'Dew-point',
    unit: ' °C',
    transform: rounded1Str,
  },
  r_1h: {
    fi: 'Sateen määrä',
    en: 'Rain amount',
    unit: ' mm',
    transform: rounded1Str,
  },
  ri_10min: {
    fi: 'Sateen intensiteetti',
    en: 'Rain intensity',
    unit: ' mm/h',
    transform: rounded1Str,
  },
  snow_aws: {
    fi: 'Lumen syvyys',
    en: 'Snow depth',
    unit: ' cm',
    transform: rounded1Str,
  },
  p_sea: {
    fi: 'Paine',
    en: 'Pressure',
    unit: ' hPa',
    transform: rounded1Str,
  },
  vis: {
    fi: 'Näkyvyys',
    en: 'Visibility',
    unit: ' km', // original m
    transform: v => rounded0Str(v / 1000),
  },
  n_man: {
    fi: 'Pilvisyys',
    en: 'Cloudiness',
    unit: '/8',
    transform: rounded0Str,
  },
  wawa: {
    fi: 'Säätila',
    en: 'Weather',
  },
};
