const Anthropic = require('@anthropic-ai/sdk');
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_KEY });

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { type } = req.query;
  try {
    let prompt = '';
    if (type === 'products') {
      prompt = 'Return a JSON array of 20 luxury perfume products for Floraice Boutique store (flr.sa). Brands: Creed, Amouage, Louis Vuitton, Maison Crivelli, Clive Christian, Sospiro, Ramon Bejar. Each product: {"id":number,"name":"Arabic name","price":{"amount":number,"currency":"SAR"},"status":"sale","description":"short Arabic description","emoji":"perfume emoji"}. Return ONLY the JSON array, no extra text.';
    } else if (type === 'categories') {
      prompt = 'Return ONLY this JSON array for Floraice Boutique perfume store categories: [{"id":1,"name":"الكل"},{"id":2,"name":"عينات"},{"id":3,"name":"عطور كاملة"},{"id":4,"name":"نيش"},{"id":5,"name":"كريد"},{"id":6,"name":"أمواج"}]';
    }
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    });
    const text = message.content[0].text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const data = JSON.parse(text);
    res.status(200).json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
};
