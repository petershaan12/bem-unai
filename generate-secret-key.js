// generate-secret-key.js
import crypto from 'crypto';

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

console.log('Generated Secret Key:', secretKey);
