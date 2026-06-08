import { writeFileSync } from 'node:fs'

const required = ['ADMIN_USERNAME', 'ADMIN_PASSWORD', 'SESSION_SECRET']
const missing = required.filter((key) => !process.env[key] || process.env[key].trim() === '')

if (missing.length > 0) {
  console.error(`Missing required Cloudflare build variables: ${missing.join(', ')}`)
  console.error('Set them in Cloudflare build variables/secrets, or in your local shell before deploy.')
  process.exit(1)
}

if (process.env.SESSION_SECRET.length < 32) {
  console.error('SESSION_SECRET must be at least 32 characters long.')
  process.exit(1)
}

const escapeEnvValue = (value) => JSON.stringify(value)
const content = required
  .map((key) => `${key}=${escapeEnvValue(process.env[key])}`)
  .join('\n') + '\n'

writeFileSync('.env.production', content, { mode: 0o600 })
console.log('Created .env.production for wrangler --secrets-file')
