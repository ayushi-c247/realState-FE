# Multi-Subdomain Flow - Complete Explanation

## Important: No Folder Structure Changes Required!

**Your existing Next.js folder structure remains unchanged.** The subdomain routing is **role-based**, not folder-based. All routes exist in the same codebase and are accessible based on user authentication and role.

## Core Concept

The same Next.js app serves all subdomains (`portal.skillsome.com`, `content.skillsome.com`, etc.). The middleware acts as a **gatekeeper** that:

1. Detects which subdomain the user is accessing
2. Checks the user's role from their JWT token
3. Validates if that role is allowed on that subdomain
4. Either allows access or redirects to the correct subdomain

## Visual Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     SAME NEXT.JS APP                            │
│                     SAME CODEBASE                               │
│                     SAME FOLDER STRUCTURE                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  src/app/                                                       │
│  ├── (auth)/                                                    │
│  │   ├── login/              ← Available on portal subdomain   │
│  │   ├── expert-login/       ← Available on content subdomain  │
│  │   └── child-login/        ← Available on portal subdomain   │
│  │                                                              │
│  ├── (user)/                                                    │
│  │   ├── dashboard/          ← Available on ALL subdomains     │
│  │   │                          (filtered by role)             │
│  │   ├── admin/              ← Only ADMIN on portal            │
│  │   ├── my-content/         ← Only EXPERT on content          │
│  │   ├── learning-programs/  ← PARENT/CO_PARENT/CHILD on portal│
│  │   └── linked-accounts/    ← PARENT/CO_PARENT on portal      │
│  │                                                              │
│  └── middleware.ts           ← CONTROLS ACCESS VIA ROLE        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
         ▲                           ▲                      ▲
         │                           │                      │
         │                           │                      │
  portal.skillsome.com      content.skillsome.com   admin.skillsome.com
  (ADMIN, PARENT,                (EXPERT)              (ADMIN - future)
   CO_PARENT, CHILD)
```

## How Routes Are Accessed - Detailed Examples

### Example 1: Expert User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│ Step 1: Expert navigates to content.skillsome.com              │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ Step 2: Middleware detects subdomain = "content"               │
│         User is NOT logged in (no token)                       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ Step 3: Middleware redirects to:                               │
│         content.skillsome.com/expert-login                     │
│         (defaultLoginPath for "content" subdomain)             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ Step 4: Expert enters credentials and logs in                  │
│         Backend returns JWT token with: { role: "EXPERT" }     │
│         Token is stored in cookies                             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ Step 5: Expert is redirected to my content                      │
│         URL: content.skillsome.com/my-content                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ Step 6: Middleware checks on EVERY request:                    │
│         - Current subdomain: "content"                         │
│         - User role from token: "EXPERT"                       │
│         - Is EXPERT allowed on "content"? YES ✅               │
│         - Allow access to route                                │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ Step 7: Expert navigates to /my-content                        │
│         URL: content.skillsome.com/my-content                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ Step 8: Middleware checks:                                     │
│         - Current subdomain: "content"                         │
│         - User role: "EXPERT"                                  │
│         - Is EXPERT allowed on "content"? YES ✅               │
│         - Is /my-content blocked for EXPERT? NO ✅             │
│         - Allow access                                         │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ SUCCESS: Expert sees /my-content page                          │
└─────────────────────────────────────────────────────────────────┘
```

### Example 2: Expert Tries to Access Portal Subdomain (BLOCKED)

```
┌─────────────────────────────────────────────────────────────────┐
│ Step 1: Expert (logged in) clicks a link to:                   │
│         portal.skillsome.com/admin                             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ Step 2: Browser navigates to portal.skillsome.com/admin        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ Step 3: Middleware intercepts the request:                     │
│         - Current subdomain: "portal"                          │
│         - User role from token: "EXPERT"                       │
│         - Is EXPERT allowed on "portal"? NO ❌                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ Step 4: Middleware performs cross-subdomain redirect:          │
│         - Look up correct subdomain for EXPERT role            │
│         - EXPERT → "content" subdomain                         │
│         - Redirect to: content.skillsome.com/admin             │
│           (preserving the path)                                │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ Step 5: User lands on content.skillsome.com/admin              │
│         Middleware checks:                                     │
│         - Current subdomain: "content"                         │
│         - User role: "EXPERT"                                  │
│         - Is EXPERT allowed on "content"? YES ✅               │
│         - Is /admin blocked for EXPERT? YES ❌                 │
│           (ROUTE_PROTECTION blocks EXPERT from /admin)         │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ Step 6: Middleware redirects to:                               │
│         content.skillsome.com/dashboard                        │
│         (redirectTo from ROUTE_PROTECTION)                     │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ RESULT: Expert stays on content subdomain at /dashboard        │
│         Cannot access /admin route                             │
└─────────────────────────────────────────────────────────────────┘
```

