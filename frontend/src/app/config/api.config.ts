export const getBaseApiUrl = (): string => {
  const envUrl = (window as any)?.env?.API_BASE_URL;
  return envUrl || 'http://localhost:5151/api';
};