import {describe, expect, test} from '@jest/globals';
import path from "path";
const approvalsConfig = {
  reporters: ['beyondcompare', 'kdiff3', 'vscode'],

  normalizeLineEndingsTo: '\n',

  appendEOL: true,

  EOL: "\n",

  errorOnStaleApprovedFiles: true,

  shouldIgnoreStaleApprovedFile: function (/*fileName*/) { return false; },

  stripBOM: true,

  forceApproveAll: false
}
const approvals = require('approvals').configure(approvalsConfig);

const basePath = path.join(process.cwd(), 'test/');

function verify(name:string, situationUnderTest:()=>any) {
  test(name, function() {
    const result = situationUnderTest();
    approvals.verify(basePath, name, JSON.stringify(result))
  });
}
describe("something", () => {
  verify("does something", () => {
    return {name:"fred", age: 30}
  });
});