### Example 3: Parent User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│ Step 1: Parent navigates to portal.skillsome.com               │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ Step 2: Middleware detects subdomain = "portal"                │
│         User is NOT logged in                                  │
│         Redirects to: portal.skillsome.com/login               │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ Step 3: Parent logs in                                         │
│         JWT token: { role: "PARENT" }                          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ Step 4: Parent navigates to /learning-programs                 │
│         URL: portal.skillsome.com/learning-programs            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ Step 5: Middleware checks:                                     │
│         - Current subdomain: "portal"                          │
│         - User role: "PARENT"                                  │
│         - Is PARENT allowed on "portal"? YES ✅                │
│         - Is /learning-programs blocked for PARENT? NO ✅      │
│         - Allow access                                         │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ SUCCESS: Parent can access learning programs                   │
└─────────────────────────────────────────────────────────────────┘
```

## Two Layers of Protection

The implementation uses **TWO layers** of access control:

### Layer 1: Subdomain-Level Protection

**File:** `src/middleware.ts` (lines 87-102)

```typescript
// Check if user's role is allowed on this subdomain
if (!isRoleAllowedOnSubdomain(payload.role, currentSubdomain)) {
  // User is on wrong subdomain - redirect to correct one
  const correctSubdomainUrl = getCorrectSubdomainForRole(payload.role);
  return NextResponse.redirect(redirectUrl);
}
```

**What it does:**

- EXPERT can ONLY access `content.skillsome.com`
- ADMIN, PARENT, CO_PARENT, CHILD can ONLY access `portal.skillsome.com`

### Layer 2: Route-Level Protection

**File:** `src/middleware.ts` (lines 109-125)

```typescript
const ROUTE_PROTECTION: Record<string, { blockedRoles: string[]; redirectTo: string }> = {
  [paths.ROOT_MYCONTENT]: {
    blockedRoles: [USER_ROLE.ADMIN, USER_ROLE.PARENT, USER_ROLE.CO_PARENT, USER_ROLE.CHILD],
    redirectTo: paths.ROOT_DASHBOARD,
  },
  // ... other routes
};
```

**What it does:**

- Even if someone is on the correct subdomain, they might not be able to access certain routes
- Example: `/my-content` is blocked for ADMIN, PARENT, CO_PARENT, CHILD
- Example: `/admin` is blocked for EXPERT

## Configuration Breakdown

### In `src/config/subdomains.ts`:

```typescript
// Define which roles can access which subdomains
export const SUBDOMAIN_CONFIG = {
  portal: {
    name: "portal",
    allowedRoles: [USER_ROLE.ADMIN, USER_ROLE.PARENT, USER_ROLE.CO_PARENT, USER_ROLE.CHILD],
    // ⬆️ These 4 roles can access portal subdomain
  },
  content: {
    name: "content",
    allowedRoles: [USER_ROLE.EXPERT],
    // ⬆️ Only EXPERT can access content subdomain
  },
};

