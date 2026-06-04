const fetch = require('node-fetch');
const SUPABASE_URL = 'https://wawfkldwrzpbokyrteii.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const SALLA_TOKEN = process.env.SALLA_TOKEN;

async function syncProducts() {
  const sallaHeaders = { 'Authorization': 'Bearer ' + SALLA_TOKEN, 'Accept': 'application/json' };
  const supaHeaders = {
    'apikey': SUPABASE_KEY,
    'Authorization': 'Bearer ' + SUPABASE_KEY,
    'Content-Type': 'application/json',
    'Prefer': 'resolution=merge-duplicates'
  };
  let page = 1, hasMore = true, all = [];
  while (hasMore && page <= 100) {
    const r = await fetch('https://api.salla.dev/admin/v2/products?status=sale&per_page=20&page=' + page, { headers: sallaHeaders });
    const d = await r.json();
    const products = (d.data || []).map(p => ({
      id: parseInt(p.id),
      name: p.name,
      price: p.prices && p.prices.price ? p.prices.price.amount : 0,
      sale_price: p.prices && p.prices.sale_price ? p.prices.sale_price.amount : 0,
      thumbnail: p.urls && p.urls.thumbnail ? p.urls.thumbnail : null,
      description: p.description ? p.description.replace(/<[^>]+>/g, '').trim() : '',
      status: p.status
    }));
    all = all.concat(products);
    hasMore = !!(d.cursor && d.cursor.next);
    page++;
  }
  if (all.length > 0) {
    await fetch(SUPABASE_URL + '/rest/v1/products', {
      method: 'POST', headers: supaHeaders, body: JSON.stringify(all)
    });
  }
  return all.length;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { type, page = '1' } = req.query;
  const pageNum = parseInt(page);
  const supaHeaders = {
    'apikey': SUPABASE_KEY,
    'Authorization': 'Bearer ' + SUPABASE_KEY,
    'Prefer': 'count=exact'
  };

  try {
    if (type === 'sync') {
      const count = await syncProducts();
      return res.status(200).json({ success: true, synced: count });
    }

    if (type === 'webhook') {
      await syncProducts();
      return res.status(200).json({ success: true });
    }

    if (type === 'categories') {
      const cats = [
        {id:1,name:'الكل'},{id:2,name:'عينات'},{id:3,name:'عطور كاملة'},
        {id:4,name:'نيش'},{id:5,name:'كريد'},{id:6,name:'أمواج'}
      ];
      return res.status(200).json({ success: true, data: cats });
    }

    if (type === 'product' && req.query.id) {
      const r = await fetch(SUPABASE_URL + '/rest/v1/products?id=eq.' + req.query.id, { headers: supaHeaders });
      const d = await r.json();
      return res.status(200).json({ success: true, data: d[0] || null });
    }

    if (type === 'products') {
      const limit = 20;
      const offset = (pageNum - 1) * limit;
      const r = await fetch(
        SUPABASE_URL + '/rest/v1/products?status=eq.sale&limit=' + limit + '&offset=' + offset + '&order=id',
        { headers: supaHeaders }
      );
      const d = await r.json();
      const range = r.headers.get('content-range') || '';
      const total = parseInt((range.split('/')[1]) || '0');
      const hasMore = offset + limit < total;
      return res.status(200).json({ success: true, data: d, page: pageNum, hasMore });
    }

    res.status(400).json({ success: false, error: 'Invalid type' });
  } catch(e) {
    res.status(500).json({ success: false, error: e.message });
  }
};
