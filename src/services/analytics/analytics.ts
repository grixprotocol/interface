import Mixpanel from 'mixpanel-browser';

import { config, env } from '../../config';

Mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN, {
  track_pageview: true,
  persistence: 'localStorage',
  ignore_dnt: true,
  batch_requests: false,
  api_transport: 'XHR',
  api_method: 'POST',
  api_payload_format: 'json',
  api_host: config[env].backendUrl,
  api_routes: {
    track: 'data/activity',
    engage: 'data/account',
  },
  xhr_headers: {
    'x-api-key': import.meta.env.VITE_GRIX_API_KEY,
  },
});

export const analytics = {
  identify: (identifier: string) => {
    Mixpanel.identify(identifier);
  },
  track: (eventName: string, props: Record<string, unknown>) => {
    Mixpanel.track(eventName, props);
  },
};
