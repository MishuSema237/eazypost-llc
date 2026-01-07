const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config(); // Fallback to .env

const MONGO_URI = process.env.MONGODB_URI;

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'manager', 'user'], default: 'user' },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function seedAdmin() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        // --- CHANGE THESE VALUES AS NEEDED ---
        const adminEmail = 'mishael@eazypost.com';
        const adminPassword = 'NewSecretPassword2024!';
        const adminUsername = 'MishaelAdmin';
        // --------------------------------------

        const existingUser = await User.findOne({ email: adminEmail });
        if (existingUser) {
            console.log('User already exists. Updating password...');
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            existingUser.password = hashedPassword;
            existingUser.username = adminUsername;
            await existingUser.save();
            console.log('Admin user updated successfully.');
        } else {
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            const newAdmin = new User({
                username: adminUsername,
                email: adminEmail,
                password: hashedPassword,
                role: 'admin'
            });
            await newAdmin.save();
            console.log('Admin user created successfully.');
        }

        console.log('\n--- CREDENTIALS ---');
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
        console.log('-------------------\n');

        process.exit(0);
    } catch (err) {
        console.error('Error seeding admin:', err);
        process.exit(1);
    }
}

seedAdmin();
