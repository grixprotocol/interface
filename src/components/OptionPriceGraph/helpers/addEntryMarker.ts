import { ISeriesApi, SeriesMarkerPosition, SeriesMarkerShape, UTCTimestamp } from 'lightweight-charts';

export const addEntryMarker = (series: ISeriesApi<'Line'>, entryTime: UTCTimestamp, price: number, title: string = 'Entry') => {
  series.createPriceLine({
    price,
    color: '#FFD700',
    lineWidth: 2,
    lineStyle: 2,
    axisLabelVisible: true,
    title,
  });

  series.setMarkers([
    {
      time: entryTime,
      position: 'inBar' as SeriesMarkerPosition,
      color: '#FFD700',
      shape: 'circle' as SeriesMarkerShape,
      text: title,
    },
  ]);
};
