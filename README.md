# Resend SDK

An unofficial TypeScript SDK for the Resend API, built with the
[Voxgig SDK generator](https://voxgig.com/sdk) from Resend's OpenAPI specification.
This project was created by Shreyash Naik as a developer relations exercise.

The SDK generates typed clients for resources such as domains, contacts, and
emails. The [report](REPORT.md) covers setup, testing, and the problems I found.

## Build and test

Use Node.js 24. The package is not published to npm; build it from source:

```sh
git clone https://github.com/shrxyeh/resend-sdk.git
cd resend-sdk
nvm use
cd ts
npm ci
npm run build
npm test
cd ..
```

If you do not use nvm, install Node.js 24 through your usual version manager.
`npm test` builds the SDK and runs the offline tests without an API key.

The recorded run passed **140 of 142 test files**. Two generated tests fail:
one checks attachment examples with missing parent identifiers, and the other
checks suppression deletion without the required parameter. The failures remain
visible in CI. See [REPORT.md](REPORT.md) for details and reproduction commands.

## Quickstart

Create a [Resend account](https://resend.com/signup) and an API key with
**Full access**. A sending-only key cannot list domains.

From the repository root, copy `.env.example` to `.env.local` if you have not
already created it, then set `RESEND_API_KEY` in that file. `.env.local` is ignored
by Git; `.env.example` contains only the variable name.

```sh
node --env-file=.env.local examples/list-domains.mjs
```

The example makes one `GET /domains` request, checks the response, and prints the
number of domains. An empty list is normal for a new account. It does not send
email. This live request succeeded during the evaluation; other endpoints and
pagination across multiple pages have not been tested against the live API.

The client call looks like this after building:

```ts
import { ResendSDK } from './ts/dist/ResendSDK.js'

const client = new ResendSDK({
  apikey: process.env.RESEND_API_KEY,
  allow: { method: 'GET' },
})

const domains = await client.Domain().list({ limit: 5 })
console.log(domains.map((domain) => domain.data()))
```

The SDK receives the key through its `apikey` option. It does not load an env
file itself. Some generated examples use `RESEND_APIKEY`; the example in this
repository uses `RESEND_API_KEY`.

## Regenerate the SDK

The source under `ts/` is generated. Make SDK changes in `.sdk/model/`,
`.sdk/tm/`, or `.sdk/src/cmp/`, then regenerate from the repository root:

```sh
cd .sdk
npm ci
npm run generate
cd ../ts
npm test
```

Project metadata and generation settings live in
[project.aontu](.sdk/model/project.aontu). The root README and report are
maintained separately. Compiled output is rebuilt locally and excluded from Git.
The ignore rules, installation text, introduction, and Makefile are customized
in the generator sources. `voxgig-sdkgen doctor` reports these four differences
from the default scaffold; ordinary regeneration preserves them.

## Files to explore

- [ResendSDK.ts](ts/src/ResendSDK.ts): client configuration and resource access.
- [DomainEntity.ts](ts/src/entity/DomainEntity.ts): the resource used in the live example.
- [list-domains.mjs](examples/list-domains.mjs): authentication and response checks.
- [TypeScript guide](ts/README.md) and [API reference](ts/REFERENCE.md): generated usage documentation.
- [OpenAPI specification](.sdk/def/resend.yaml): input to the generator.
- [evidence/](evidence/): source provenance and recorded verification results.

## License

[MIT](LICENSE), copyright 2026 Shreyash Naik. The upstream specification retains
its [original license](third-party/resend-openapi/LICENSE).
This project is not affiliated with or endorsed by Resend.
