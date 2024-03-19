// PathMark: ./tests/src/rules/eof.js
/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/extensions */
/* eslint-disable import/default */
/* eslint-disable import/no-deprecated */
/* eslint-disable import/namespace */
import { RuleTester } from "eslint";

import rule from "../../../dist/rules/eof.js";

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2015, sourceType: "module" },
});

ruleTester.run("validate-eof-tag", rule, {
  invalid: [
    {
      code: `let a = 1;`,
      errors: [{ data: { tag: "eof" }, messageId: "missingTag" }],
      options: [{ tag: "eof" }],
      output: `let a = 1;\n// eof\n`,
    },
    {
      code: `let a = 1;\n// EOF\n// Last Comment`,
      errors: [{ data: { tag: "EOF" }, messageId: "lastInFile" }],
      options: [],
      output: `let a = 1;\n\n// Last Comment\n// EOF\n`,
    },
    {
      code: `let a = 1;`,
      errors: [{ data: { tag: "EOF" }, messageId: "missingTag" }],
      options: [{ tag: "EOF" }],
      output: `let a = 1;\n// EOF\n`,
    },
    {
      code: `function test() {}\n// eof`,
      errors: [{ data: { tag: "customTag" }, messageId: "missingTag" }],
      options: [{ tag: "customTag" }],
      output: `function test() {}\n// eof\n// customTag\n`,
    },
    {
      code: `// EOF\nfunction test() {}\n`,
      errors: [{ messageId: "lastInFile" }],
      options: [],
      output: `\nfunction test() {}\n// EOF\n`,
    },
    {
      code: `// EOF\n// EOF\nfunction test() {}\n`,
      errors: [{ messageId: "lastInFile" }, { messageId: "lastInFile" }],
      options: [],
      output: `\n// EOF\nfunction test() {}\n// EOF\n`,
    },
  ],
  valid: [
    {
      code: `let a = 1;\n// eof\n`,
      options: [{ tag: "eof" }],
    },
    {
      code: `let a = 1;\n// EOF\n`,
    },
    {
      code: `function test1() {}\n// customTag\n`,
      options: [{ tag: "customTag" }],
    },
    {
      code: `function test2() {}\n// EOF`,
    },
    {
      code: `function test() {}\n// EOF extra text\n`,
    },
    {
      code: `function test() {}\n/* EOF extra text */\n`,
    },
    {
      code: `function test() {}\n/* EOF */\n`,
    },
    {
      code: `function test() {}\n/*\n  EOF\n*/\n`,
    },
    {
      code: `function test() {}\n/*\n  EOF\n    */\n`,
    },
  ],
});
// EOF
