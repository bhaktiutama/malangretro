// Script to apply database migrations to Supabase
import { createClient } from '@supabase/supabase-js'
import { readFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const supabaseUrl = 'https://qxjgomwibnxkzythmdti.supabase.co'
const supabaseServiceKey = 'sb_secret_FArVZiFFp7HqIfeA3JZ-aA_NATdg9nJ'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function applyMigrations() {
    console.log('🚀 Starting database migrations...\n')

    const migrationsDir = join(__dirname, 'migrations')
    const migrationFiles = readdirSync(migrationsDir)
        .filter(file => file.endsWith('.sql'))
        .sort()

    for (const file of migrationFiles) {
        console.log(`📝 Applying migration: ${file}`)
        const filePath = join(migrationsDir, file)
        const sql = readFileSync(filePath, 'utf-8')

        try {
            // Execute SQL using Supabase's RPC
            const { error } = await supabase.rpc('exec_sql', { sql_query: sql })

            if (error) {
                console.error(`❌ Error in ${file}:`, error.message)
                // Continue with other migrations
            } else {
                console.log(`✅ Successfully applied ${file}\n`)
            }
        } catch (err) {
            console.error(`❌ Failed to apply ${file}:`, err.message)
        }
    }

    console.log('✨ Migration process completed!')
}

applyMigrations()
