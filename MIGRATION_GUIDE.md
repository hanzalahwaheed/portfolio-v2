# Migration from Prisma to Drizzle ORM

## Important: Existing Database with Data

Since your database already contains a table with data, follow these steps carefully:

### Step 1: Verify Table Name

First, check what your actual table name is in the database:

```bash
npm run db:verify
```

This will show you:
- The actual table name (could be `Post` or `post`)
- All columns and their types
- Row count

### Step 2: Update Schema if Needed

If the table name is different from what's in `src/db/schema.ts`, update it:

- If table is `Post` (capitalized): Change `pgTable('post', ...)` to `pgTable('Post', ...)`
- If table is `post` (lowercase): Keep as `pgTable('post', ...)`

### Step 3: Sync Schema (Safe for Existing Data)

Use `db:push` which will compare your schema with the database and only make necessary changes **without dropping tables or data**:

```bash
npm install
npm run db:push
```

This command will:
- Compare your Drizzle schema with the existing database
- Show you what changes it will make
- Only add/modify columns if needed
- **Will NOT drop tables or delete data**

### Step 4: Verify Everything Works

1. Start your dev server: `npm run dev`
2. Test creating, reading, updating, and deleting posts
3. Verify your existing data is still accessible

## Alternative: Using Introspection

If you want to generate the Drizzle schema from your existing database:

```bash
npm run db:introspect
```

This will generate a schema file based on your existing database structure. However, you'll need to review and potentially adjust it.

## Notes

- The schema in `src/db/schema.ts` is based on your original Prisma schema
- Column names should match exactly (case-sensitive in PostgreSQL)
- `db:push` is safe for existing data - it won't drop tables
- If you see any warnings during `db:push`, review them carefully before proceeding
