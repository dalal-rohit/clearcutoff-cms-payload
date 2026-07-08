#!/bin/sh
set -e

echo "Running database migrations..."
node_modules/.bin/payload migrate

echo "Starting server..."
exec node_modules/.bin/next start -H 0.0.0.0 -p "${PORT:-3000}"
