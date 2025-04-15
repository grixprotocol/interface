import { RefObject, useCallback, useRef } from 'react';

import { PickerData, PickerItemRef } from '../types';
import { setScrollAnimation } from './useHandleKeyboard';

export const useScrollAnimation = (root: RefObject<HTMLUListElement>, refs: PickerItemRef) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onScroll = useCallback(
    (data: PickerData[], itemID: string, hasAnimation?: boolean) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      const firstID = data[0].value;
      const basicElm = refs[firstID].current;
      const currentElm = refs[itemID || firstID].current;
      const _root = root.current;
      if (_root && basicElm && currentElm) {
        timer.current = setTimeout(
          () => {
            const basicOffsetTop = basicElm.offsetTop;
            const targetOffsetTop = currentElm.offsetTop - basicOffsetTop;
            const animation = setScrollAnimation(_root, _root.scrollTop, targetOffsetTop - _root.scrollTop);
            requestAnimationFrame(animation);
          },
          hasAnimation ? 300 : 0
        );
      }
    },
    [refs, root]
  );

  return onScroll;
};
