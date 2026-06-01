const CLIENT_ID = process.env.SALLA_CLIENT_ID;
const CLIENT_SECRET = process.env.SALLA_CLIENT_SECRET;
const REDIRECT_URI = 'https://floraice-api.vercel.app/auth/callback';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { code, action, error } = req.query;

  if (error) {
    return res.end(JSON.stringify({ error, description: req.query.error_description }));
  }

  if (action === 'login') {
    const state = Math.random().toString(36).substring(2, 18);
    const authUrl = `https://accounts.salla.sa/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=offline_access&state=${state}`;
    res.writeHead(302, { Location: authUrl });
    return res.end();
  }

  if (code) {
    try {
      const response = await fetch('https://accounts.salla.sa/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          redirect_uri: REDIRECT_URI,
          code,
        }).toString(),
      });
      const tokens = await response.json();
      
      if (tokens.access_token) {
        res.setHeader('Content-Type', 'text/html');
        return res.end(`<html><body style="font-family:sans-serif;text-align:center;padding:40px;background:#1a0a00;color:#d4a94a">
          <h1>✅ تم تسجيل الدخول بنجاح!</h1>
          <p style="color:#fff;margin:20px 0">Access Token:</p>
          <code style="background:#000;color:#d4a94a;padding:10px;border-radius:8px;display:block;word-break:break-all">${tokens.access_token}</code>
          <p style="color:#888;margin-top:20px;font-size:12px">انسخ هذا التوكن واحفظه</p>
        </body></html>`);
      } else {
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify(tokens));
      }
    } catch(e) {
      return res.end(JSON.stringify({ error: e.message }));
    }
  }

  res.end(JSON.stringify({ status: 'auth ready', login: REDIRECT_URI + '?action=login' }));
};
