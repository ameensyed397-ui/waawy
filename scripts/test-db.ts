import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query', 'error', 'warn'],
})

async function main() {
    try {
        console.log('🔍 Testing Neon database connection...')
        console.log('Connection string:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'))
        console.log('')

        // Simple connection test
        console.log('Attempting to connect...')
        await prisma.$connect()
        console.log('✅ Connected!\n')

        // Try a simple query
        console.log('Testing query...')
        const result = await prisma.$queryRaw`SELECT 1 as test`
        console.log('✅ Query successful:', result)
        console.log('')

        // List tables
        console.log('Fetching tables...')
        const tables: any[] = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `

        if (tables.length === 0) {
            console.log('⚠️  No tables found! Run the manual-schema.sql in Neon SQL Editor.')
        } else {
            console.log('✅ Tables found:')
            tables.forEach((t: any) => console.log(`  - ${t.table_name}`))
        }
        console.log('')

        // Try to count records (will fail if tables don't exist)
        try {
            const companyCount = await prisma.company.count()
            const employeeCount = await prisma.employee.count()

            console.log('📈 Database Statistics:')
            console.log(`  Companies: ${companyCount}`)
            console.log(`  Employees: ${employeeCount}`)
            console.log('')
            console.log('✅ Database is fully operational!')
        } catch (e: any) {
            if (e.code === 'P2021') {
                console.log('⚠️  Tables exist but schema mismatch. Run: npx prisma db push')
            } else {
                console.log('⚠️  Could not query tables:', e.message)
            }
        }

    } catch (error: any) {
        console.error('❌ Database test failed!')
        console.error('Error code:', error.code)
        console.error('Error message:', error.message)

        if (error.code === 'P5010') {
            console.log('\n💡 Troubleshooting P5010 Error:')
            console.log('1. Check if DATABASE_URL is set in .env.local')
            console.log('2. Verify Neon database is running')
            console.log('3. Check connection string format')
            console.log('4. Try: npx prisma db push')
        }

        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main()
