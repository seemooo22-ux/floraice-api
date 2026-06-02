const TOKEN = '6kPyYpYrKGVBrctBRWvZYwAkpxxf7DClQOf95yV8FHvduJnEU1sQ3';
const SALLA_API = 'https://api.salla.dev/admin/v2';
const headers = { 'Authorization': ⁠ Bearer ${TOKEN} ⁠, 'Accept': 'application/json' };

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { type, page = '1', id } = req.query;

  try {
    if (type === 'categories') {
      const r = await fetch(⁠ ${SALLA_API}/categories?per_page=50 ⁠, { headers });
      const d = await r.json();
      const cats = (d.data || []).map(c => ({ id: c.id, name: c.name }));
      return res.status(200).json({ success: true, data: cats });
    }

    if (type === 'product' && id) {
      const r = await fetch(⁠ ${SALLA_API}/products/${id} ⁠, { headers });
      const d = await r.json();
      const p = d.data;
      return res.status(200).json({ success: true, data: {
        id: p.id, name: p.name,
        description: p.description?.replace(/<[^>]+>/g, '').trim() || '',
        price: p.prices?.price,
        sale_price: p.prices?.sale_price,
        thumbnail: p.urls?.thumbnail,
        status: p.status,
      }});
    }

    if (type === 'products') {
      const r = await fetch(⁠ ${SALLA_API}/products?status=sale&per_page=20&page=${page}&format=light ⁠, { headers });
      const d = await r.json();
      const products = (d.data || []).map(p => ({
        id: p.id, name: p.name,
        price: p.prices?.price,
        sale_price: p.prices?.sale_price,
        thumbnail: p.urls?.thumbnail,
        status: p.status,
      }));
      const hasMore = !!d.cursor?.next;
      return res.status(200).json({ success: true, data: products, page: parseInt(page), hasMore });
    }

    res.status(400).json({ success: false, error: 'Invalid type' });
  } catch(e) {
    res.status(500).json({ success: false, error: e.message });
  }
};
