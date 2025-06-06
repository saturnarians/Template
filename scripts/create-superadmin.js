require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const path = require('path');
const User = require('../src/models/User');

// Already loaded .env.local above
// Using the User model directly from our app

async function createSuperAdmin(email, password, name) {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.error('User with this email already exists');
            process.exit(1);
        }        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create super admin user
        const superAdmin = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'superadmin',
            isEmailVerified: true
        });

        console.log('Super admin created successfully:', {
            name: superAdmin.name,
            email: superAdmin.email,
            role: superAdmin.role
        });

    } catch (error) {
        console.error('Error creating super admin:', error);
    } finally {
        await mongoose.disconnect();
    }
}

// Get command line arguments
const args = process.argv.slice(2);
if (args.length !== 3) {
    console.error('Usage: node create-superadmin.js <email> <password> <name>');
    process.exit(1);
}

createSuperAdmin(args[0], args[1], args[2]);