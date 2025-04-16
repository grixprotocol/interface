import { createRef, FocusEvent, useCallback, useEffect, useMemo, useRef } from 'react';

import { PickerData, PickerItemRef } from '../types';
import { useScrollAnimation } from './useScrollAnimation';

const calculatePercentageOfRootWithoutItem = (rootHeight: number, itemHeight: number) => 100 - (itemHeight / rootHeight) * 100;

const calculateMarginVertical = (rootHeight: number, itemHeight: number) =>
  calculatePercentageOfRootWithoutItem(rootHeight, itemHeight) / 2;

const calculateRootMargin = (rootHeight: number, itemHeight: number) => `-${calculateMarginVertical(rootHeight, itemHeight)}% 0px`;

export const useObserver = (data: PickerData[], selectedID: string, itemHeight: number, onChange: (value: string) => void) => {
  const root = useRef<HTMLUListElement | null>(null);
  const refs = useMemo(
    () =>
      data.reduce((result, value) => {
        result[value.value] = createRef<HTMLLIElement>();
        return result;
      }, {} as PickerItemRef),
    [data]
  );
  const observer = useRef<IntersectionObserver | null>(null);
  const onScroll = useScrollAnimation(root, refs);

  const handleOnFocus = useCallback(
    (e: FocusEvent<HTMLLIElement>) => {
      const target = e.target;
      const id = target.getAttribute('data-itemid');
      const value = target.getAttribute('data-itemvalue');
      if (!id || !value) {
        throw new Error('Can not found id or value');
      }
      onScroll(data, id);
      onChange(id);
    },
    [data, onChange, onScroll]
  );

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries: IntersectionObserverEntry[]): void => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const itemID = entry.target.getAttribute('data-itemid');
        const itemValue = entry.target.getAttribute('data-itemvalue');
        if (!itemID || !itemValue) {
          throw new Error('Can not found id or value');
        }

        onScroll(data, itemID, true);
        onChange(itemID);
      });
    };

    if (!observer.current && root.current) {
      observer.current = new IntersectionObserver(observerCallback, {
        root: root.current,
        rootMargin: calculateRootMargin(root.current.clientHeight, itemHeight),
        threshold: [0.3, 0.79],
      });
      data.map((item) => {
        const elm = refs[item.value].current;
        if (elm && observer.current) {
          observer.current.observe(elm);
        }
      });

      const firstItem = refs[data[0]?.value]?.current;
      const item = refs[selectedID]?.current;
      if (firstItem && item) {
        root.current.scrollTo(0, item.offsetTop - firstItem.offsetTop);
      }
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
        observer.current = null;
      }
    };
  }, [data, refs, root, itemHeight]); // eslint-disable-line

  return {
    root,
    refs,
    onFocus: handleOnFocus,
  };
};
