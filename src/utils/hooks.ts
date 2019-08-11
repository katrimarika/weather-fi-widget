import { useEffect, useRef, useState } from 'react';
import {
  Forecast,
  ForecastFetchParams,
  getForecastData,
  getObservationData,
  Observation,
  ObservationFetchParams,
  RemoteData,
} from 'utils/fetcher';

export const useForecastData = (params: ForecastFetchParams) => {
  const [forecastData, setForecastData] = useState<RemoteData<Forecast>>({
    status: 'LOADING',
  });
  const initialMount = useRef(true);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      getForecastData(
        params,
        data => {
          setForecastData({ status: 'SUCCESS', data });
        },
        errors => {
          setForecastData({ status: 'ERROR', errors });
        },
      );
    }
  }, [params, initialMount]);

  return forecastData;
};

export const useObservationData = (params: ObservationFetchParams) => {
  const [observationData, setObservationData] = useState<
    RemoteData<Observation>
  >({
    status: 'LOADING',
  });
  const initialMount = useRef(true);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      getObservationData(
        params,
        data => {
          setObservationData({ status: 'SUCCESS', data });
        },
        errors => {
          setObservationData({ status: 'ERROR', errors });
        },
      );
    }
  }, [params, initialMount]);

  return observationData;
};
