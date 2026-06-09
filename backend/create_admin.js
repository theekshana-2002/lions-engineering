const mongoose = require('mongoose');
const Employee = require('./models/Employee');
require('dotenv').config();

async function createAdmin() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI is not set in environment!');
    process.exit(1);
  }

  try {
    console.log('Connecting to database...');
    await mongoose.connect(uri);
    console.log('✅ Connected successfully.');

    const username = 'lions_admin';
    const password = 'LionsAdmin@2026';
    const name = 'Lions Admin';
    const role = 'Admin';

    // Check if the admin already exists
    const existing = await Employee.findOne({ username });
    if (existing) {
      console.log(`⚠️ User with username "${username}" already exists. Updating password...`);
      existing.password = password;
      existing.name = name;
      existing.role = role;
      existing.status = 'Active';
      await existing.save();
      console.log('✅ Admin user updated successfully.');
    } else {
      const adminUser = new Employee({
        username,
        password,
        name,
        role,
        status: 'Active',
        contact: '0772138344'
      });
      await adminUser.save();
      console.log('✅ Admin user created successfully.');
    }
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Database disconnected.');
  }
}

createAdmin();
