// PathMark: ./src/rules/pathmark.ts
import path from "node:path";

import { type TSESLint } from "@typescript-eslint/utils";

import { findProjectRoot, mark } from "../helpers.js";

const rule: TSESLint.RuleModule<"includePath", [{ tag?: string }?]> = {
  create(context) {
    const filePath = context.filename;
    const relativePath = path.relative(findProjectRoot(filePath), filePath);
    const { sourceCode } = context;
    const allComments = sourceCode.getAllComments();
    const shebangMatch = /^#![^\n]*\n/.exec(sourceCode.text);
    const shebang = shebangMatch === null ? "" : shebangMatch[0];
    const configuration = context.options[0] ?? {};

    const tag =
      configuration.tag !== undefined && configuration.tag !== ""
        ? configuration.tag
        : mark;
    const hasPathMark = allComments.some(({ value }) => value.includes(tag));
    const programNode = sourceCode.ast;

    if (!hasPathMark) {
      context.report({
        data: { tag },
        fix(fixer) {
          const pathComment = `// ${tag} ./${relativePath}\n`;
          return fixer.insertTextAfterRange([0, shebang.length], pathComment);
        },
        loc: { end: { column: 1000, line: 1 }, start: { column: 0, line: 1 } },
        messageId: "includePath",
        node: programNode,
      });
    }

    return {};
  },
  defaultOptions: [{ tag: mark }],
  meta: {
    docs: {
      description:
        "enforce each file includes a #PathMark comment indicating its path",
    },
    fixable: "code",
    messages: {
      includePath: "File must include a '{{tag}}' comment indicating its path",
    },
    schema: [
      {
        additionalProperties: false,
        properties: {
          tag: {
            type: "string",
          },
        },
        type: "object",
      },
    ],
    type: "suggestion",
  },
};

export default rule;
// EOF
