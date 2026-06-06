export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { name } = req.query;
  if (!name) return res.status(400).json({ img: null, error: "name required" });

  try {
    const r = await fetch(
      `https://api.fragella.com/api/v1/fragrances?search=${encodeURIComponent(name)}&limit=1`,
      { headers: { "x-api-key": "48c5739363787ee44e2fede1f7ed4b7394f2f84d2aaed7aa1eec0619f7a8b6b7" } }
    );
    const text = await r.text();
    let data;
    try { data = JSON.parse(text); } catch(e) { data = null; }
    
    // Log raw response for debugging
    const item = Array.isArray(data) ? data[0] : null;
    const img = item?.["Image URL Transparent"] || item?.["Image URL"] || null;
    res.setHeader("Cache-Control", "s-maxage=86400");
    res.status(200).json({ img, debug: text.slice(0, 200) });
  } catch(e) {
    res.status(200).json({ img: null, error: e.message });
  }
}