// Define where each role should go by default
export const ROLE_TO_SUBDOMAIN = {
  [USER_ROLE.ADMIN]: "portal",
  [USER_ROLE.PARENT]: "portal",
  [USER_ROLE.CO_PARENT]: "portal",
  [USER_ROLE.CHILD]: "portal",
  [USER_ROLE.EXPERT]: "content",
  // ⬆️ If EXPERT tries to access portal, redirect to content
};
```

## Access Control Matrix

| User Role     | Can Access Portal? | Can Access Content? | Routes Available                                 |
| ------------- | ------------------ | ------------------- | ------------------------------------------------ |
| **ADMIN**     | ✅ YES             | ❌ NO → redirects   | /admin, /dashboard, /events                      |
| **PARENT**    | ✅ YES             | ❌ NO → redirects   | /dashboard, /learning-programs, /linked-accounts |
| **CO_PARENT** | ✅ YES             | ❌ NO → redirects   | /dashboard, /learning-programs, /linked-accounts |
| **CHILD**     | ✅ YES             | ❌ NO → redirects   | /dashboard, /learning-programs                   |
| **EXPERT**    | ❌ NO → redirects  | ✅ YES              | /dashboard, /my-content                          |

## Real-World Scenarios

### Scenario 1: Expert Creating Content

```
1. Expert goes to: content.skillsome.com
2. Logs in with expert credentials
3. Can access: content.skillsome.com/my-content ✅
4. Can access: content.skillsome.com/dashboard ✅
5. Cannot access: content.skillsome.com/admin ❌
6. If tries portal.skillsome.com → Auto-redirected to content.skillsome.com
```

### Scenario 2: Admin Managing Users

```
1. Admin goes to: portal.skillsome.com
2. Logs in with admin credentials
3. Can access: portal.skillsome.com/admin ✅
4. Can access: portal.skillsome.com/dashboard ✅
5. Cannot access: portal.skillsome.com/learning-programs ❌
6. If tries content.skillsome.com → Auto-redirected to portal.skillsome.com
```

### Scenario 3: Parent Viewing Learning Programs

```
1. Parent goes to: portal.skillsome.com
2. Logs in with parent credentials
3. Can access: portal.skillsome.com/learning-programs ✅
4. Can access: portal.skillsome.com/linked-accounts ✅
5. Cannot access: portal.skillsome.com/admin ❌
6. Cannot access: portal.skillsome.com/my-content ❌
7. If tries content.skillsome.com → Auto-redirected to portal.skillsome.com
```

## Key Points to Remember

1. **Same Codebase**: All subdomains serve the same Next.js application
2. **No Folder Restructuring**: Your existing `src/app` structure is unchanged
3. **Role-Based, Not Path-Based**: Access is determined by JWT token role
4. **Middleware is the Gatekeeper**: All logic is in middleware, not in routes
5. **Double Protection**: Both subdomain-level and route-level checks
6. **Automatic Redirects**: Users are automatically sent to their correct subdomain

## What Happens During a Request?

```
User Request
    ↓
┌─────────────────────────────────────────────┐
│         Next.js Middleware Runs             │
├─────────────────────────────────────────────┤
│ 1. Extract subdomain from hostname          │
│ 2. Extract user role from JWT token         │
│ 3. Check: Is role allowed on subdomain?     │
│    ├─ NO  → Redirect to correct subdomain   │
│    └─ YES → Continue to step 4              │
│ 4. Check: Is route blocked for this role?   │
│    ├─ YES → Redirect to dashboard           │
│    └─ NO  → Continue to step 5              │
│ 5. Allow request to proceed                 │
└─────────────────────────────────────────────┘
    ↓
Route Handler (Your Page Component)
    ↓
