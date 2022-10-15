import { describe, expect, test } from "@jest/globals";
import {  verifyAsJson } from "./JestApprovals";

describe("ApprovalTests", () => {
   test("SimpleVerify", () => {
     verifyAsJson("Hello From Approvals");
   });
  test("JsonVerify", () => {
    const data = {name:"fred", age: 30}
    verifyAsJson(data);
  });
});
