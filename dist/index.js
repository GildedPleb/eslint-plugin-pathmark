// PathMark: ./src/index.ts
import checkEofTag from "./rules/eof.js";
import pathMarkRule from "./rules/pathmark.js";
import checkPathmarkPath from "./rules/validate-pathmark-path.js";
const files = [
    "**/*.js",
    "**/*.ts",
    "**/*.jsx",
    "**/*.tsx",
    "**/*.mjs",
    "**/*.cjs",
    "**/*.es",
    "**/*.es6",
    "**/*.d.ts",
];
const pluginDefs = {
    "add-eof": checkEofTag,
    "add-path": pathMarkRule,
    "check-path": checkPathmarkPath,
};
const recommendedRules = {
    "pathmark/add-eof": 1,
    "pathmark/add-path": 1,
    "pathmark/check-path": 1,
};
const plugin = {
    configs: {
        flat: {
            files,
            plugins: {
                pathmark: {
                    rules: pluginDefs,
                },
            },
            rules: recommendedRules,
        },
        recommended: {
            files,
            plugins: ["pathmark"],
            rules: recommendedRules,
        },
    },
    rules: pluginDefs,
};
export default plugin;
// EOF
