/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV: 'debug' | 'dev' | 'staging' | 'main';
  readonly VITE_WHITELIST_MODE: string;
  readonly VITE_FUUL_API_KEY: string;
  readonly PROJECTID: string;

  // Add other env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
 