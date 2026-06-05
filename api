export default async function handler(req, res) {
  const { name } = req.query;
  if (!name) return res.status(400).json({ error: "name required" });

  try {
    const response = await fetch(
      `https://api.fragella.com/api/v1/fragrances?search=${encodeURIComponent(name)}&limit=1`,
      { headers: { "x-api-key": "48c5739363787ee44e2fede1f7ed4b7394f2f84d2aaed7aa1eec0619f7a8b6b7" } }
    );
    const data = await response.json();
    const item = data?.[0];
    const img = item?.["Image URL Transparent"] || item?.["Image URL"] || null;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "s-maxage=86400");
    res.status(200).json({ img });
  } catch (e) {
    res.status(500).json({ img: null });
  }
}
