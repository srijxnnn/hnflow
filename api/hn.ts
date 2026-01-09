export const API_BASE_URL = "https://hn.algolia.com/api/v1/";

export const getSearchResults = async (
  f: SearchFilters
): Promise<HNSearchResponse> => {
  const oldestTimestamp =
    f.timeRange === "1y"
      ? Date.now() / 1000 - 365 * 24 * 3600
      : f.timeRange === "30d"
        ? Date.now() / 1000 - 30 * 24 * 3600
        : f.timeRange === "7d"
          ? Date.now() / 1000 - 7 * 24 * 3600
          : f.timeRange === "24h"
            ? Date.now() / 1000 - 24 * 3600
            : 0;

  const res = await fetch(
    `${API_BASE_URL}/${f.sort === "popularity" ? "search" : "search_by_date"}?query=${f.query}&tags=${f.tag}&page=${f.page}${f.timeRange === "all" ? "" : `&numericFilters=created_at_i>${oldestTimestamp}`}`
  );

  if (!res.ok) {
    throw Error("Failed to fetch HN search results.");
  }

  return res.json();
};

export const getItemById = async (id: string): Promise<HNItem> => {
  const res = await fetch(`${API_BASE_URL}/items/${id}`);

  if (!res.ok) {
    throw Error("Failed to fetch HN item.");
  }

  return res.json();
};
