# Test Accounts for Waavy HRMS

## Quick Reference

Use these test accounts to test the authentication and onboarding flows:

### Test Account #1 - New User (Incomplete Onboarding)
- **Email**: `test.user1@waavy.test`
- **Password**: `TestUser123!`
- **Purpose**: Test redirect to onboarding flow
- **Expected Behavior**: After sign-in, should redirect to `/onboarding/company-setup`

### Test Account #2 - Completed User
- **Email**: `test.user2@waavy.test`
- **Password**: `TestUser123!`
- **Purpose**: Test redirect to dashboard
- **Expected Behavior**: After sign-in, should redirect to `/dashboard`

---

## Creating Test Accounts

Since this application uses Clerk for authentication, create test accounts through the sign-up flow:

1. Start the dev server: `npm run dev`
2. Navigate to http://localhost:3000/sign-up
3. Create accounts with the credentials above
4. For Test Account #1: Stop after sign-up (don't complete onboarding)
5. For Test Account #2: Complete all onboarding steps

---

## Testing Checklist

- [ ] Sign in with Test Account #1 → Should redirect to onboarding
- [ ] Sign in with Test Account #2 → Should redirect to dashboard
- [ ] No redirect loops occur
- [ ] Onboarding flow works step-by-step
- [ ] Direct URL access to `/onboarding/*` works when authenticated
- [ ] Validation page handles errors gracefully

---

## Notes

- Test accounts can be managed through the Clerk dashboard
- To reset a test account's onboarding status, update the database directly
- Passwords follow Clerk's security requirements (min 8 chars, uppercase, number, special char)
