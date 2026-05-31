const ALL_PRODUCTS = [
  {id:2121438595,name:'عينة رامون بيجار لوز انفينيتا',price:{amount:21,currency:'SAR'},status:'sale',thumbnail:'https://cdn.salla.sa/nEVKAy/1bb2eb72-a8ce-4be5-9231-ab248bf38742-500x500-gslRE9C964QqlQR2Nc4IUFPFWseiLLvWdEwMPzoh.png'},
  {id:436046934,name:'عينة كريد وايلد فيتيفر',price:{amount:42,currency:'SAR'},status:'sale',thumbnail:'https://cdn.salla.sa/nEVKAy/79172d67-e3e1-430a-a65c-132a42ea9924-500x500-dXZ7FWa4HckYkMdTlTLGVpro3MjONkUJu8cNmVKJ.png'},
  {id:567115796,name:'عينة ريفلكشن 45 من امواج',price:{amount:27,currency:'SAR'},status:'sale',thumbnail:'https://cdn.salla.sa/nEVKAy/2bcd99cb-2c70-4ac1-8ab8-da2c9af5714f-500x500-4oGMKr2BDc7qdOBXxuZKnlkTxA7OMnI3zhDxAI3k.png'},
  {id:1680387128,name:'عينة ميزون كريفيلي عود ماراكوجا',price:{amount:32,currency:'SAR'},status:'sale',thumbnail:'https://cdn.salla.sa/nEVKAy/31391e50-4bbd-47aa-9976-5ada81340cdc-500x500-zh5Kr6tfYahxKi2vrBcUtQzWjLrxNfPsTecF4v1t.png'},
  {id:1998935396,name:'عينة عطر سوسبيرو فيبراتو',price:{amount:20,currency:'SAR'},status:'sale',thumbnail:'https://cdn.salla.sa/nEVKAy/9d69b73b-c64f-4548-b81d-46b0eb226b8c-500x500-LgwT5G8W49R3UUAfVzoinxqKLpPUdUoeOCtmwPNz.png'},
  {id:1400906076,name:'عينة امواج جايدنس',price:{amount:25,currency:'SAR'},status:'sale',thumbnail:'https://cdn.salla.sa/nEVKAy/0e37a522-25b0-4f59-8317-958dbd23e492-500x500-FzpRzMYsYR5sCBo0AgUlcQiqjJbPwlwEZh79es22.png'},
  {id:1842738623,name:'عينة كلايف كريستيان ماتسوكيتا',price:{amount:46,currency:'SAR'},status:'sale',thumbnail:'https://cdn.salla.sa/nEVKAy/51b00c17-1d70-4911-8c6a-ab92d3f37d1e-500x500-xvZ7u0E3o07FUOmgDhkjIquXSwaf6Qch5x9tFp2s.png'},
  {id:1148887940,name:'عينة عطر ايماجنيشن من لويس فيتون',price:{amount:22,currency:'SAR'},status:'sale',thumbnail:'https://cdn.salla.sa/nEVKAy/11e568a8-800d-4d44-8720-cdfe18c9774a-500x500-9jhEmIkRYvLbN9XSWBYNUQx5e5qlqLkEV5vjWpnU.png'},
  {id:1855509939,name:'عطر امواج اوتلاندس 100 مل',price:{amount:1830,currency:'SAR'},status:'sale',thumbnail:'https://cdn.salla.sa/nEVKAy/9c32ad73-f926-4978-a4f5-6be7214c1235-333.39285714286x500-QYjWV1vACOYhUXf0G9UckaeckfBfjzaj2poI1Tnl.png'},
  {id:1913120055,name:'عطر سيكوينس من امواج 100مل',price:{amount:1880,currency:'SAR'},status:'sale',thumbnail:'https://cdn.salla.sa/nEVKAy/62710d56-ec62-45aa-85a6-650503e45c24-333.39285714286x500-N0GCbKZUUv0AHWq4HZGHk6cHT9PmItA2rp8Q9r59.png'},
  {id:535108035,name:'عطر كريد عود زاريان 100 مل',price:{amount:1790,currency:'SAR'},status:'sale',thumbnail:'https://cdn.salla.sa/nEVKAy/b4dd005f-fbca-4342-ac9f-c6bcec485c58-500x500-MeAaeOY038clX2Le9cU9Le9f64SKWEXCaFgz0Agw.png'},
  {id:826607571,name:'عطر ايتات لبيري دي اورانج ابوف ذا ويفز 100 مل',price:{amount:640,currency:'SAR'},status:'sale',thumbnail:'https://cdn.salla.sa/nEVKAy/51802adc-95e2-4a0b-b4d7-04408bd1a129-500x500-tbSWB4O2SLMGRvnyfX7gZgx0lQodUA6zI1bb41W7.jpg'},
  {id:14655699,name:'عطر اف سان لوران ليبر لو نوي 90 مل',price:{amount:635,currency:'SAR'},status:'sale',thumbnail:'https://cdn.salla.sa/nEVKAy/8b841236-08a0-4277-bdc0-d069a70277f3-500x500-xQ9Bn3H9xCL4F0oEa4mCMBtz9PrMB6n9XsWsqKYV.png'},
  {id:1254699851,name:'عطر جولد فيلد اند بانكس انجينيس جينجر 100 مل',price:{amount:895,currency:'SAR'},status:'sale',thumbnail:'https://cdn.salla.sa/nEVKAy/84205a97-a58a-4c01-a9cb-cba584cc5ab2-333.39285714286x500-wfEx8zR7rMd8IUoMQdnL8aFFOabNm4vsLCnrVckr.png'},
  {id:1898460270,name:'عينة عطر بوا امبيريال ايسنشيال 2 مل',price:{amount:14,currency:'SAR'},status:'sale',thumbnail:'https://cdn.salla.sa/nEVKAy/7384b9fe-bce6-4763-b18f-f588e62c4f94-500x500-PoFl46x421iwONS0d42M9lxaLH9Dt9T7Bn05VDxJ.png'}
];

const PER_PAGE = 10;

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { type, page = '1' } = req.query;
  const pageNum = parseInt(page);

  if (type === 'categories') return res.status(200).json({ success: true, data: [
    {id:1,name:'الكل'},{id:2,name:'عينات'},{id:3,name:'عطور كاملة'},{id:4,name:'نيش'},{id:5,name:'كريد'},{id:6,name:'أمواج'}
  ]});

  if (type === 'products') {
    const start = (pageNum - 1) * PER_PAGE;
    const data = ALL_PRODUCTS.slice(start, start + PER_PAGE);
    const hasMore = start + PER_PAGE < ALL_PRODUCTS.length;
    return res.status(200).json({ success: true, data, page: pageNum, hasMore });
  }

  res.status(400).json({ success: false, error: 'Invalid type' });
};
