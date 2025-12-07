/**
 * Script to verify the existing database table structure
 * Run with: npx tsx scripts/verify-table.ts
 */
import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sql = neon(connectionString);

async function verifyTable() {
  try {
    // Check if Post table exists (case-sensitive)
    const postTableCheck = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('Post', 'post')
    `;
    
    console.log('Found tables:', postTableCheck);
    
    if (postTableCheck.length === 0) {
      console.log('No Post table found. Checking all tables...');
      const allTables = await sql`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `;
      console.log('All tables:', allTables);
      return;
    }
    
    const tableName = postTableCheck[0].table_name;
    console.log(`\nTable name: ${tableName}`);
    
    // Get column information
    const columns = await sql`
      SELECT 
        column_name,
        data_type,
        is_nullable,
        column_default
      FROM information_schema.columns
      WHERE table_schema = 'public' 
      AND table_name = ${tableName}
      ORDER BY ordinal_position
    `;
    
    console.log('\nColumns:');
    columns.forEach((col: any) => {
      console.log(`  - ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable}, default: ${col.column_default || 'none'})`);
    });
    
    // Get row count - need to quote table name for case-sensitive names
    // Using string interpolation with proper SQL identifier quoting
    const quotedTableName = `"${tableName}"`;
    const countQuery = `SELECT COUNT(*) as count FROM ${quotedTableName}`;
    const countResult = await sql(countQuery);
    console.log(`\nRow count: ${countResult[0].count}`);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

verifyTable();
