export const buildApiUrl = (baseUrl: string, path: string): string =>
  `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
