/// <reference types="vite/client" />

/**
 * Vite types every `import.meta.env` key as `any`. Declaring the ones this app
 * reads keeps `BACKEND_DOMAIN` a `string` instead of laundering an `any`
 * through the whole api layer.
 */
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