Render Page
```

## How to Add a New Subdomain

### Example: Adding child.skillsome.com for Child Role

Let's walk through the complete process of adding a dedicated subdomain for the Child role.

#### Current State:

- **Portal subdomain** (portal.skillsome.com): ADMIN, PARENT, CO_PARENT, CHILD
- **Content subdomain** (content.skillsome.com): EXPERT

#### Goal:

- **Portal subdomain** (portal.skillsome.com): ADMIN, PARENT, CO_PARENT
- **Content subdomain** (content.skillsome.com): EXPERT
- **Child subdomain** (child.skillsome.com): CHILD (NEW)

---

### Step 1: Update Type Definitions in subdomains.ts

**File:** `src/config/subdomains.ts`

**Before:**

```typescript
export type SubdomainType = "portal" | "content";
```

**After:**

```typescript
export type SubdomainType = "portal" | "content" | "child";
```

**What this does:** Adds "child" as a valid subdomain type in TypeScript, enabling type checking.

---

### Step 2: Add Child Subdomain Configuration

**File:** `src/config/subdomains.ts`

**Before:**

```typescript
export const SUBDOMAIN_CONFIG: Record<SubdomainType, SubdomainConfig> = {
  portal: {
    name: "portal",
    hostname: "portal.skillsome.com",
    allowedRoles: [USER_ROLE.ADMIN, USER_ROLE.PARENT, USER_ROLE.CO_PARENT, USER_ROLE.CHILD],
    defaultLoginPath: "/login",
  },
  content: {
    name: "content",
    hostname: "content.skillsome.com",
    allowedRoles: [USER_ROLE.EXPERT],
    defaultLoginPath: "/expert-login",
  },
};
```

**After:**

```typescript
export const SUBDOMAIN_CONFIG: Record<SubdomainType, SubdomainConfig> = {
  portal: {
    name: "portal",
    hostname: "portal.skillsome.com",
    allowedRoles: [USER_ROLE.ADMIN, USER_ROLE.PARENT, USER_ROLE.CO_PARENT],
    // ⬆️ REMOVED USER_ROLE.CHILD from portal
    defaultLoginPath: "/login",
  },
  content: {
    name: "content",
    hostname: "content.skillsome.com",
    allowedRoles: [USER_ROLE.EXPERT],
    defaultLoginPath: "/expert-login",
  },
  child: {
    name: "child",
    hostname: "child.skillsome.com",
    allowedRoles: [USER_ROLE.CHILD],
    // ⬆️ NEW: Only CHILD role allowed
    defaultLoginPath: "/child-login",
    // ⬆️ NEW: Custom login page for children
  },
};
```

**What this does:**

1. Removes CHILD from portal's `allowedRoles`
2. Creates new "child" subdomain configuration
3. Sets child.skillsome.com as hostname
4. Defines `/child-login` as the default login page

---

### Step 3: Update Role-to-Subdomain Mapping

**File:** `src/config/subdomains.ts`

**Before:**

```typescript
export const ROLE_TO_SUBDOMAIN: Record<USER_ROLE, SubdomainType> = {
  [USER_ROLE.ADMIN]: "portal",
  [USER_ROLE.PARENT]: "portal",
  [USER_ROLE.CO_PARENT]: "portal",
  [USER_ROLE.CHILD]: "portal",
  [USER_ROLE.EXPERT]: "content",
};
```

**After:**

```typescript
export const ROLE_TO_SUBDOMAIN: Record<USER_ROLE, SubdomainType> = {
  [USER_ROLE.ADMIN]: "portal",
  [USER_ROLE.PARENT]: "portal",
  [USER_ROLE.CO_PARENT]: "portal",
  [USER_ROLE.CHILD]: "child",
  // ⬆️ CHANGED: Child now goes to "child" subdomain
  [USER_ROLE.EXPERT]: "content",
};
```

**What this does:** When a CHILD user is redirected to their correct subdomain, they'll be sent to child.skillsome.com instead of portal.skillsome.com.

---

### Step 4: Update getSubdomainFromHostname() Function

**File:** `src/config/subdomains.ts`

**Before:**

```typescript
export const getSubdomainFromHostname = (hostname: string): SubdomainType => {
  const hostWithoutPort = hostname.split(":")[0];

  if (isDevelopmentEnvironment(hostname)) {
    return "portal";
  }

  const parts = hostWithoutPort.split(".");

  if (parts.length >= 2) {
    const subdomain = parts[0];

    if (subdomain === "content") {
      return "content";
    }
    if (subdomain === "portal") {
      return "portal";
    }
  }

  return "portal";
};
```

**After:**

```typescript
export const getSubdomainFromHostname = (hostname: string): SubdomainType => {
  const hostWithoutPort = hostname.split(":")[0];

  if (isDevelopmentEnvironment(hostname)) {
    return "portal";
  }

  const parts = hostWithoutPort.split(".");

  if (parts.length >= 2) {
    const subdomain = parts[0];

    if (subdomain === "content") {
      return "content";
    }
    if (subdomain === "portal") {
      return "portal";
    }
    if (subdomain === "child") {
      return "child";
      // ⬆️ NEW: Recognize "child" subdomain
    }
  }

  return "portal";
};
```

**What this does:** Enables the middleware to detect when someone is accessing child.skillsome.com.

---

### Step 5: Create Child Login Page (Optional)

**File:** `src/app/(auth)/child-login/page.tsx`

```typescript
// Create a child-friendly login page
export default function ChildLoginPage() {
  return (
    <div className="child-login-container">
      <h1>Welcome Kids!</h1>
      <p>Login to access your learning activities</p>
      {/* Child-friendly login form */}
    </div>
  );
}
```

**What this does:** Creates a custom login page for children at `/child-login` route.

**Note:** If you don't create this, you can reuse `/login` by updating `defaultLoginPath: "/login"` in Step 2.

---

### Step 6: Update Route Protection (If Needed)

**File:** `src/middleware.ts`

If children have specific routes they should access, you may want to add route-level protection:

```typescript
const CHILD_ALLOWED_ROUTES = [
  paths.ROOT_DASHBOARD, // /dashboard
  paths.ROOT_LEARNING_PROGRAMS, // /learning-programs
  // Add other child-specific routes
];

