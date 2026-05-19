# Waitlist Setup Guide

## Quick Setup (Choose One Option)

### Option 1: Tally.so (Recommended - Easiest & Free)

1. **Create a Tally form:**
   - Go to [tally.so](https://tally.so)
   - Sign up for free
   - Create a new form with just an "Email" field
   - Customize the thank you message
   - Copy your form ID from the URL (e.g., `wXYz123`)

2. **Update the code:**
   - Open `components/waavy-landing/dark-mode/WaitlistForm.tsx`
   - Replace `YOUR_TALLY_FORM_ID` with your actual form ID

3. **View responses:**
   - All submissions appear in your Tally dashboard
   - Export to CSV, Google Sheets, or connect to Zapier

---

### Option 2: Waitlist.email (Purpose-built for waitlists)

1. **Create a waitlist:**
   - Go to [waitlist.email](https://waitlist.email)
   - Sign up and create a new waitlist
   - Copy your API key and Waitlist ID

2. **Add environment variables:**
   Create/update `.env.local`:

   ```
   NEXT_PUBLIC_WAITLIST_API_KEY=your_api_key_here
   NEXT_PUBLIC_WAITLIST_ID=your_waitlist_id_here
   ```

3. **Features:**
   - Automatic confirmation emails
   - Referral system (users can share to move up the list)
   - Built-in analytics
   - Export to CSV

---

### Option 3: ConvertKit (Best for email marketing)

1. **Create a form:**
   - Go to [convertkit.com](https://convertkit.com)
   - Create a free account (up to 1000 subscribers)
   - Create a new form
   - Get the form embed code

2. **Update Hero component:**
   Replace the `<WaitlistForm />` with ConvertKit's embed code

---

### Option 4: Google Forms (Simplest)

1. Create a Google Form with email field
2. Get the form URL
3. Update the form to open the Google Form in a popup or redirect

---

## Current Implementation

The current code supports both **Tally.so** and **Waitlist.email**:

- If you set up Waitlist.email env vars, it uses their API
- Otherwise, it opens a Tally form popup

## Recommended: Tally.so

**Why?**

- ✅ Completely free
- ✅ Beautiful, customizable forms
- ✅ No coding required
- ✅ Export to CSV/Google Sheets
- ✅ Webhook support for automation
- ✅ No email limits

**Setup time:** 2 minutes
