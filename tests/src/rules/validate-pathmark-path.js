// PathMark: ./tests/src/rules/validate-pathmark-path.js
/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/extensions */
/* eslint-disable import/default */
/* eslint-disable import/no-deprecated */
/* eslint-disable import/namespace */

import { RuleTester } from "eslint";

import rule from "../../../dist/rules/validate-pathmark-path.js";

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2015, sourceType: "module" },
});
ruleTester.run("validate-pathmark-path", rule, {
  invalid: [
    {
      code: `// #PathMark: ./wrong/path/MyComponent.js\nconsole.log('Hello World');`,
      errors: [{ messageId: "incorrectPath" }],
      filename: "src/components/MyComponent.js",
      output: `// #PathMark: ./src/components/MyComponent.js\nconsole.log('Hello World');`,
    },
    {
      code: `// #PathMark: wrong/path/MyComponent.js\nconsole.log('Hello World');`,
      errors: [{ messageId: "incorrectPath" }],
      filename: "src/components/MyComponent.js",
      output: `// #PathMark: ./src/components/MyComponent.js\nconsole.log('Hello World');`,
    },
    {
      code: `/* #PathMark: ./src/wrongPath.js */\nexport default {};`,
      errors: [{ messageId: "incorrectPath" }],
      filename: "src/correctPath.js",
      output: `/* #PathMark: ./src/correctPath.js */\nexport default {};`,
    },
    {
      code: `/*\n#PathMark: ./src/wrongPath.js\n*/\nexport default {};`,
      errors: [{ messageId: "incorrectPath" }],
      filename: "src/correctPath.js",
      output: `/*\n#PathMark: ./src/correctPath.js\n*/\nexport default {};`,
    },
    {
      code: `/*\n#PathMark: ./src/wrongPath.js trixy\n*/\nexport default {};`,
      errors: [{ messageId: "incorrectPath" }],
      filename: "src/correctPath.js",
      output: `/*\n#PathMark: ./src/correctPath.js trixy\n*/\nexport default {};`,
    },
    {
      code: `/*\n  #PathMark: ./src/wrongPath.js trixy\n*/\nexport default {};`,
      errors: [{ messageId: "incorrectPath" }],
      filename: "src/correctPath.js",
      output: `/*\n  #PathMark: ./src/correctPath.js trixy\n*/\nexport default {};`,
    },
  ],
  valid: [
    {
      code: `// #PathMark: ./src/components/MyComponent.js\nconsole.log('Hello World');`,
      filename: "src/components/MyComponent.js",
    },
    {
      code: `/* #PathMark: ./src/utils/util.js */\nexport const util = () => {};`,
      filename: "src/utils/util.js",
    },
    {
      code: `/* #PathMark: ./src/correctPath.js other info */\nexport default {};`,
      filename: "src/correctPath.js",
    },
    {
      code: `/* leading info #PathMark: ./src/correctPath.js other info */\nexport default {};`,
      filename: "src/correctPath.js",
    },
    {
      code: `// leading info #PathMark: ./src/correctPath.js other info \nexport default {};`,
      filename: "src/correctPath.js",
    },
  ],
});
// EOF
