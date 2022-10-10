import { expect } from "@jest/globals";
import StringWriter from "approvals/lib/StringWriter";
import path from "path";
import Namer from "approvals/lib/Namer";
import { getConfig, verifyWithControl } from "approvals";

function convertToFilename(name: string) {
  const forbidden = "\\/:?\"<>|' ";
  for (let forbiddenKey of forbidden) {
    if (name.includes(forbiddenKey)){
      name = name.replace(forbiddenKey, "_")
    }
  }
  return name;
}

export function verify(sut: string) {
  const state = expect.getState();
  const config = getConfig();
  config.reporters = ["diffmerge"];
  const writer = new StringWriter(config, sut, ".txt");
  const file = path.parse(state.testPath as string);
  const testPath = file.dir;
  const testFileName = file.name;
  const testName = convertToFilename(`${testFileName}.${state.currentTestName}`);
  const namer = new Namer(testPath, testName);
  verifyWithControl(namer, writer, null, config);
}

export function verifyAsJson(data: any){
  const text = JSON.stringify(data, null, "  ");
  verify(text);
}