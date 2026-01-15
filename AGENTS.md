# AGENTS.md

This file provides guidelines for agentic coding assistants working in this repository.

## Build, Lint, and Format Commands

### Development

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server

### Code Quality

- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Database Operations

- `npm run db:generate` - Generate Drizzle migrations
- `npm run db:migrate` - Apply migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio
- `npm run db:introspect` - Introspect existing database
- `npm run db:verify` - Verify database tables

### Testing

No test framework is configured. When running tests is mentioned, assume manual testing via `npm run dev`.

## Code Style Guidelines

### TypeScript Configuration

- Strict mode enabled
- Path aliases: `@/*` maps to `./src/*`
- Target: ES2017
- Module resolution: bundler

### Formatting (Prettier)

- No semicolons
- Double quotes
- Trailing commas: all
- Arrow parentheses: avoid
- Spaces: 2
- Print width: 120
- Line ending: LF

### Imports

- Use absolute imports with `@/` alias (e.g., `import { cn } from "@/lib/utils"`)
- External libraries first, then local imports
- Server actions must have `"use server"` at the top
- Client components must have `"use client"` at the top

### Naming Conventions

- **Components**: PascalCase (e.g., `BlogCard`, `AboutMe`)
- **Functions**: camelCase (e.g., `getPosts`, `createPost`)
- **Variables**: camelCase (e.g., `isLoading`, `articles`)
- **Types/Interfaces**: PascalCase (e.g., `Article`, `Post`, `WorkExperience`)
- **Constants**: camelCase (e.g., `personalDetails`, `socialLinks`)
- **Database tables**: pgTable with explicit name (e.g., `"Post"`)

### Component Structure

- Default export the main component
- Component name matches file name
- Define TypeScript interfaces for props
- Use functional components with hooks
- Use Shadcn UI components from `@/components/ui`

### Database (Drizzle ORM)

- Use `db.select().from(table).where(...)` pattern
- Import query operators: `eq`, `desc`, etc. from `drizzle-orm`
- Use `.where(eq(column, value))` for equality checks
- Use `.orderBy(desc(column))` for sorting
- Infer types from schema: `typeof table.$inferSelect`

### Server Actions

- Always verify admin access with `verifyAdmin()` before mutations
- Throw `new Error("Unauthorized")` for failed auth
- Call `revalidatePath()` after mutations
- Use `redirect()` after successful mutations
- Handle FormData with `.get()` and type assertions

### API Routes

- Use `NextRequest` and `NextResponse` from `next/server`
- Return proper status codes: 400 for bad requests, 500 for errors
- Handle errors with try/catch blocks
- Log errors with `console.error()`

### Error Handling

- Server actions: throw `Error` objects
- API routes: return `NextResponse.json({ error: "message" }, { status })`
- Client components: console.error for logging, display user-friendly messages

### Styling (Tailwind CSS)

- Use `cn()` utility for class merging
- Custom colors: `rich-black`, `gold-dust`, `olive-grey`, `turquoise`, `deep-teal`, `cream`
- Responsive design with `md:` and `lg:` prefixes
- Use hover states with `hover:` prefix
- Transitions with `transition-all duration-xxx`

### File Organization

- `app/` - Next.js App Router (routes, layouts, actions)
- `components/` - Reusable React components
- `lib/` - Utility functions and helpers
- `db/` - Database schema and connection
- `public/` - Static assets

### Special Patterns

- Configuration: All site content in `src/config.ts`
- Authentication: Cookie-based admin auth via middleware
- Environment variables: Use `process.env.VARIABLE_NAME`
- Database connection: Singleton pattern in `src/db/index.ts`

### What NOT to Do

- Do not add comments unless explicitly requested
- Do not commit secrets or `.env` files
- Do not use `any` type - use proper TypeScript types
- Do not use relative imports from parent directories
- Do not create test files without user confirmation (no test framework configured)

### Before Submitting Work

1. Run `npm run lint` - fix any issues
2. Run `npm run format` - ensure consistent formatting
3. Manually test changes with `npm run dev`
4. Verify database operations if applicable
