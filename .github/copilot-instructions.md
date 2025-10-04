# Copilot Instructions for my-site

## Architecture Overview

This is an **Astro + Qwik + Panda CSS** hybrid site deployed to **Cloudflare Pages**. The unique architecture combines:
- **Astro** for static site generation and component orchestration
- **Qwik** for reactive components with resumability (see `src/components/sonehayhoi.tsx`)
- **Panda CSS** for design system and atomic CSS generation
- **Cloudflare adapter** for edge deployment with platform proxy enabled

## Key Development Patterns

### Styling Architecture
- **Panda CSS** generates atomic styles in `styled-system/` (git-ignored, regenerated)
- Import from `@styled-system/jsx` for styled components: `import { Square, styled } from '@styled-system/jsx'`
- Import patterns from `styled-system/patterns`: `import { stack } from '../../styled-system/patterns'`
- Global styles entry: `src/styles/panda.css` (imported in `Layout.astro`)
- Run `bun run panda:gen` to regenerate styles after config changes

### Component Patterns
- **Astro components**: Use `.astro` extension, server-rendered by default
- **Qwik components**: Use `.tsx` with `component$()` and signals for reactivity
- **Mixed usage**: Qwik components can be embedded in Astro pages (see `index.astro`)
- **Signal pattern**: `useSignal()` for reactive state, `onClick$()` for event handlers

### File Organization
```
src/
├── components/     # Reusable components (.astro, .tsx)
├── layouts/        # Page layouts (Layout.astro)
├── pages/          # File-based routing
├── styles/         # Global styles (panda.css entry point)
└── assets/         # Static assets
```

## Critical Development Commands

```bash
# Development
bun run dev                 # Start dev server (localhost:4321)
bun run preview            # Build + preview with Wrangler

# Styling
bun run panda:gen          # Regenerate Panda CSS system
bun run panda:jsx          # Clean regeneration

# Deployment
bun run deploy             # Build + deploy to Cloudflare Pages
bun run cf-typegen         # Generate Cloudflare types

# Quality Assurance
bun run check:types        # Astro type checking
bun run lint / lint:fix    # ESLint with Astro/Qwik rules
bun run format / format:fix # Prettier formatting
bun run secrets:scan       # Gitleaks security scan
```

## Cloudflare Integration

- **Adapter**: `@astrojs/cloudflare` with platform proxy for local development
- **Config**: `wrangler.jsonc` defines Pages deployment settings
- **Types**: Run `bun run cf-typegen` to generate Cloudflare runtime types
- **Platform features**: Enable nodejs_compat, observability configured

## Git Workflow & Quality Gates

**Lefthook** manages git hooks with parallel execution:
- **pre-commit**: Format check, lint, type check
- **pre-push**: Gitleaks security scan, branch name validation
- **commit-msg**: Commitlint validation

**Branch naming**: Must follow pattern `^(main|develop){1}$|^(feat|fix|hotfix|release)/.+$`

## Dependencies Management

- **Runtime**: Bun as package manager and runtime
- **Framework stack**: Astro 5.x + Qwik 1.x + Panda CSS 1.x
- **Cloudflare**: Full integration with Pages, Workers compatibility
- **Dev tools**: ESLint (custom config), Prettier, TypeScript strict mode

## Configuration Files Hierarchy

1. **astro.config.mjs**: Cloudflare adapter + Qwik integration
2. **panda.config.ts**: CSS system with Qwik JSX framework
3. **wrangler.jsonc**: Cloudflare Pages deployment
4. **lefthook.yml**: Git hooks automation
5. **eslint.config.mjs**: Multi-framework linting (Astro + Qwik + Panda)

## Common Gotchas

- **Styled-system imports**: Always import from generated `styled-system/` paths, never edit directly
- **Qwik patterns**: Use `component$()`, `useSignal()`, and `$` suffix for serializable functions
- **Astro-Qwik boundary**: Astro handles routing/SSG, Qwik handles client interactivity
- **Panda regeneration**: Run `panda:gen` after config changes or style inconsistencies
