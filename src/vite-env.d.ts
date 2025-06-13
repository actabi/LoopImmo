/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LAUNCH_MODE: string
  readonly DATABASE_URL: string
  // Ajouter d'autres variables d'environnement ici si nécessaire
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
