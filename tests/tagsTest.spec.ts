import { test, expect } from "@playwright/test";

test("Login Page Test @smoke", async ({}) => {
  console.log("This is a Login Page Test");
});

test("Home Page Test @sanity", async ({}) => {
  console.log("This is a Home Page Test");
});

test("Payment Page Test @regression", async ({}) => {
  console.log("This is a Payment Page Test");
});

/*
 * to add this tags we need to add them in the playwright configuration
 * after use sections -- grep option after use
 * grep: [new RegExp("@smoke")], in that order we are saying that should run
 * only smoke tests cases
 *   grep: [
    new RegExp("@smoke"),
    new RegExp("@sanity"),
    new RegExp("@regression"),
  ],
  * grepInvert will run the other test cthat doesnt contain the tags
 */
test("Checkout Page Test @regression", async ({}) => {
  console.log("This is a Checkout Page Test");
});
