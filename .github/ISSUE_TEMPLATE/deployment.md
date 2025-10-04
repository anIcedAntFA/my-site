---
name: 🚀 Deployment Issue
about: Report issues with deployments to Cloudflare Pages
title: '[DEPLOY] '
labels: ['deployment', 'cloudflare', 'needs triage']
assignees: ''
---

## 🚀 Deployment Issue

### Issue Type
<!-- Select the type of deployment issue -->

- [ ] 🔴 Build failure
- [ ] ⚡ Performance issue
- [ ] 🔧 Configuration problem
- [ ] 🌐 Domain/DNS issue
- [ ] 📦 Asset loading issue
- [ ] 🔄 CI/CD pipeline failure
- [ ] 📊 Analytics/monitoring issue

## 📍 Environment Details

### Deployment Target
- **Platform**: Cloudflare Pages
- **Branch**: <!-- e.g., main, develop, feature/xyz -->
- **Commit SHA**: <!-- Last deployed commit -->
- **Deployment URL**: <!-- Preview or production URL -->

### Build Information
- **Build ID**: <!-- Cloudflare build ID if available -->
- **Build time**: <!-- When the build was triggered -->
- **Build status**: <!-- Success/Failed/In Progress -->

## 📝 Problem Description
<!-- Describe the deployment issue in detail -->

### What Happened
<!-- Clear description of the issue -->

### Expected Behavior
<!-- What should have happened instead -->

## 🔍 Error Details

### Build Logs
<!-- Paste relevant build logs or error messages -->

```bash
# Paste build error logs here
```

### Browser Console
<!-- Any client-side errors after deployment -->

```javascript
// Paste console errors here
```

### Network Issues
<!-- Any 404s, 500s, or loading issues -->

- **Status code**: <!-- HTTP status -->
- **Failed resources**: <!-- URLs that fail to load -->
- **Response time**: <!-- If performance related -->

## 🛠️ Technical Context

### Recent Changes
<!-- What changed since the last successful deployment? -->

- [ ] Code changes
- [ ] Dependencies updated
- [ ] Configuration changes
- [ ] Environment variables
- [ ] Build process modifications

### Affected Components
<!-- Which parts of the application are affected? -->

- [ ] Astro pages/components
- [ ] Qwik interactive components
- [ ] Panda CSS styles
- [ ] Static assets
- [ ] API routes
- [ ] Environment variables
- [ ] Cloudflare Workers/Functions

## 🔄 Steps to Reproduce
<!-- How can someone else reproduce this issue? -->

1. Navigate to [URL]
2. Perform action: ...
3. Observe: ...

## 🌐 Browser/Device Information
<!-- Where does the issue occur? -->

### Browsers Tested
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Devices Tested
- [ ] Desktop
- [ ] Mobile
- [ ] Tablet

### Geographic Location
<!-- Does the issue occur in specific regions? -->
- **Location**: <!-- Your location when testing -->
- **CDN Edge**: <!-- If known -->

## 📊 Impact Assessment

### Severity Level
- [ ] 🔴 Critical (site completely down)
- [ ] 🟠 High (major functionality broken)
- [ ] 🟡 Medium (some features affected)
- [ ] 🟢 Low (minor issues)

### User Impact
- [ ] All users affected
- [ ] Specific user groups
- [ ] Geographic regions
- [ ] Specific browsers/devices

## 🔧 Troubleshooting Attempted
<!-- What have you already tried? -->

- [ ] Redeployed the same commit
- [ ] Checked environment variables
- [ ] Verified build configuration
- [ ] Tested locally (`bun run preview`)
- [ ] Checked Cloudflare dashboard
- [ ] Reviewed recent changes
- [ ] Cleared browser cache

## 📚 Configuration Files
<!-- Share relevant configuration if needed -->

### Wrangler Configuration
<!-- If the issue might be configuration-related -->

```jsonc
// Paste relevant wrangler.jsonc content
```

### Environment Variables
<!-- List any new or changed environment variables (DO NOT include values) -->

- `VAR_NAME`: Description of purpose
- `ANOTHER_VAR`: Description of purpose

## 🔗 Related Information
<!-- Additional context that might help -->

### Links
- **Deployment URL**: [URL if accessible]
- **Build logs**: [Link to Cloudflare dashboard]
- **Related issues**: #issue_number

### Similar Issues
<!-- Have you seen this before? -->
- [ ] This is a recurring issue
- [ ] This is the first time seeing this
- [ ] Similar to previous issue: #issue_number

## ✅ Acceptance Criteria
<!-- What does "resolved" look like? -->

- [ ] Build completes successfully
- [ ] Site loads correctly in all browsers
- [ ] All features work as expected
- [ ] Performance is acceptable
- [ ] No console errors
- [ ] Assets load properly

## 🚨 Urgency & Next Steps
<!-- How urgent is this issue? -->

### Timeline
- **When did this start**: <!-- Date/time -->
- **How urgent**: <!-- Immediate/Today/This week/When possible -->
- **Business impact**: <!-- Any business implications -->

### Rollback Option
- [ ] Can rollback to previous deployment
- [ ] Previous deployment SHA: <!-- commit hash -->
- [ ] Rollback not possible because: <!-- reason -->
