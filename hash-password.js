const bcrypt = require('bcryptjs');

async function hashPassword() {
  const password = ''; // Ganti dengan password yang diinginkan
  const hashedPassword = await bcrypt.hash(password, 12);
  console.log('Hashed password:', hashedPassword);
}

hashPassword();