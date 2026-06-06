export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  
  const { name } = req.query;
  if (!name) return res.status(400).json({ img: null });

  try {
    const r = await fetch(
      `https://api.fragella.com/api/v1/fragrances?search=${encodeURIComponent(name)}&limit=1`,
      { 
        headers: { 
          "x-api-key": "48c5739363787ee44e2fede1f7ed4b7394f2f84d2aaed7aa1eec0619f7a8b6b7",
          "User-Agent": "parfum-asistani.vercel.app"
        } 
      }
    );
    const data = await r.json();
    const item = data?.[0];
    const img = item?.["Image URL Transparent"] || item?.["Image URL"] || null;
    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
    res.status(200).json({ img });
  } catch(e) {
    res.status(200).json({ img: null });
  }
}
