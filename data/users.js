const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin User',
    email: 'admin@mmuniversal.com',
    password: 'password123', // Will be hashed by pre-save middleware if handled in seeder, OR we hash it here if seeder uses insertMany without middleware
    role: 'admin',
  },
  {
    name: 'John Doe',
    email: 'client@example.com',
    password: 'password123',
    role: 'user',
  },
];

module.exports = users;
