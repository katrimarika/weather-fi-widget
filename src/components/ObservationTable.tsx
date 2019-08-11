/** @jsx jsx */
import { jsx } from '@emotion/core';
import { ObservationRow } from 'components/ObservationRow';
import { FC } from 'react';
import { Observation } from 'utils/fetcher';

export const ObservationTable: FC<{
  values: Observation['values'];
  lang: 'fi' | 'en';
}> = ({ values, lang }) => (
  <div>
    <ObservationRow property="t2m" value={values.t2m} lang={lang} />
    <ObservationRow property="td" value={values.td} lang={lang} />
    <ObservationRow property="ws_10min" value={values.ws_10min} lang={lang} />
    <ObservationRow property="wg_10min" value={values.wg_10min} lang={lang} />
    <ObservationRow property="rh" value={values.rh} lang={lang} />
    <ObservationRow property="p_sea" value={values.p_sea} lang={lang} />
    <ObservationRow property="n_man" value={values.n_man} lang={lang} />
    <ObservationRow property="vis" value={values.vis} lang={lang} />
    <ObservationRow property="snow_aws" value={values.snow_aws} lang={lang} />
    <ObservationRow property="ri_10min" value={values.ri_10min} lang={lang} />
  </div>
);
