# Database Setup - Cloud Database (Recommended)

Since Docker is not installed, we'll use a **free cloud PostgreSQL database** instead. This is actually better for development as it's:
- ✅ Easier to set up (no Docker required)
- ✅ Accessible from anywhere
- ✅ Free tier available
- ✅ Production-ready

## Option 1: Neon (Recommended - Fastest Setup)

### Step 1: Create Neon Account
1. Go to [https://neon.tech](https://neon.tech)
2. Sign up with GitHub or email
3. Click "Create Project"

### Step 2: Get Connection String
1. After creating project, you'll see your connection string
2. Copy the connection string (it looks like):
   ```
   postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

### Step 3: Update `.env.local`
Replace the `DATABASE_URL` in `.env.local` with your Neon connection string:
```bash
DATABASE_URL="your_neon_connection_string_here"
```

### Step 4: Run Prisma Migrations
```bash
npx prisma generate
npx prisma db push
```

---

## Option 2: Supabase

### Step 1: Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up and create a new project
3. Wait 2-3 minutes for project to be ready

### Step 2: Get Connection String
1. Go to Project Settings → Database
2. Scroll to "Connection string" section
3. Select "URI" tab
4. Copy the connection string
5. Replace `[YOUR-PASSWORD]` with your database password

### Step 3: Update `.env.local`
```bash
DATABASE_URL="your_supabase_connection_string_here"
```

### Step 4: Run Prisma Migrations
```bash
npx prisma generate
npx prisma db push
```

---

## After Database Setup

Once you've set up either Neon or Supabase:

### 1. Generate Prisma Client
```bash
npx prisma generate
```

### 2. Push Database Schema
```bash
npx prisma db push
```

This will create all the tables:
- ✅ Company
- ✅ Employee
- ✅ OnboardingTask
- ✅ ComplianceDocument
- ✅ Invite

### 3. View Database (Optional)
```bash
npx prisma studio
```

Opens at `http://localhost:5555` - you can view and edit data visually.

---

## Quick Start Commands

After setting up your cloud database:

```bash
# 1. Generate Prisma Client
npx prisma generate

# 2. Create database tables
npx prisma db push

# 3. (Optional) Open Prisma Studio
npx prisma studio

# 4. Start development server
npm run dev
```

---

## Troubleshooting

### "Can't reach database server"
- Check your internet connection
- Verify the connection string is correct
- Ensure there are no extra spaces in `.env.local`

### "SSL connection required"
Add `?sslmode=require` to the end of your connection string

### Reset Database
```bash
npx prisma db push --force-reset
```

---

## Next Steps

After database is set up:
1. ✅ Database is ready
2. → Run `npx prisma generate`
3. → Run `npx prisma db push`
4. → Start building API routes
5. → Test company setup wizard with real database

---

## Production Database

The same Neon/Supabase database can be used for production! Just:
1. Create a separate production project
2. Add the production `DATABASE_URL` to your hosting environment variables (Vercel, etc.)
