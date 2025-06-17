// utils/jishoApi.js
const JISHO_API = "https://jisho.org/api/v1/search/words";

export const fetchJishoSuggestions = async (keyword) => {
  try {
    const res = await fetch(`${JISHO_API}?keyword=${encodeURIComponent(keyword)}`);
    const data = await res.json();
    return data.data
      .slice(0, 5)
      .map((entry) => entry.japanese[0].word || entry.japanese[0].reading);
  } catch (error) {
    console.error("Error fetching Jisho suggestions:", error);
    return [];
  }
};
