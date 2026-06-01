const CLIENT_ID = process.env.SALLA_CLIENT_ID;
const CLIENT_SECRET = process.env.SALLA_CLIENT_SECRET;
const REDIRECT_URI = 'https://floraice-api.vercel.app/auth/callback';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { code, action } = req.query;

  // Step 1: Redirect to Salla OAuth
  if (action === 'login') {
    const authUrl = `https://accounts.salla.sa/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=offline_access`;
    return res.redirect(authUrl);
  }

  // Step 2: Handle callback with code
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
        }),
      });
      const tokens = await response.json();
      
      // Store token and redirect
      const html = `
        <html><body>
        <script>
          localStorage.setItem('salla_token', '${tokens.access_token}');
          localStorage.setItem('salla_refresh', '${tokens.refresh_token}');
          window.location.href = '/';
        </script>
        </body></html>`;
      return res.send(html);
    } catch(e) {
      return res.status(500).json({ error: e.message });
    }
  }

  res.status(400).json({ error: 'Invalid request' });
};
