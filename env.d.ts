/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly accountId: string;
  readonly namespaceId: string;
  readonly apiToken: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
