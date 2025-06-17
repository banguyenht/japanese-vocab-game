const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

export async function fetchImage(keyword) {env
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keyword)}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.results && data.results.length > 0) {
    return data.results[0].urls.small;
  } else {
    return "";
  }
}
