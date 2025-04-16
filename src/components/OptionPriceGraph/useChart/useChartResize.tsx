import { createChart } from 'lightweight-charts';
import { useEffect } from 'react';

export const useChartResize = (containerRef: React.RefObject<HTMLDivElement>, chart: ReturnType<typeof createChart> | undefined) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !chart) return;

    const handleResize = () => {
      chart.applyOptions({
        width: container.clientWidth,
        height: container.clientHeight,
      });
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [containerRef, chart]);
};
