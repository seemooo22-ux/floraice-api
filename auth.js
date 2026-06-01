const CLIENT_ID = process.env.SALLA_CLIENT_ID;
const CLIENT_SECRET = process.env.SALLA_CLIENT_SECRET;
const REDIRECT_URI = 'https://floraice-api.vercel.app/auth/callback';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { code, action } = req.query;
  const path = req.url;

  // Login redirect
  if (action === 'login' || path.includes('login')) {
    const authUrl = `https://accounts.salla.sa/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=offline_access`;
    res.writeHead(302, { Location: authUrl });
    return res.end();
  }

  // Callback with code
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
        const html = `<html><body><script>
          localStorage.setItem('salla_token','${tokens.access_token}');
          localStorage.setItem('salla_refresh','${tokens.refresh_token || ''}');
          document.write('<h2>✅ تم تسجيل الدخول! Token: ${tokens.access_token.substring(0,20)}...</h2>');
        </script></body></html>`;
        res.setHeader('Content-Type', 'text/html');
        return res.end(html);
      } else {
        return res.end(JSON.stringify(tokens));
      }
    } catch(e) {
      return res.end(JSON.stringify({ error: e.message }));
    }
  }

  res.end(JSON.stringify({ error: 'Invalid request', url: req.url, query: req.query }));
};
