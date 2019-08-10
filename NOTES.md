# Notes

Notes on the data and requests.

## Parameters

### Forecast

Possible forecast parameter values, Metolib uses in lowercase

- GeopHeight
- Temperature
- Pressure
- Humidity
- WindDirection
- WindSpeedMS
- WindUMS
- WindVMS
- MaximumWind
- WindGust
- DewPoint
- TotalCloudCover
- WeatherSymbol3
- LowCloudCover
- MediumCloudCover
- HighCloudCover
- Precipitation1h
- PrecipitationAmount
- RadiationGlobalAccumulation
- RadiationLWAccumulation
- RadiationNetSurfaceLWAccumulation
- RadiationNetSurfaceSWAccumulation
- RadiationDiffuseAccumulation
- LandSeaMask

Explanations e.g. `Temperature`: [http://opendata.fmi.fi/meta?observableProperty=forecast&param=Temperature&language=eng](http://opendata.fmi.fi/meta?observableProperty=forecast&param=Temperature&language=eng)

From e.g. [http://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::forecast::hirlam::surface::point::multipointcoverage&place=helsinki&](http://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::forecast::hirlam::surface::point::multipointcoverage&place=helsinki&)

### Observation

- t2m
- ws_10min
- wg_10min
- wd_10min
- rh
- td
- r_1h
- ri_10min
- snow_aws
- p_sea
- vis
- n_man
- wawa

Explanations e.g. `t2m`: [http://opendata.fmi.fi/meta?observableProperty=observation&param=t2m&language=eng](http://opendata.fmi.fi/meta?observableProperty=observation&param=t2m&language=eng)

From e.g. [http://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::observations::weather::multipointcoverage&place=helsinki](http://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::observations::weather::multipointcoverage&place=helsinki)

## Weather symbols

Finnish explanations of the values of `weathersymbol3`.

1 selkeää
2 puolipilvistä
21 heikkoja sadekuuroja
22 sadekuuroja
23 voimakkaita sadekuuroja
3 pilvistä
31 heikkoa vesisadetta
32 vesisadetta
33 voimakasta vesisadetta
41 heikkoja lumikuuroja
42 lumikuuroja
43 voimakkaita lumikuuroja
51 heikkoa lumisadetta
52 lumisadetta
53 voimakasta lumisadetta
61 ukkoskuuroja
62 voimakkaita ukkoskuuroja
63 ukkosta
64 voimakasta ukkosta
71 heikkoja räntäkuuroja
72 räntäkuuroja
73 voimakkaita räntäkuuroja
81 heikkoa räntäsadetta
82 räntäsadetta
83 voimakasta räntäsadetta
91 utua
92 sumua

From: [https://ilmatieteenlaitos.fi/latauspalvelun-pikaohje](https://ilmatieteenlaitos.fi/latauspalvelun-pikaohje)

Different than the symbols FMI uses in their current website and app.

These could be combined with

- cloudiness info to form different cloudiness combinations of the various rains
- sunrise/sunset info (retrieved from somewhere else) to use different symbols for day and night
