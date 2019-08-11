import Metolib from '@fmidev/metolib';
import mapValues from 'lodash.mapvalues';

const API_URL = 'http://opendata.fmi.fi/wfs';
const STORED_QUERY_OBSERVATION =
  'fmi::observations::weather::multipointcoverage';
const STORED_QUERY_FORECAST =
  'fmi::forecast::hirlam::surface::point::multipointcoverage';

const requestParser = new Metolib.WfsRequestParser();

// TODO: missing feels like and probability of rain
const forecastProperties = [
  'temperature',
  'winddirection',
  'windspeedms',
  'weathersymbol3',
  'precipitationAmount',
] as const;
// TODO: find wanted properties
const observationProperties = ['temperature', 'td', 'ws_10min'] as const;

export type ForecastProperties = typeof forecastProperties;
export type ObservationProperties = typeof observationProperties;

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
  P extends ForecastProperties | ObservationProperties
> = {
  data: {
    [key in P[number]]: {
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

type MetolibResult<P extends ForecastProperties | ObservationProperties> = {
  info: {
    begin: Date;
    end: Date;
  };
  locations: Array<LocationResults<P>>;
  properties: { [key in P[number]]: DataProperty };
};

type MetolibError = {
  errorCode?: number;
  errorText?: string;
};

export type Forecast = {
  time: number;
  values: { [key in ForecastProperties[number]]?: number };
};

export type Observation = {
  time: number;
  values: { [key in ObservationProperties[number]]?: number };
};

export type RemoteData<P extends Forecast | Observation> =
  | {
      status: 'LOADING';
    }
  | {
      status: 'ERROR';
      errors: MetolibError[];
    }
  | {
      status: 'SUCCESS';
      data: { title: string; data: P[] };
    };

export type ForecastFetchParams = {
  site?: string;
  hourInterval?: number;
  latlon?: string;
};

function aggregateLocationResults<
  P extends ForecastProperties | ObservationProperties
>(data: Array<LocationResults<P>>) {
  // Aggregate data into time-values pairs
  if (data.length) {
    const props = data[0].data;
    const times = Object.keys(props)
      .reduce((list: number[], k) => {
        const vals = props[k as P[number]].timeValuePairs;
        vals.forEach(v => {
          if (!list.includes(v.time)) {
            list.push(v.time);
          }
        });
        return list;
      }, [])
      .sort();
    const results = times.map(t => {
      const values = mapValues(props, p => {
        const found = p.timeValuePairs.find(v => v.time === t);
        return found ? found.value : undefined;
      });
      return {
        time: t,
        values,
      };
    });
    const title = data[0].info.name || '';
    return { data: results, title };
  }
  return { data: [], title: '' };
}

export const getForecastData = (
  params: ForecastFetchParams,
  onSuccess: (result: { data: Forecast[]; title: string }) => void,
  onError: (errors: MetolibError[]) => void,
) => {
  const timestep = (params.hourInterval || 3) * 60 * 60 * 1000;
  const now = new Date();
  // Next full hour
  const begin = new Date(now.setHours(now.getHours() + 1, 0, 0, 0));
  const end = new Date(begin.getTime() + timestep * 5);
  requestParser.getData({
    url: API_URL,
    storedQueryId: STORED_QUERY_FORECAST,
    requestParameter: forecastProperties,
    begin,
    end,
    timestep,
    latlon: params.latlon,
    sites: params.latlon ? undefined : params.site || 'Helsinki', // would also accept string[]
    callback: (
      data: MetolibResult<ForecastProperties>,
      errors: MetolibError[],
    ) => {
      if (errors.length) {
        onError(errors);
      } else {
        const results = aggregateLocationResults(data.locations);
        onSuccess(results);
      }
    },
  });
};

export const getObservationData = (
  site: string,
  onSuccess: (result: { data: Observation[]; title: string }) => void,
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
      data: MetolibResult<ObservationProperties>,
      errors: MetolibError[],
    ) => {
      if (errors.length) {
        onError(errors);
      } else {
        const results = aggregateLocationResults(data.locations);
        onSuccess(results);
      }
    },
  });
};