// In middleware, after Step 9 from the main flow:
if (userRole === USER_ROLE.CHILD) {
  const isAllowedRoute = CHILD_ALLOWED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  if (!isAllowedRoute) {
    // Child trying to access non-whitelisted route
    return NextResponse.redirect(new URL(paths.ROOT_DASHBOARD, request.url));
  }
}
```

**What this does:** Restricts children to only specific routes (similar to Expert whitelist).

---

### Step 7: Configure DNS

**In your DNS provider (e.g., Cloudflare, Route53):**

Add a new DNS record:

```
Type: A (or CNAME)
Name: child
Value: Your server IP (or CNAME to your server)
```

**Result:** child.skillsome.com will resolve to your Next.js server.

---

### Step 8: Update Nginx Configuration

**File:** `/etc/nginx/sites-available/skillsome.conf` (or similar)

**Add child.skillsome.com to server_name:**

```nginx
server {
    listen 443 ssl;
    server_name portal.skillsome.com content.skillsome.com child.skillsome.com;
    # ⬆️ Add child.skillsome.com here

    # SSL certificates
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Restart Nginx:**

```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

### Step 9: Test the New Subdomain

#### Test 1: Child User Journey

```
1. Navigate to: child.skillsome.com
2. Should redirect to: child.skillsome.com/child-login
3. Login with child credentials (role: CHILD)
4. Should access: child.skillsome.com/dashboard
```

#### Test 2: Child Accessing Wrong Subdomain

```
1. Child user navigates to: portal.skillsome.com/dashboard
2. Middleware detects: subdomain=portal, role=CHILD
3. CHILD not in portal's allowedRoles
4. Redirects to: child.skillsome.com/dashboard
```

#### Test 3: Parent Cannot Access Child Subdomain

```
1. Parent user navigates to: child.skillsome.com/dashboard
2. Middleware detects: subdomain=child, role=PARENT
3. PARENT not in child's allowedRoles
4. Redirects to: portal.skillsome.com/dashboard
```

---

### Complete Flow After Adding Child Subdomain

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Roles                                │
├─────────────────────────────────────────────────────────────────┤
│ ADMIN       →  portal.skillsome.com                             │
│ PARENT      →  portal.skillsome.com                             │
│ CO_PARENT   →  portal.skillsome.com                             │
│ CHILD       →  child.skillsome.com   ← NEW                      │
│ EXPERT      →  content.skillsome.com                            │
└─────────────────────────────────────────────────────────────────┘
```

---

### Updated Access Control Matrix

| User Role     | Portal Access | Content Access | Child Access | Default Login        |
| ------------- | ------------- | -------------- | ------------ | -------------------- |
| **ADMIN**     | ✅ YES        | ❌ NO          | ❌ NO        | `/login`             |
| **PARENT**    | ✅ YES        | ❌ NO          | ❌ NO        | `/login`             |
| **CO_PARENT** | ✅ YES        | ❌ NO          | ❌ NO        | `/login`             |
| **CHILD**     | ❌ NO         | ❌ NO          | ✅ YES       | `/child-login` (NEW) |
| **EXPERT**    | ❌ NO         | ✅ YES         | ❌ NO        | `/expert-login`      |

---

### What Happens Now?

#### Scenario: Child Login Flow

```
Step 1: Child navigates to child.skillsome.com
    ↓
Step 2: Middleware detects subdomain="child", no token
    ↓
Step 3: Redirect to child.skillsome.com/child-login
    ↓
Step 4: Child enters credentials, gets token with role="CHILD"
    ↓
Step 5: Redirect to child.skillsome.com/dashboard
    ↓
Step 6: Middleware allows access (CHILD allowed on "child" subdomain)
    ↓
Step 7: Child sees their dashboard
```

#### Scenario: Child Tries Portal

```
Step 1: Child (logged in) clicks link to portal.skillsome.com/dashboard
    ↓
Step 2: Middleware detects subdomain="portal", role="CHILD"
    ↓
Step 3: Check: Is CHILD in portal's allowedRoles? NO
    ↓
Step 4: Find correct subdomain for CHILD → "child"
    ↓
Step 5: Redirect to child.skillsome.com/dashboard
    ↓
Step 6: Child stays on child subdomain
```

---

### Summary of Changes

**Files Modified:**

1. ✅ `src/config/subdomains.ts` - Added child subdomain config
2. ✅ `src/middleware.ts` - No changes needed (already supports new subdomains)
3. ✅ `src/app/(auth)/child-login/page.tsx` - Created new login page (optional)

**Infrastructure:**

1. ✅ DNS - Added child.skillsome.com A/CNAME record
2. ✅ Nginx - Added child.skillsome.com to server_name

**That's it!** The middleware automatically handles the new subdomain because it's configuration-driven. You just need to:

1. Update the config
2. Set up DNS
3. Configure Nginx
4. Deploy

**No middleware logic changes required** - the existing code automatically adapts to the new configuration.

---

## Summary

**You don't need to change your folder structure at all!**

The subdomain system works like this:

- **Same app, same routes, different access rules**
- **Middleware acts as a smart router** that checks user role + subdomain
- **Expert role** → Forced to use `content.skillsome.com`
- **Child role** → Forced to use `child.skillsome.com` (if configured)
- **Other roles** → Forced to use `portal.skillsome.com`
- If anyone tries to access the wrong subdomain, they're automatically redirected
