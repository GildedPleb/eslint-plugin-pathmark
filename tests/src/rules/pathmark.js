/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/extensions */
/* eslint-disable import/default */
/* eslint-disable import/no-deprecated */
/* eslint-disable import/namespace */

import { RuleTester } from "eslint";

import { mark } from "../../../dist/helpers.js";
import rule from "../../../dist/rules/pathmark.js";

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2015, sourceType: "module" },
});

ruleTester.run("path-mark-rule", rule, {
  invalid: [
    {
      code: `let a = 1;`,
      errors: [
        {
          messageId: "includePath",
          type: "Program",
        },
      ],
      filename: "example/path.js",
      output: `// ${mark} ./example/path.js\nlet a = 1;`,
    },
    {
      code: `#! /usr/bin/env node\nconsole.log('Hello, world!');`,
      errors: [
        {
          messageId: "includePath",
          type: "Program",
        },
      ],
      filename: "example/shebang.js",
      output: `#! /usr/bin/env node\n// ${mark} ./example/shebang.js\nconsole.log('Hello, world!');`,
    },
    {
      code: `// Some random comment\nconsole.log('Hello, world!');`,
      errors: [
        {
          messageId: "includePath",
          type: "Program",
        },
      ],
      filename: "example/randomcomment.js",
      output: `// ${mark} ./example/randomcomment.js\n// Some random comment\nconsole.log('Hello, world!');`,
    },
    {
      code: `/* Multi-line comment block without #PathMark */\nconsole.log('test');`,
      errors: [
        {
          messageId: "includePath",
          type: "Program",
        },
      ],
      filename: "example/nomarkmulti.js",
      output: `// ${mark} ./example/nomarkmulti.js\n/* Multi-line comment block without #PathMark */\nconsole.log('test');`,
    },
  ],

  valid: [
    {
      code: `// ${mark} ./lib/rules/path-mark-rule.js\nlet a = 1;`,
      filename: `lib/rules/path-mark-rule.js`,
    },
    {
      code: `#! /usr/bin/env node\n// ${mark} ./example/shebang.js\nconsole.log('Hello, world!');`,
      filename: "example/shebang.js",
    },
    {
      code: `/* Multi-line comment\n * ${mark} ./example/multiline.js\n */\nconsole.log('Hello, world!');`,
      filename: "example/multiline.js",
    },
    {
      code: `// Some other comment\n// ${mark} ./example/twocomments.js\nconsole.log('Hello, world!');`,
      filename: "example/twocomments.js",
    },
    {
      code: `// Some other comment\n// customTag ./example/twocomments.js\nconsole.log('Hello, world!');`,
      filename: "example/twocomments.js",
      options: [{ tag: "customTag" }],
    },
  ],
});
