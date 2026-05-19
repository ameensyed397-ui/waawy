# Deploying Waawy to Netlify + Loops.so Setup

## Prerequisites

- [Netlify](https://netlify.com) account
- [Loops.so](https://loops.so) account
- Domain: `getwaawy.com` (bought ✅)
- Database: Neon PostgreSQL (already configured)

---

## 1. Loops.so Setup

### Create Transactional Templates

1. Go to [app.loops.so](https://app.loops.so) → **Transactional** → **New**
2. Create two templates:

**Waitlist Welcome** — data variables: `email`, `surveyUrl`
**Team Invite** — data variables: `companyName`, `inviterName`, `inviteLink`, `expiresInDays`

1. Copy the `transactionalId` for each template

### Domain Verification

1. Go to **Settings** → **Sending** in Loops dashboard
2. Add `getwaawy.com` as a sending domain
3. Add the DNS records Loops provides to your domain registrar

---

## 2. Netlify Setup

### Connect Your Repo

1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**
2. Connect your GitHub/GitLab repo
3. Configure build settings:

| Setting | Value |
|---------|-------|
| **Build command** | `npx prisma generate && npm run build` |
| **Publish directory** | `.next` |
| **Node version** | `18` or `20` |

> **Important:** Netlify needs the `@netlify/plugin-nextjs` plugin for Next.js. It should auto-detect this, but if not, add it in **Plugins** → search "Next.js".

### Environment Variables

Go to **Site settings** → **Environment variables** → add all of these:

```
# Database
DATABASE_URL=postgresql://...your-neon-url...

# Clerk (Authentication)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Loops.so (Email)
LOOPS_API_KEY=your_loops_api_key
LOOPS_WAITLIST_TRANSACTIONAL_ID=your_waitlist_template_id
LOOPS_INVITE_TRANSACTIONAL_ID=your_invite_template_id

# App
NEXT_PUBLIC_APP_URL=https://getwaawy.com
```

> **⚠️ Security:** Never commit API keys to git. Use Netlify env vars for production values.

### 3. Set up Email (Loops.so)

1. Create a [Loops.so](https://loops.so) account
2. Get your API Key from Settings -> API
3. Create Transactional Emails:
   - Create a "Waitlist Welcome" email and copy its Transactional ID
   - Create an "Invite" email and copy its Transactional ID
4. Add environment variables:

```env
LOOPS_API_KEY=your_api_key
LOOPS_WAITLIST_TRANSACTIONAL_ID=cmlqxu6b902cf0iyo29sf47ib
LOOPS_INVITE_TRANSACTIONAL_ID=your_invite_id
```

### Custom Domain

1. Go to **Domain settings** → **Add custom domain**
2. Enter `getwaawy.com`
3. Netlify will show you **nameservers** or a **CNAME** to configure:
   - **Option A (Nameservers):** Point your domain's nameservers to Netlify's (recommended)
   - **Option B (CNAME):** Add a CNAME record pointing to your Netlify site URL
4. Also add `www.getwaawy.com` as an alias
5. Enable **HTTPS** (Netlify provides free SSL via Let's Encrypt)

---

## 3. Database Migration

After first deploy, run the migration to create tables:

```bash
# From your local machine, using the production DATABASE_URL
DATABASE_URL="your-neon-production-url" npx prisma migrate deploy
```

Or if using Neon's dashboard, the migration should already be applied from dev.

---

## 4. Post-Deploy Checklist

- [ ] Site loads at `https://getwaawy.com`
- [ ] HTTPS is active (green padlock)
- [ ] Waitlist form submits successfully
- [ ] Welcome email arrives in inbox
- [ ] Contact appears in Loops.so audience
- [ ] "Book a chat" opens Calendly
- [ ] Tally survey link works from the welcome email
- [ ] No login button visible on landing page

---

## 5. Updating the Site

Every push to your main branch auto-deploys via Netlify.

```bash
git add .
git commit -m "update landing page"
git push origin main
```

Netlify will rebuild and deploy in ~2-3 minutes.

---

## Environment Variables Reference

| Variable | Where to get it | Required |
|----------|----------------|----------|
| `DATABASE_URL` | [Neon dashboard](https://neon.tech) | ✅ |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | [Clerk dashboard](https://clerk.com) | ✅ |
| `CLERK_SECRET_KEY` | Clerk dashboard | ✅ |
| `LOOPS_API_KEY` | [Loops dashboard](https://app.loops.so/settings/api) | ✅ |
| `LOOPS_WAITLIST_TRANSACTIONAL_ID` | Loops transactional templates | ✅ |
| `LOOPS_INVITE_TRANSACTIONAL_ID` | Loops transactional templates | ✅ |
| `NEXT_PUBLIC_APP_URL` | Your domain | ✅ |

---

## Troubleshooting

**Emails not sending?**
→ Check Loops.so dashboard for delivery logs and domain verification status

**Build failing?**
→ Make sure `prisma generate` runs before `next build` (it's in the build command above)

**Database errors?**
→ Run `npx prisma migrate deploy` with the production `DATABASE_URL`

**404 on routes?**
→ Ensure the Netlify Next.js plugin is installed
