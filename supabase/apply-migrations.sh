#!/bin/bash

# Script to apply Supabase migrations
# This script executes all migration files in order

SUPABASE_URL="https://qxjgomwibnxkzythmdti.supabase.co"
SUPABASE_SERVICE_KEY="sb_secret_FArVZiFFp7HqIfeA3JZ-aA_NATdg9nJ"

echo "Applying Supabase migrations..."

# Execute migrations in order
for migration in supabase/migrations/*.sql; do
  echo "Applying $migration..."
  curl -X POST "$SUPABASE_URL/rest/v1/rpc/exec_sql" \
    -H "apikey: $SUPABASE_SERVICE_KEY" \
    -H "Authorization: Bearer $SUPABASE_SERVICE_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"query\": \"$(cat $migration | sed 's/"/\\"/g' | tr '\n' ' ')\"}"
  echo ""
done

echo "Migrations completed!"
