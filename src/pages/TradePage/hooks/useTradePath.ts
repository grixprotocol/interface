import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useTradePath = () => {
  const location = useLocation();
  const [isTradePage, setIsTradePage] = useState(location.pathname === '/trade');

  useEffect(() => {
    setIsTradePage(location.pathname === '/trade');
  }, [location.pathname]);

  return { isTradePage };
};
