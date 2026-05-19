require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function testConnection() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        console.error('❌ DATABASE_URL not found in environment');
        process.exit(1);
    }

    console.log('🔍 Testing Neon PostgreSQL Connection');
    console.log('Connection string:', connectionString.replace(/:[^:@]+@/, ':****@'));
    console.log('');

    const client = new Client({
        connectionString,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        console.log('Connecting...');
        await client.connect();
        console.log('✅ Connected successfully!\n');

        // Test query
        console.log('Running test query...');
        const result = await client.query('SELECT NOW() as current_time, version() as pg_version');
        console.log('✅ Query successful!');
        console.log('  Time:', result.rows[0].current_time);
        console.log('  PostgreSQL:', result.rows[0].pg_version.split(' ')[0], result.rows[0].pg_version.split(' ')[1]);
        console.log('');

        // List tables
        console.log('Checking tables...');
        const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

        if (tables.rows.length === 0) {
            console.log('⚠️  No tables found!');
            console.log('   Run the SQL from prisma/manual-schema.sql in Neon SQL Editor');
        } else {
            console.log(`✅ Found ${tables.rows.length} tables:`);
            tables.rows.forEach(row => console.log(`  - ${row.table_name}`));
        }
        console.log('');

        // Count records if tables exist
        if (tables.rows.length > 0) {
            try {
                const counts = await client.query(`
          SELECT 
            (SELECT COUNT(*) FROM "Company") as companies,
            (SELECT COUNT(*) FROM "Employee") as employees,
            (SELECT COUNT(*) FROM "Invite") as invites,
            (SELECT COUNT(*) FROM "OnboardingTask") as tasks
        `);

                console.log('📊 Record Counts:');
                console.log(`  Companies: ${counts.rows[0].companies}`);
                console.log(`  Employees: ${counts.rows[0].employees}`);
                console.log(`  Invites: ${counts.rows[0].invites}`);
                console.log(`  Tasks: ${counts.rows[0].tasks}`);
                console.log('');
            } catch (e) {
                console.log('⚠️  Could not count records (tables may not exist yet)');
            }
        }

        console.log('✅ Database connection test passed!');
        console.log('');
        console.log('📝 Note: If Prisma commands fail but this test passes,');
        console.log('   the issue is with Prisma configuration, not the database.');

    } catch (error) {
        console.error('❌ Connection failed!');
        console.error('Error:', error.message);
        console.log('');
        console.log('💡 Troubleshooting:');
        console.log('1. Verify DATABASE_URL in .env.local');
        console.log('2. Check Neon dashboard - is database running?');
        console.log('3. Verify connection string has ?sslmode=require');
        console.log('4. Try copying connection string again from Neon');
        process.exit(1);
    } finally {
        await client.end();
    }
}

testConnection();
