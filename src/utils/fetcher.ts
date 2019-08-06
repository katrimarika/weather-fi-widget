import Metolib from '@fmidev/metolib';

const API_URL = 'http://opendata.fmi.fi/wfs';
const STORED_QUERY_OBSERVATION =
  'fmi::observations::weather::multipointcoverage';
const STORED_QUERY_FORECAST =
  'fmi::forecast::hirlam::surface::point::multipointcoverage';

const requestParser = new Metolib.WfsRequestParser();

const forecastProperties = [
  'temperature',
  'winddirection',
  'windspeedms',
] as const;
const observationProperties = ['temperature', 'td', 'ws_10min'] as const;

export type ForecastPropertyKey = typeof forecastProperties[number];
export type ObservationPropertyKey = typeof observationProperties[number];

type DataProperty = {
  label: string;
  phenomenon: string;
  statisticalFunction: string;
  statisticalPeriod: string;
  unit: string;
};

type TimeValuePair = {
  time: number;
  value: number;
};

export type LocationResults<
  K extends ForecastPropertyKey | ObservationPropertyKey
> = {
  data: {
    [key in K]: {
      property: DataProperty;
      timeValuePairs: TimeValuePair[];
    }
  };
  info: {
    fmisid: string;
    geoid: string;
    id: string;
    name: string;
    position: [string, string]; // latitude, longitude
    region: string;
    timezone: string;
    wmo: string;
  };
};

type MetolibResult<K extends ForecastPropertyKey | ObservationPropertyKey> = {
  info: {
    begin: Date;
    end: Date;
  };
  locations: Array<LocationResults<K>>;
  properties: { [key in K]: DataProperty };
};

type MetolibError = {
  errorCode?: number;
  errorText?: string;
};

export type RemoteData<
  K extends ForecastPropertyKey | ObservationPropertyKey
> =
  | {
      status: 'LOADING';
    }
  | {
      status: 'ERROR';
      errors: MetolibError[];
    }
  | {
      status: 'SUCCESS';
      data: Array<LocationResults<K>>;
    };

export const getForecastData = (
  site: string,
  onSuccess: (data: Array<LocationResults<ForecastPropertyKey>>) => void,
  onError: (errors: MetolibError[]) => void,
) => {
  const now = new Date();
  const begin = now;
  const end = new Date(now.getTime() + 12 * 60 * 60 * 1000);
  requestParser.getData({
    url: API_URL,
    storedQueryId: STORED_QUERY_FORECAST,
    requestParameter: forecastProperties,
    begin,
    end,
    timestep: 60 * 60 * 1000,
    sites: site, // would also accept string[]
    callback: (
      data: MetolibResult<ForecastPropertyKey>,
      errors: MetolibError[],
    ) => {
      if (errors.length) {
        onError(errors);
      } else {
        onSuccess(data.locations);
      }
    },
  });
};

export const getObservationData = (
  site: string,
  onSuccess: (data: Array<LocationResults<ObservationPropertyKey>>) => void,
  onError: (errors: MetolibError[]) => void,
) => {
  const now = new Date();
  const begin = new Date(now.setHours(now.getHours() - 1));
  const end = new Date(now);
  requestParser.getData({
    url: API_URL,
    storedQueryId: STORED_QUERY_OBSERVATION,
    requestParameter: observationProperties,
    begin,
    end,
    timestep: 60 * 60 * 1000,
    sites: site, // would also accept string[]
    callback: (
      data: MetolibResult<ObservationPropertyKey>,
      errors: MetolibError[],
    ) => {
      if (errors.length) {
        onError(errors);
      } else {
        onSuccess(data.locations);
      }
    },
  });
};
