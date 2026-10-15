import assert from 'node:assert/strict'
import { createRequire } from 'node:module'

if (!process.env.RESEND_API_KEY) {
  console.error('Set RESEND_API_KEY in .env.local, then run node --env-file=.env.local examples/list-domains.mjs')
  process.exit(1)
}

const require = createRequire(import.meta.url)
const { ResendSDK } = require('../ts/dist/ResendSDK.js')
const client = new ResendSDK({
  apikey: process.env.RESEND_API_KEY,
  headers: { 'User-Agent': 'shrxyeh-resend-sdk/0.0.1' },
  allow: { method: 'GET' },
})

try {
  const explain = {}
  const domains = await client.Domain().list(
    { limit: 5 },
    { signal: AbortSignal.timeout(15_000), explain },
  )
  assert.equal(explain.result?.status, 200, 'Expected HTTP 200')
  const body = explain.result?.body
  assert.equal(body?.object, 'list', 'Expected list response object')
  assert.equal(typeof body?.has_more, 'boolean', 'Expected pagination flag')
  assert.ok(Array.isArray(body?.data), 'Expected response data array')
  assert.ok(Array.isArray(domains), 'Expected a list of domains')
  assert.equal(domains.length, body.data.length, 'Expected one entity per returned domain')
  for (const domain of domains) {
    const record = domain.data()
    assert.equal(typeof record.id, 'string', 'Expected domain.id')
    assert.equal(typeof record.name, 'string', 'Expected domain.name')
    assert.equal(typeof record.status, 'string', 'Expected domain.status')
  }
  console.log(JSON.stringify({
    test: 'authenticated GET /domains',
    result: 'passed',
    returnedDomains: domains.length,
  }))
} catch (error) {
  console.error(`Live domain-list test failed (HTTP ${error?.status ?? 'unavailable'}).`)
  if (error instanceof assert.AssertionError) console.error(error.message)
  process.exitCode = 1
}
