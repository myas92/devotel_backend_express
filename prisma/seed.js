const { PrismaClient } = require('@prisma/client');
const admin = require('../src/config/firebase');
const adminUsers = require('../secrets/admins.json');

const seedAdmins = async () => {
    for (const adminUser of adminUsers) {
        try {
            await admin.auth().getUserByEmail(adminUser.email);
            console.log(`User already exists: ${adminUser.email}`);
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                try {
                    const userRecord = await admin.auth().createUser({
                        email: adminUser.email,
                        password: adminUser.password,
                    });

                    console.log(`Created new admin user: ${adminUser.email}`);

                    await admin.auth().setCustomUserClaims(userRecord.uid, { role: adminUser.role });

                    console.log(`Role ${adminUser.role} assigned to user ${adminUser.email}`);
                } catch (error) {
                    console.error('Error creating user:', error);
                }
            } else {
                console.error('Error checking user:', error);
            }
        }
    }
};

const runSeed = async () => {
    try {
        await seedAdmins();
        console.log('Admin seeding process completed.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admins:', error);
        process.exit(1);
    }
};

runSeed();