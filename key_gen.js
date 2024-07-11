const crypto = require('crypto');
const fs = require('fs');


// Generate an Ed25519 key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519');

const generateKeys = ()=>{
    // Export the private key to PEM format
    const privateKeyPem = privateKey.export({
      type: 'pkcs8',
      format: 'pem'
    });
    // Export the public key to PEM format
    const publicKeyPem = publicKey.export({
      type: 'spki',
      format: 'pem'
    });
    fs.writeFileSync('private_key.pem', privateKeyPem);
    fs.writeFileSync('public_key.pem', publicKeyPem);
    
    console.log('Ed25519 key pair generated and saved to files.');
}

generateKeys()