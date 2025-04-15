import { ChartOptions, ColorType, DeepPartial, LineSeriesPartialOptions, LineStyle } from 'lightweight-charts';

import { SeriesConfig } from './types';

export const defaultSeriesConfigs: SeriesConfig[] = [
  {
    name: 'Highest Ask',
    color: '#FF4842',
    lineStyle: 2,
    defaultVisible: false,
    visible: true,
  },
  {
    name: 'Best Ask',
    color: '#FF4842',
    lineStyle: 0,
    defaultVisible: true,
    visible: true,
  },
  {
    name: 'Best Bid',
    color: '#54D62C',
    lineStyle: 0,
    defaultVisible: true,
    visible: true,
  },
  {
    name: 'Lowest Bid',
    color: '#54D62C',
    lineStyle: 2,
    defaultVisible: false,
    visible: true,
  },
  {
    name: 'Underlying',
    color: '#FFB74D',
    lineStyle: 0,
    defaultVisible: true,
    visible: true,
  },
  {
    name: 'Entry Point',
    color: '#FFD700',
    lineStyle: LineStyle.Solid,
    visible: true,
    defaultVisible: true,
    isEntryPoint: true,
  },
];

export const chartOptions: DeepPartial<ChartOptions> = {
  layout: {
    background: { type: ColorType.Solid, color: 'rgba(0, 0, 0, 0.5)' },
    textColor: 'rgba(255, 255, 255, 0.9)',
  },
  grid: {
    vertLines: { color: 'rgba(255, 255, 255, 0.1)' },
    horzLines: { color: 'rgba(255, 255, 255, 0.1)' },
  },
  watermark: {
    visible: false,
  },
  crosshair: {
    mode: 1,
    vertLine: {
      width: 1,
      color: 'rgba(255, 255, 255, 0.3)',
      style: 2,
      visible: true,
      labelVisible: true,
    },
    horzLine: {
      width: 1,
      color: 'rgba(255, 255, 255, 0.3)',
      style: 2,
      visible: true,
      labelVisible: true,
    },
  },
  handleScroll: {
    mouseWheel: true,
    pressedMouseMove: true,
    horzTouchDrag: true,
    vertTouchDrag: true,
  },
  handleScale: {
    mouseWheel: true,
    pinch: true,
    axisPressedMouseMove: {
      time: true,
      price: true,
    },
  },
  leftPriceScale: {
    visible: false,
  },
  rightPriceScale: {
    visible: true,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignLabels: true,
    scaleMargins: {
      top: 0.1,
      bottom: 0.1,
    },
    entireTextOnly: true,
  },
  timeScale: {
    visible: true,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    timeVisible: true,
    secondsVisible: false,
    tickMarkFormatter: (time: number) => {
      const date = new Date(time * 1000);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${month}/${day} ${hours}:${minutes}`;
    },
  },
  localization: {
    timeFormatter: (time: number) => {
      const date = new Date(time * 1000);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${month}/${day} ${hours}:${minutes}`;
    },
  },
};

export const defaultSeriesOptions: LineSeriesPartialOptions = {
  lineWidth: 2,
  priceFormat: {
    type: 'custom',
    formatter: (price: number) => `$${price.toFixed(1)}`,
    minMove: 0.1,
  },
  lastValueVisible: false,
  priceLineVisible: false,
  title: '',
  lineType: 0,
};
