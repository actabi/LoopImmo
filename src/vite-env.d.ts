/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LAUNCH_MODE: string
  readonly DATABASE_URL: string
  readonly SMTP_HOST: string
  readonly SMTP_PORT: string
  readonly SMTP_USER: string
  readonly SMTP_PASS: string
  readonly EMAIL_FROM: string
  readonly EMAIL_TO: string
  // Ajouter d'autres variables d'environnement ici si nécessaire
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
