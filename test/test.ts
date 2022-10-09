import { describe, expect, test } from "@jest/globals";
import path from "path";
import { getConfig,  verifyWithControl } from "approvals";
import StringWriter from "approvals/lib/StringWriter"
import Namer from "approvals/lib/Namer"

function verify(sut: string) {
  const state = expect.getState();
  const config = getConfig();
  config.reporters = ["diffmerge"];
  const writer = new StringWriter(config, sut, ".txt");
  const testPath = path.dirname(state.testPath as string);
  const namer = new Namer(testPath, state.currentTestName);
  verifyWithControl(namer, writer, null, config);
}

describe("ApprovalTests", () => {
   test("SimpleVerify", () => {
     const data = {name:"fred", age: 30}
     const sut = JSON.stringify(data, null, "  ");
     verify(sut);
   });
});
