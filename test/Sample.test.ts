import { beforeAll, describe, expect, test } from "@jest/globals";

import {verify, verifyAsJson} from "approvals/lib/Providers/Jest/JestApprovals";
import {configure} from "approvals/lib/config";
import {JestReporter} from "approvals/lib/Providers/Jest/JestReporter";


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
