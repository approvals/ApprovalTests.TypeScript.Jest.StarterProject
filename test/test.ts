import { describe, test } from "@jest/globals";
import { verify, verifyAsJson } from "./JestApprovals";

describe("ApprovalTests", () => {
   test("SimpleVerify", () => {
     const data = {name:"fred", age: 30}
     verifyAsJson(data);
   });
});
