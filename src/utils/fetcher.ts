import Metolib from '@fmidev/metolib';
import mapValues from 'lodash.mapvalues';

const API_URL = '//opendata.fmi.fi/wfs';
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
  'precipitation1h',
] as const;
// TODO: find wanted properties
const observationProperties = [
  't2m', // temperature (degC)
  'ws_10min', // wind speed (m/s)
  'wg_10min', // wind gust speed (m/s)
  'wd_10min', // wind direction (deg)
  'rh', // relative humidity (%)
  'td', // dew-point temperature (degC)
  'r_1h', // rain amount in 1 hour (mm)
  'ri_10min', // rain intensity (mm/h)
  'snow_aws', // snow depth (cm)
  'p_sea', // air pressure (hPa)
  'vis', // visibility (m)
  'n_man', // cloud amount int 0-9/8
  'wawa', // weather symbol 3?
] as const;

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
  numResults?: number;
};

export type ObservationFetchParams = {
  site?: string;
  latlon?: string;
};

function aggregateLocationResults<
  P extends ForecastProperties | ObservationProperties
>(data: Array<LocationResults<P>>, maxCount: number) {
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
    return { data: results.slice(0, maxCount), title };
  }
  return { data: [], title: '' };
}

export const getForecastData = (
  params: ForecastFetchParams,
  onSuccess: (result: { data: Forecast[]; title: string }) => void,
  onError: (errors: MetolibError[]) => void,
) => {
  const { hourInterval, numResults, latlon, site } = params;
  const timestep = (hourInterval || 3) * 60 * 60 * 1000;
  const maxCount = numResults || 5;
  const now = new Date();
  // Next full hour
  const begin = new Date(now.setHours(now.getHours() + 1, 0, 0, 0));
  const end = new Date(begin.getTime() + timestep * maxCount);
  requestParser.getData({
    url: API_URL,
    storedQueryId: STORED_QUERY_FORECAST,
    requestParameter: forecastProperties,
    begin,
    end,
    timestep,
    latlon,
    sites: latlon ? undefined : site || 'Helsinki', // would also accept string[]
    callback: (
      data: MetolibResult<ForecastProperties>,
      errors: MetolibError[],
    ) => {
      if (errors.length) {
        onError(errors);
      } else {
        const results = aggregateLocationResults(data.locations, maxCount);
        onSuccess(results);
      }
    },
  });
};

export const getObservationData = (
  params: ObservationFetchParams,
  onSuccess: (result: { data: Observation[]; title: string }) => void,
  onError: (errors: MetolibError[]) => void,
) => {
  const { latlon, site } = params;
  const now = new Date();
  requestParser.getData({
    url: API_URL,
    storedQueryId: STORED_QUERY_OBSERVATION,
    requestParameter: observationProperties,
    begin: now,
    end: now,
    timestep: 60 * 60 * 1000,
    latlon,
    sites: latlon ? undefined : site || 'Helsinki', // would also accept string[]
    callback: (
      data: MetolibResult<ObservationProperties>,
      errors: MetolibError[],
    ) => {
      if (errors.length) {
        onError(errors);
      } else {
        const results = aggregateLocationResults(data.locations, 1);
        onSuccess(results);
      }
    },
  });
};
