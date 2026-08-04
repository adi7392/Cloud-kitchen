import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/user.model.js';
import dns from 'dns';

dotenv.config();
dns.setServers(['8.8.8.8', '1.1.1.1']);

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to DB');

    const email = 'admin@gmail.com';
    const existing = await User.findOne({ email });
    if (existing) {
      console.log('Admin already exists:', email);
      await mongoose.disconnect();
      process.exit(0);
    }

    const hashed = await bcrypt.hash('123456', 10);
    const admin = new User({
      username: 'admin',
      email,
      password: hashed,
      role: 'admin',
    });

    await admin.save();
    console.log('Created admin user:', email);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Failed to create admin:', err);
    process.exit(1);
  }
}

createAdmin();
