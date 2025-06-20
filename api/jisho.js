export default async function handler(req, res) {
  const { vocab } = req.query;

  if (!vocab) {
    return res.status(400).json({ error: "Thiếu từ cần tra" });
  }

  try {
    const apiUrl = `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(vocab)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    const reading =
      data?.data?.[0]?.japanese?.[0]?.reading || "-";

    res.status(200).json({ reading });
  } catch (err) {
    console.error("Lỗi gọi Jisho:", err);
    res.status(500).json({ error: "Lỗi khi gọi Jisho API" });
  }
}
