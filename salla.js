module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const token = req.headers.authorization?.replace('Bearer ', '');
  const { type, page = '1', per_page = '20' } = req.query;

  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    let url = '';
    if (type === 'products') url = `https://api.salla.dev/admin/v2/products?page=${page}&per_page=${per_page}&status=sale`;
    if (type === 'categories') url = `https://api.salla.dev/admin/v2/categories?page=${page}&per_page=50`;
    if (type === 'orders') url = `https://api.salla.dev/admin/v2/orders?page=${page}&per_page=${per_page}`;
    if (type === 'profile') url = `https://api.salla.dev/admin/v2/store/info`;

    const r = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
    });
    const data = await r.json();
    return res.status(200).json(data);
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
};
