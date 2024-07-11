const { createPrivateKey } = require('crypto')
const { V4 } = require('paseto')
const fs = require('fs');

const tokenGenerator = async () => {
    const privateKeyPem = fs.readFileSync('private_key.pem', 'utf8');
    const key = createPrivateKey(privateKeyPem)
    
    const payload = {
      'urn:example:claim': 'foo'
    }
  const token = await V4.sign(payload, key, {
    audience: 'urn:example:client',
    issuer: 'https://op.example.com',
    expiresIn: '2 hours'
  })
  console.log(token);
  // v4.public.eyJ1cm46ZXhhbXBsZTpjbGFpbSI6ImZvbyIsImlhdCI6IjIwMjEtMDctMTlUMTA6MTM6MjIuOTM3WiIsImV4cCI6IjIwMjEtMDctMTlUMTI6MTM6MjIuOTM3WiIsImF1ZCI6InVybjpleGFtcGxlOmNsaWVudCIsImlzcyI6Imh0dHBzOi8vb3AuZXhhbXBsZS5jb20ifYZrfK1eH8d7Scp218_DPEX8H3ElIfzWWMu9UQVZYjyV585BEBV0wTRk-vZgtXq0y5z0euOE48a2Yd6TLKfA5Qs
}
tokenGenerator()