// api/jisho.js
export default async function handler(req, res) {
  const { vocab } = req.query;

  if (!vocab) {
    return res.status(400).json({ error: "Thiếu từ vựng" });
  }

  try {
    const response = await fetch(`https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(vocab)}`);
    const data = await response.json();
    const reading = data?.data?.[0]?.japanese?.[0]?.reading || "-";
    res.status(200).json({ reading });
  } catch (error) {
    res.status(500).json({ error: "Lỗi gọi Jisho" });
  }
}
