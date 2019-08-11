/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Centered } from 'components/Centered';
import { Copyright } from 'components/Copyright';
import { ObservationTable } from 'components/ObservationTable';
import { TitleWithTime } from 'components/TitleWithTime';
import { FC } from 'react';
import { ObservationFetchParams } from 'utils/fetcher';
import { useObservationData } from 'utils/hooks';

export const ObservationDisplay: FC<{
  params: ObservationFetchParams;
  showTitle?: boolean;
  lang: 'fi' | 'en';
}> = ({ params, showTitle, lang }) => {
  const observationData = useObservationData(params);

  switch (observationData.status) {
    case 'LOADING':
      return <Centered>...</Centered>;
    case 'SUCCESS':
      const { data: observations, title } = observationData.data;
      if (!observations.length) {
        return (
          <div>
            {showTitle && title && <TitleWithTime title={title} />}
            <div className="f6">
              {params.latlon ? params.latlon : params.site}?
            </div>
          </div>
        );
      }
      const { time, values } = observations[0];
      return (
        <div className="vh-100 flex flex-column">
          {showTitle && <TitleWithTime title={title} time={time} />}
          <ObservationTable values={values} lang={lang} />
          <Copyright />
        </div>
      );
    case 'ERROR':
      return <Centered>X</Centered>;
    default:
      return null;
  }
};
