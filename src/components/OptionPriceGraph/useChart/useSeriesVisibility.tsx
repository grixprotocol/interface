import { ISeriesApi } from 'lightweight-charts';
import { useEffect } from 'react';

type UseSeriesVisibilityProps = {
  seriesRef: React.MutableRefObject<Record<string, ISeriesApi<'Line'>>>;
  visibleSeries: string[];
};

export const useSeriesVisibility = ({ seriesRef, visibleSeries }: UseSeriesVisibilityProps) => {
  useEffect(() => {
    Object.entries(seriesRef.current).forEach(([name, series]) => {
      series.applyOptions({ visible: visibleSeries.includes(name) });
    });
  }, [visibleSeries, seriesRef]);
};
