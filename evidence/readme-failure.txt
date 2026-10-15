README examples [root README.md]: total=4 executed=4 typechecked=0 illustration=0
README examples [ts/README.md]: total=101 executed=97 typechecked=4 illustration=0
README examples [ts/REFERENCE.md]: total=220 executed=205 typechecked=15 illustration=0
(node:8) ExperimentalWarning: stripTypeScriptTypes is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
TAP version 13
# Subtest: README examples
    # Subtest: root README.md — every example type-checks or is a known illustration
    ok 1 - root README.md — every example type-checks or is a known illustration
      ---
      duration_ms: 2665.249217
      type: 'test'
      ...
    # Subtest: root README.md — every runnable example executes in test mode
    ok 2 - root README.md — every runnable example executes in test mode
      ---
      duration_ms: 354.793523
      type: 'test'
      ...
    # Subtest: ts/README.md — every example type-checks or is a known illustration
    ok 3 - ts/README.md — every example type-checks or is a known illustration
      ---
      duration_ms: 3443.013785
      type: 'test'
      ...
    # Subtest: ts/README.md — every runnable example executes in test mode
    not ok 4 - ts/README.md — every runnable example executes in test mode
      ---
      duration_ms: 2149.507777
      type: 'test'
      location: '/home/shrxyeh/voxgig/resend-sdk/ts/dist-test/readme_examples.test.js:370:28'
      failureType: 'testCodeFailure'
      error: |-
        ts/README.md runnable TypeScript snippets failed to run in test mode:
        
        snippet 86 threw at runtime: ResendSDK: load: Operation "load" has no endpoint whose path parameters are all given (missing: email_id).
        
        
        1 !== 0
        
      code: 'ERR_ASSERTION'
      name: 'AssertionError'
      expected: 0
      actual: 1
      operator: 'strictEqual'
      stack: |-
        TestContext.<anonymous> (/home/shrxyeh/voxgig/resend-sdk/ts/dist-test/readme_examples.test.js:378:35)
        async Test.run (node:internal/test_runner/test:1409:7)
        async Suite.processPendingSubtests (node:internal/test_runner/test:974:7)
      ...
    # Subtest: ts/REFERENCE.md — every example type-checks or is a known illustration
    ok 5 - ts/REFERENCE.md — every example type-checks or is a known illustration
      ---
      duration_ms: 2021.093725
      type: 'test'
      ...
    # Subtest: ts/REFERENCE.md — every runnable example executes in test mode
    not ok 6 - ts/REFERENCE.md — every runnable example executes in test mode
      ---
      duration_ms: 5144.652392
      type: 'test'
      location: '/home/shrxyeh/voxgig/resend-sdk/ts/dist-test/readme_examples.test.js:370:28'
      failureType: 'testCodeFailure'
      error: |-
        ts/REFERENCE.md runnable TypeScript snippets failed to run in test mode:
        
        snippet 161 threw at runtime: ResendSDK: load: Operation "load" has no endpoint whose path parameters are all given (missing: email_id).
        
        
        1 !== 0
        
      code: 'ERR_ASSERTION'
      name: 'AssertionError'
      expected: 0
      actual: 1
      operator: 'strictEqual'
      stack: |-
        TestContext.<anonymous> (/home/shrxyeh/voxgig/resend-sdk/ts/dist-test/readme_examples.test.js:378:35)
        async Test.run (node:internal/test_runner/test:1409:7)
        async Suite.processPendingSubtests (node:internal/test_runner/test:974:7)
      ...
    1..6
not ok 1 - README examples
  ---
  duration_ms: 15782.058578
  type: 'suite'
  location: '/home/shrxyeh/voxgig/resend-sdk/ts/dist-test/readme_examples.test.js:323:26'
  failureType: 'subtestsFailed'
  error: '2 subtests failed'
  code: 'ERR_TEST_FAILURE'
  ...
1..1
# tests 6
# suites 1
# pass 4
# fail 2
# cancelled 0
# skipped 0
# todo 0
# duration_ms 16022.769027
