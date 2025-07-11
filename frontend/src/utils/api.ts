export function apiUrl(path: string): string {
  const base = import.meta.env.VITE_API_URL;
  return base ? `${base}${path}` : path;
}

