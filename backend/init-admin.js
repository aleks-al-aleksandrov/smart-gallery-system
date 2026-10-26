const auth = require('./auth');

async function initializeAdmin() {
    const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    console.log('Initializing admin user...');
    
    try {
        const usersData = auth.loadUsers();
        const existingAdmin = usersData.users.find(u => u.username === 'admin');
        
        if (existingAdmin) {
            console.log('Admin user already exists. Use this command to reset password:');
            console.log('node backend/reset-password.js admin <new-password>');
            return;
        }
        
        const hashedPassword = await auth.hashPassword(defaultPassword);
        const newUser = auth.createUser({
            username: 'admin',
            password: hashedPassword,
            role: 'admin',
            allowedApps: ['daily-plan', 'gallery', 'dashboard'],
            networkPaths: {
                main: 'data/content/demo-images',
                extra: 'data/content/demo-images/gallery',
                kpi: 'data/content/demo-images/kpi',
                dailyPlan: 'data/content/demo-images/daily-plan',
                gallery: 'data/content/demo-images/gallery'
            }
        });
        
        if (newUser) {
            console.log('✓ Admin user created successfully!');
            console.log(`  Username: admin`);
            console.log(`  Password: ${defaultPassword}`);
            console.log('\n⚠️  IMPORTANT: Change the default password after first login!');
        } else {
            console.error('✗ Failed to create admin user: Username may already exist or file write failed');
        }
    } catch (error) {
        console.error('Error initializing admin:', error);
    }
}

initializeAdmin();
