export const getBaseApiUrl = (): string => {
  const envUrl = (window as any)?.['env']?.['apiBaseUrl'];
  return envUrl || 'http://localhost:5151/api'; // <- absolutny URL
};