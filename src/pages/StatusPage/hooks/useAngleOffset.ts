import { useEffect, useState } from 'react';

export const useAngleOffset = () => {
  const [angleOffset, setAngleOffset] = useState(0);

  useEffect(() => {
    let lastTime = Date.now();
    let animationFrameId: number;

    const updateAngle = () => {
      const now = Date.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      setAngleOffset((prev) => (prev + delta * 0.05) % (2 * Math.PI));
      animationFrameId = requestAnimationFrame(updateAngle);
    };

    animationFrameId = requestAnimationFrame(updateAngle);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return angleOffset;
};
