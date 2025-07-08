# Plan: Convert Project to Use `/src` Folder Structure

## Current Structure Analysis
The project currently has:
- `app/` - Next.js App Router files (layout.tsx, page.tsx)
- `pages/` - Next.js Pages Router files (legacy.tsx, api/github-stars.ts)
- `shared/` - Shared utilities (fetch-github-stars.ts, gemini.tsx)
- `instrumentation.ts` & `instrumentation.node.ts` - OpenTelemetry setup (MUST stay at root)

## Target Structure
```
/src
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── pages/
│   ├── api/
│   │   └── github-stars.ts
│   └── legacy.tsx
└── shared/
    ├── fetch-github-stars.ts
    └── gemini.tsx
```

## Tasks for Sub-Agents

### Agent 1: Create `/src` Directory Structure
- Create `/src` directory
- Move `app/` folder to `/src/app/`
- Move `pages/` folder to `/src/pages/`
- Move `shared/` folder to `/src/shared/`

### Agent 2: Update Configuration Files
- Update `tsconfig.json`:
  - Change `include` from `["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"]`
  - To `["next-env.d.ts", "src/**/*.ts", "src/**/*.tsx", ".next/types/**/*.ts", "instrumentation.ts", "instrumentation.node.ts"]`
- Update `next.config.js`:
  - Add `pageExtensions: ['tsx', 'ts', 'jsx', 'js']` if needed
  - Add `experimental: { instrumentationHook: true }` if not already present

### Agent 3: Fix Import Paths
- Update `src/app/page.tsx`:
  - Change `import { fetchGithubStars } from "../shared/fetch-github-stars";` to `import { fetchGithubStars } from "@/shared/fetch-github-stars";`
  - Change `import { model } from "../shared/gemini";` to `import { model } from "@/shared/gemini";`
- Update `src/pages/api/github-stars.ts`:
  - Change `import { fetchGithubStars } from "../../shared/fetch-github-stars";` to `import { fetchGithubStars } from "@/shared/fetch-github-stars";`
- Update `src/pages/legacy.tsx`:
  - Change `import { fetchGithubStars } from "../shared/fetch-github-stars";` to `import { fetchGithubStars } from "@/shared/fetch-github-stars";`

### Agent 4: Update TypeScript Configuration for Path Mapping
- Update `tsconfig.json` to add path mapping:
  ```json
  {
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@/*": ["src/*"]
      }
    }
  }
  ```

### Agent 5: Verify and Test
- Run `npm run build` to ensure build works
- Run `npm run dev` to test development server
- Check that all imports resolve correctly
- Verify instrumentation files are still working from root

## Files That Must Stay at Root
- `instrumentation.ts` - Next.js requires this at root
- `instrumentation.node.ts` - OpenTelemetry setup, required at root
- `next.config.js` - Next.js configuration
- `package.json` - Node.js dependencies
- `tsconfig.json` - TypeScript configuration
- `.env-example` - Environment variables template
- `.gitignore` - Git ignore patterns

## Notes
- Next.js automatically recognizes the `/src` directory structure
- The instrumentation files MUST remain at the root level to work properly
- All import paths using relative imports need to be updated to use absolute imports with `@/` prefix
- The `@/` path mapping allows for cleaner imports and easier refactoring
