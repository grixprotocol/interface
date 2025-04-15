import { FaDiscord, FaTelegram } from 'react-icons/fa';

import { Platform } from '../../types/configuration';

export const getPlatformIcon = (platform: Platform) => {
  switch (platform) {
    case 'discord':
      return <FaDiscord color="#5865F2" />;
    case 'telegram':
      return <FaTelegram color="#0088cc" />;
    default:
      return null;
  }
};
