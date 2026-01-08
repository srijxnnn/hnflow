export const getDisplayUrl = (url: string) => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};
