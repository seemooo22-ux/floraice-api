const fetch = require('node-fetch');
const TOKEN = '6kPyYpYrKGVBrctBRWvZYwAkpxxf7DClQOf95yV8FHvduJnEU1sQ3';
const SALLA_API = 'https://api.salla.dev/admin/v2';
const headers = { 'Authorization': 'Bearer ' + TOKEN, 'Accept': 'application/json' };

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { type, page = '1', id, cursor } = req.query;

  try {
    if (type === 'debug') {
      const r = await fetch(SALLA_API + '/products?per_page=3&format=light', { headers });
      const text = await r.text();
      return res.status(200).send(text);
    }

    if (type === 'categories') {
      const r = await fetch(SALLA_API + '/categories?per_page=50', { headers });
      const d = await r.json();
      const cats = (d.data || []).map(c => ({ id: c.id, name: c.name }));
      return res.status(200).json({ success: true, data: cats });
    }

    if (type === 'product' && id) {
      const r = await fetch(SALLA_API + '/products/' + id, { headers });
      const d = await r.json();
      const p = d.data;
      return res.status(200).json({ success: true, data: {
        id: p.id, name: p.name,
        description: p.description ? p.description.replace(/<[^>]+>/g, '').trim() : '',
        price: p.prices && p.prices.price,
        sale_price: p.prices && p.prices.sale_price,
        thumbnail: p.urls && p.urls.thumbnail,
        status: p.status,
      }});
    }

    if (type === 'products') {
      let url = SALLA_API + '/products?status=sale&per_page=20&format=light';
      if (cursor) url += '&cursor=' + encodeURIComponent(cursor);
      else url += '&page=' + page;
      const r = await fetch(url, { headers });
      const d = await r.json();
      const products = (d.data || []).map(p => ({
        id: p.id, name: p.name,
        price: p.prices && p.prices.price,
        sale_price: p.prices && p.prices.sale_price,
        thumbnail: p.urls && p.urls.thumbnail,
        status: p.status,
      }));
      const nextCursor = d.cursor && d.cursor.next ? d.cursor.next : null;
      const hasMore = !!nextCursor;
      return res.status(200).json({ success: true, data: products, page: parseInt(page), hasMore, nextCursor });
    }

    res.status(400).json({ success: false, error: 'Invalid type' });
  } catch(e) {
    res.status(500).json({ success: false, error: e.message });
  }
};