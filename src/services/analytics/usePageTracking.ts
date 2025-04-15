import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useDebouncedCallback } from '../../hooks/useDebouncedCallback';
import { msValues } from '../../utils/dateUtil';
import { useAnalytics } from './useAnalytics';

export const usePageTracking = () => {
  const location = useLocation();
  const { track } = useAnalytics();
  const [clickCount, setClickCount] = useState(0);
  const [mouseMoveCount, setMouseMoveCount] = useState(0);

  // Refs to store the latest state values
  const clickCountRef = useRef(clickCount);
  const mouseMoveCountRef = useRef(mouseMoveCount);

  // Update refs whenever state changes
  useEffect(() => {
    clickCountRef.current = clickCount;
    mouseMoveCountRef.current = mouseMoveCount;
  }, [clickCount, mouseMoveCount]);

  const handleClick = useDebouncedCallback(() => {
    setClickCount((prev) => prev + 1);
  }, 100);

  const handleMouseMove = useDebouncedCallback(() => {
    setMouseMoveCount((prev) => prev + 1);
  }, 100);

  useEffect(() => {
    window.addEventListener('click', handleClick);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleClick, handleMouseMove]);

  useEffect(() => {
    const startTime = Date.now();

    return () => {
      const endTime = Date.now();
      const timeSpent = endTime - startTime;
      const timeSpentThresholdMs = 1 * msValues.second;

      if (timeSpent < timeSpentThresholdMs) {
        setClickCount(0);
        setMouseMoveCount(0);
        return;
      }

      track('page_interaction', {
        page: location.pathname,
        time_spent_ms: timeSpent,
        clicks: clickCountRef.current,
        mouse_moves: mouseMoveCountRef.current,
      });

      setClickCount(0);
      setMouseMoveCount(0);
    };
  }, [location, track]);
};
