import { beforeAll, describe, expect, test } from "@jest/globals";
import { configure } from "approvals";
import { JestReporter } from "approvals/lib/Providers/Jest/JestReporter";
import {verify, verifyAsJson} from "approvals/lib/Providers/Jest/JestApprovals";


describe("ApprovalTests", () => {
  beforeAll(() => {
    configure({
      reporters: [new JestReporter()],
    });
  });
   test("SimpleVerify", () => {
     verify("Hello From Approvals");
   });
  test("JsonVerify", () => {
    const data = {name:"fred", age: 30}
    verifyAsJson(data);
  });
});
