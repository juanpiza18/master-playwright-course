import { test, expect } from "@playwright/test";
// With this annotation the test will be excluded and not executed
// Also the test will be marked as "Skipped"
test.skip("Skipped Test", async ({}) => {
  console.log("I am Skipped Test");
});

// With this annotation one part of the test won't be executed
// example webkit mac os browser it is not supported.
test("Skipped in Webkit - SO the test won't be executed", async ({
  browserName,
}) => {
  test.skip(
    browserName === "webkit",
    "This feature is not implemented for MAC"
  );
});

test("Not yet Ready Test", async ({}) => {
  test.fail();
});

test("fail with condition", async ({ browserName }) => {
  test.skip(
    browserName === "webkit",
    "This feature is not implemented for MAC"
  );
  console.log("I am fail in webkit");
});

test.fixme("fix me test", async ({}) => {
  console.log("I am a fix me test");
});

// Timeout will be triplicated
test("Slow test", async ({}) => {
  console.log("I am a slow me test");
  test.slow();
});

// Timeout will be triplicated
test("Slow test condition", async ({ browserName }) => {
  test.slow(
    browserName === "webkit",
    "This feature is not implemented for MAC"
  );
});

/* for running only one test we need to add this commnd test.only 
test.only("Only test", async ({ browserName }) => {
  console.log("I am Only Test");
});
*/
