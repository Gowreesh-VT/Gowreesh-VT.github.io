# Multi-Site Firebase Hosting Setup Guide

## Overview
This portfolio project uses Firebase Hosting's multi-site feature to host multiple projects under one domain with path-based routing.

## Current Site Structure

### Main Portfolio Site
- **Site ID**: `gowreesh-portfolio`
- **URL**: https://gowreesh-portfolio.web.app
- **Custom Domain**: gowreesh.works
- **Repository**: This repo (Gowreesh-VT.github.io)

### Project Sites (Separate Repositories)
1. **SmartLinx Living**
   - Site ID: `smartlinx-living`
   - Direct URL: https://smartlinx-living.web.app
   - Path URL: https://gowreesh.works/smartlinxliving
   
2. **Netflix Clone**
   - Site ID: `gowreesh-netflix`
   - Direct URL: https://gowreesh-netflix.web.app
   - Path URL: https://gowreesh.works/Netflix
   
3. **BB84 Simulation**
   - Site ID: `bb84-simulation`
   - Direct URL: https://bb84-simulation.web.app
   - Path URL: https://gowreesh.works/bb84

4. **LumiLink**
   - Site ID: `lumi-link`
   - Direct URL: https://lumi-link.web.app

5. **RAS Medical Chatbot**
   - Site ID: `ras-medical-chatbot`
   - Direct URL: https://ras-medical-chatbot.web.app

---

## Setup for Project Repositories

### Step 1: In Each Project Repository

Create `firebase.json`:
```json
{
  "hosting": {
    "site": "SITE-ID-HERE",
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
```

Create `.firebaserc`:
```json
{
  "projects": {
    "default": "gowreesh-portfolio"
  }
}
```

Replace `SITE-ID-HERE` with the appropriate site ID:
- SmartLinx Living: `smartlinx-living`
- Netflix Clone: `gowreesh-netflix`
- BB84: `bb84-simulation`
- LumiLink: `lumi-link`
- RAS Chatbot: `ras-medical-chatbot`

### Step 2: Deploy Each Project

From each project repository:
```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase (one-time)
firebase login

# Deploy the project
firebase deploy --only hosting
```

---

## Setting Up Path-Based Routing (Custom Domain)

To make projects accessible via `gowreesh.works/projectname`, you need to:

### Option 1: Using Firebase Rewrites (Current Setup)
The main portfolio's `firebase.json` already includes rewrites for projects in this repo.

### Option 2: Using Custom Domain with Path Mapping

1. Go to Firebase Console → Hosting
2. For each site, click "Add custom domain"
3. Add subdomain mapping:
   - `smartlinxliving.gowreesh.works` → `smartlinx-living` site
   - `netflix.gowreesh.works` → `gowreesh-netflix` site
   - etc.

4. Then use URL rewrites in your main domain's hosting config.

### Option 3: Using Cloudflare Workers/Rules
If you're using Cloudflare for DNS:
1. Create a Worker or Page Rule
2. Map paths to subdomain URLs:
   ```javascript
   gowreesh.works/smartlinxliving/* → smartlinx-living.web.app/*
   ```

---

## Current Deployment Commands

### Deploy Main Portfolio Only
```bash
firebase deploy --only hosting:portfolio
```

### Deploy All Sites
```bash
firebase deploy --only hosting
```

### Deploy Specific Project (from its repository)
```bash
cd /path/to/smartlinx-repo
firebase deploy --only hosting
```

---

## Managing Sites

### List all hosting sites
```bash
firebase hosting:sites:list
```

### Create a new site
```bash
firebase hosting:sites:create NEW-SITE-ID
```

### Delete a site
```bash
firebase hosting:sites:delete SITE-ID
```

---

## Repository Structure

```
Portfolio Repo (this one)
├── index.html (main portfolio)
├── css/
├── js/
├── images/
└── firebase.json (configured for portfolio target)

SmartLinx Repo (separate)
├── index.html
├── css/
└── firebase.json (configured for smartlinx-living site)

Netflix Repo (separate)
├── in/index.html
└── firebase.json (configured for gowreesh-netflix site)

... and so on for each project
```

---

## Benefits of This Setup

✅ **Smaller Portfolio Repo**: Main portfolio is lightweight  
✅ **Independent Deployments**: Deploy projects separately  
✅ **Version Control**: Each project has its own git history  
✅ **Faster Builds**: Only deploy what changed  
✅ **Better Organization**: Clear separation of concerns  
✅ **Subdomain Access**: Each project gets its own URL  
✅ **Path Access**: Still accessible via main domain paths  

---

## Troubleshooting

### Project not accessible via path
- Check Firebase Console → Hosting → Site settings
- Verify rewrites in main portfolio's `firebase.json`
- Check if custom domain is properly connected

### Deployment fails
- Ensure you're logged in: `firebase login`
- Check project ID in `.firebaserc`
- Verify site ID exists: `firebase hosting:sites:list`

### Path shows 404
- Deploy the specific site first
- Then update main portfolio's `firebase.json` rewrites
- Deploy main portfolio

---

## Next Steps

1. ✅ Main portfolio setup complete
2. ⏳ Create separate repositories for each project
3. ⏳ Add `firebase.json` and `.firebaserc` to each
4. ⏳ Deploy each project individually
5. ⏳ Set up custom domain path mapping
6. ⏳ Test all URLs
