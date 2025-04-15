import { useCallback, useState } from 'react';

export const useHandleKeyboard = (itemHeight: number) => {
  const [pressedKeys, setPressedKeys] = useState<{ [key: number]: boolean }>({});

  const onKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLUListElement>) => {
      const code = e.keyCode;
      if (pressedKeys[code]) {
        e.persist();
        setPressedKeys((prev) => ({
          ...prev,
          [code]: false,
        }));
      }
    },
    [pressedKeys]
  );

  const onKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLUListElement>) => {
      const target = e.currentTarget;
      const code = e.keyCode;

      if (!pressedKeys[code] && code === 16) {
        e.persist();
        setPressedKeys((prev) => ({
          ...prev,
          [e.keyCode]: true,
        }));
      }

      if ((!pressedKeys[16] && code === 9) || code === 40) {
        e.preventDefault();
        const animate = setScrollAnimation(target, target.scrollTop, itemHeight);
        requestAnimationFrame(animate);
      }

      if ((pressedKeys[16] && code === 9) || code === 38) {
        e.preventDefault();
        const animate = setScrollAnimation(target, target.scrollTop, itemHeight * -1);
        requestAnimationFrame(animate);
      }

      if (code === 32 || code === 27) {
        e.preventDefault();
        target.blur();
      }
    },
    [itemHeight, pressedKeys]
  );

  return {
    onKeyUp,
    onKeyPress,
  };
};

const easeOutCubic = (t: number, b: number, c: number, d: number) => {
  t /= d;
  t--;
  return c * (t * t * t + 1) + b;
};

export const setScrollAnimation = (root: HTMLUListElement, currentPosition: number, changingValue: number) => {
  let start = 1;
  let isStop = false;
  const animation = () => {
    if (isStop) return;
    const offset = easeOutCubic(start / 100, currentPosition, changingValue, 0.1);
    requestAnimationFrame(animation);
    root.scrollTo(0, offset);
    const target = currentPosition + changingValue;
    start += 1;
    isStop = offset === target;
  };

  return animation;
};
