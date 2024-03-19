import path from "node:path";
import { findProjectRoot, mark } from "../helpers.js";
const rule = {
    create(context) {
        const filePath = context.filename;
        const relativePath = path.relative(findProjectRoot(filePath), filePath);
        const { sourceCode } = context;
        const filename = `./${relativePath}`;
        const allComments = sourceCode.getAllComments();
        const configuration = context.options[0] || {};
        const tag = configuration.tag !== undefined && configuration.tag !== ""
            ? configuration.tag
            : mark;
        for (const comment of allComments) {
            const { value } = comment;
            if (value.includes(tag)) {
                const specifiedPath = value.split(tag)[1].trim().split(" ")[0];
                const specifiedPathIndex = value.indexOf(specifiedPath);
                const tagIndex = value.indexOf(tag);
                const pathStart = tagIndex + tag.length + 2;
                const pathEnd = pathStart + specifiedPath.length + 2;
                const leadingSpaces = value.slice(pathStart, specifiedPathIndex).length;
                if (specifiedPath !== filename) {
                    context.report({
                        data: { tag },
                        fix(fixer) {
                            const specifiedPathStart = comment.range[0] + value.indexOf(specifiedPath) + 2;
                            const specifiedPathEnd = specifiedPathStart + specifiedPath.length;
                            const correctedPath = filename.startsWith("./")
                                ? filename
                                : `./${filename}`;
                            return fixer.replaceTextRange([specifiedPathStart, specifiedPathEnd], correctedPath);
                        },
                        loc: {
                            end: {
                                column: comment.loc.start.column + pathEnd + leadingSpaces,
                                line: comment.loc.start.line,
                            },
                            start: {
                                column: comment.loc.start.column + pathStart + leadingSpaces,
                                line: comment.loc.start.line,
                            },
                        },
                        messageId: "incorrectPath",
                        node: comment,
                    });
                }
            }
        }
        return {};
    },
    defaultOptions: [{ tag: mark }],
    meta: {
        docs: {
            description: "disallow #PathMark tag's path to not match the file's actual location",
        },
        fixable: "code",
        messages: {
            incorrectPath: "The path specified in the '{{tag}}' tag does not match the file's actual path.",
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
