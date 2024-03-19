import { eof } from "../helpers.js";
const rule = {
    create(context) {
        const { sourceCode } = context;
        const configuration = context.options[0] || {};
        const tag = configuration.tag !== undefined && configuration.tag !== ""
            ? configuration.tag
            : eof;
        const comments = sourceCode.getAllComments();
        const text = sourceCode.getText();
        const eofComments = comments.filter(({ value }) => value.includes(tag));
        const lastComment = eofComments.at(-1);
        if (lastComment !== undefined) {
            const isLastThingInFile = text.trimEnd().endsWith(lastComment.value) ||
                text.trimEnd().endsWith(`${lastComment.value}*/`);
            if (isLastThingInFile)
                return {};
        }
        const insertionText = text.endsWith("\n") ? `// ${tag}\n` : `\n// ${tag}\n`;
        const range = [text.length, text.length];
        if (eofComments.length === 0) {
            const lines = sourceCode.getText().split("\n");
            const lastLineNumber = lines.length;
            context.report({
                data: { tag },
                fix(fixer) {
                    return fixer.insertTextAfterRange(range, insertionText);
                },
                loc: {
                    end: { column: 0, line: lastLineNumber },
                    start: { column: 0, line: lastLineNumber },
                },
                messageId: "missingTag",
            });
            return {};
        }
        for (const comment of eofComments) {
            const hasAdditionalText = comment.value.trim() !== tag;
            context.report({
                data: { tag },
                fix(fixer) {
                    const fixes = [];
                    if (!hasAdditionalText)
                        fixes.push(fixer.remove(comment));
                    fixes.push(fixer.insertTextAfterRange(range, insertionText));
                    return fixes;
                },
                loc: comment.loc,
                messageId: "lastInFile",
            });
        }
        return {};
    },
    defaultOptions: [{ tag: "EOF" }],
    meta: {
        docs: {
            description: "enforce a specific tag to be present at the very end of a file.",
        },
        fixable: "code",
        messages: {
            lastInFile: "'{{tag}}' tag comment must be the last thing in the file.",
            missingTag: "File must end with the '{{tag}}' tag on the last line.",
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
