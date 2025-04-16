/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV: 'debug' | 'dev' | 'staging' | 'main';
  readonly VITE_WHITELIST_MODE: string;
  readonly VITE_GRIX_API_KEY: string;
  readonly VITE_PREMIA_KEY: string;

  // Add other env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
