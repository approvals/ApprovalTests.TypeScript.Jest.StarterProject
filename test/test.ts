import { describe, expect, test } from "@jest/globals";
import { verify, verifyAsJson } from "./JestApprovals";
import { convertToFilename } from "./JestNamer";

describe("ApprovalTests", () => {
   test("SimpleVerify", () => {
     verifyAsJson("Hello From Approvals");
   });
  test("JsonVerify", () => {
    const data = {name:"fred", age: 30}
    verifyAsJson(data);
  });
});
