const UNSPLASH_ACCESS_KEY = "wNUfExecDVj0WPMiUouZ5esV7JRAY-e3Jj7wq_GkNiU";

/**
 * Gọi Unsplash API để lấy danh sách hình ảnh theo từ khoá
 * @param {string} keyword - Từ khóa tìm kiếm hình ảnh
 * @returns {Promise<string[]>} - Danh sách URL ảnh nhỏ (small)
 */
export const fetchUnsplashImages = async (keyword) => {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keyword)}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=5`
    );
    const data = await res.json();
    return data.results.map((img) => img.urls.small);
  } catch (error) {
    console.error("Error fetching Unsplash images:", error);
    return [];
  }
};
