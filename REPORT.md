# Building a Resend SDK with Voxgig

Author: Shreyash Naik · Date: 15 October 2026 · Active human time: approximately **20–25 minutes**

I built an unofficial TypeScript SDK for Resend using the Voxgig SDK generator,
with an MIT license. I chose Resend because it has a free account, API-key
authentication, and an [official OpenAPI specification](https://github.com/resend/resend-openapi).
The catalogue check covered 804 repository names and descriptions and found no
Resend entry. The specification and the selection evidence are included in this
repository.

My environment started with Node.js 18, so I used Node.js 24 to match the current
generator requirements. One documentation mismatch stood out: the website still
referred to `.aon` files, while the current repository guide and generated project
used `.aontu`. Keeping those examples consistent would make setup easier to follow.

The generator produced the client, reference documentation, and offline tests.
I configured the author, copyright, and package details in the project model so
they would survive regeneration. Some generated names, such as
`AddContactToSegmentResponseSuccess`, were harder to read than `Domain`.
Shorter names would make the SDK easier to explore.

Initial generation, TypeScript compilation, and `voxgig-sdkgen doctor` all passed. I then
used my API key with the generated SDK to call `GET /domains`. It returned HTTP
200 and an empty list, which was expected for my new account. The example checks
the response structure as well as the status. This was one live read operation;
I did not test email sending, the other endpoints, or pagination across multiple
pages.

Adding a global `User-Agent` header exposed a test that expected exactly the
default headers. Moving that header into the example's client configuration
resolved the failure without changing the generated tests. It would help if
those test expectations accounted for headers added through the model.

The final offline run passed **140 of 142 test files**. Two files still failed:

- The attachment examples in the generated README and reference call
  `RetrievedAttachment().load({ id: '...' })` without a parent identifier.
  They compile, but fail at runtime because `email_id` or `receiving_id` is
  required. The examples should include one of these, and the types should
  enforce that requirement.
- The suppression test skips its delete step because the required `suppression`
  parameter is missing, then still checks that the record has disappeared.
  The generated test needs to supply the correct parameter or skip the
  dependent assertion when deletion cannot run.

I left these failures visible and recorded the reproduction steps below. The
generated tests were useful here: they caught problems that compilation alone
did not reveal. Clearer examples and consistent test generation would improve
the experience of getting a first SDK working.

I used AI assistance for research, running the tools, investigating failures,
and drafting this report. The run used Node.js 24.21.0,
`@voxgig/create-sdkgen` 0.30.7, and `@voxgig/sdkgen` 4.34.5.

The setup and live-test commands are in [README.md](README.md). I later
customized the generated documentation, ignore rules, and Makefile for this
repository; `doctor` now reports those four intentional differences from the
default scaffold.
The [verification record](evidence/verification.json) and test logs in
[`evidence/`](evidence/) document the results. After building, the two remaining
failures can be reproduced from `ts/` using Node.js 24:

```sh
node --experimental-test-isolation=none --test --test-reporter=tap dist-test/readme_examples.test.js
node --experimental-test-isolation=none --test --test-reporter=tap dist-test/entity/remove_suppression_response_success/RemoveSuppressionResponseSuccessEntity.test.js
```
