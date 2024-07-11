const { createPrivateKey,createPublicKey } = require('crypto')
const { V4 } = require('paseto')
const fs = require('fs');

// Load the private key
const privateKeyPem = fs.readFileSync('private_key.pem', 'utf8');
const privateKey = createPrivateKey(privateKeyPem);
// Load the public key
const publicKeyPem = fs.readFileSync('public_key.pem', 'utf8');
const publicKey = createPublicKey(publicKeyPem);

// Payload to be included in the token
const payload = {
  message: 'Hello, this is a secret message',
  exp: new Date(new Date().getTime() + 3600000).toISOString(), // Token expiry time (1 hour)
};

// Function to sign the payload and create a PASETO token
async function createToken() {
  try {
    const token = await V4.sign(payload, privateKey);
    console.log('PASETO Token:', token);
    return token;
  } catch (err) {
    console.error('Error creating PASETO token:', err);
  }
}

// Function to verify the PASETO token
async function verifyToken(token) {
  try {
    const verifiedPayload = await V4.verify(token, publicKey);
    console.log('Verified Payload:', verifiedPayload);
  } catch (err) {
    console.error('Error verifying PASETO token:', err);
  }
}

// Example usage
(async () => {
  const token = await createToken();
  await verifyToken(token);
})();