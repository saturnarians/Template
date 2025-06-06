require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const User = require('../src/models/User');

if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI not set in .env.local');
    process.exit(1);
}

async function createSuperAdmin(email, password, name) {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.error('⚠️  User with this email already exists');
            process.exit(1);
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const superAdmin = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'superadmin',
            isEmailVerified: true
        });

        console.log('🎉 Super admin created successfully:');
        console.log({
            name: superAdmin.name,
            email: superAdmin.email,
            role: superAdmin.role
        });

        process.exit(0);

    } catch (error) {
        console.error('❌ Error creating super admin:', error);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
    }
}

const args = process.argv.slice(2);
if (args.length !== 3) {
    console.error('Usage: node create-superadmin.js <email> <password> <name>');
    process.exit(1);
}

createSuperAdmin(args[0], args[1], args[2]);
