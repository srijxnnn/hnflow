export const API_BASE_URL = "http://hn.algolia.com/api/v1/";

export const getSearchResults = async (
  f: SearchFilters
): Promise<HNSearchResponse> => {
  const res = await fetch(
    `${API_BASE_URL}/${f.sort === "popularity" ? "search" : "search_by_date"}?query=${f.query}&tags=${f.tag}&page=${f.page}`
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
