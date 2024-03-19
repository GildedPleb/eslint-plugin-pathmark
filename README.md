# eslint-plugin-pathmark

> Mark a Path to every file, in that file.

```js
// PathMark: ./index.js
console.logo("Hello world");
// EOF
```

---

**PathMark** is an eslint plugin that automates the inclusion of specific tags within your JavaScript files, marking the start with a #PathMark tag that includes the file path and ensuring an end-of-file (EOF) marker is present. This preparation enriches code snippets with contextual information, optimizing them for analysis by AI tools or for more straightforward navigation and understanding by human developers.

Example output:

```js
console.logo("Hello world");
```

Would be fixed to:

```js
// PathMark: ./src/index.js
console.logo("Hello world");
// EOF
```

---

## Y Tho

Consider:

```js
function logMessage(message) {
  console.log(`[INFO]: ${message}`);
}
```

The given code can have drastic recommendation differences depending on context. For instance,

```js
// #PathMark: ./src/client/utils/logger.js
function logMessage(message) {
  console.log(`[INFO]: ${message}`);
}
```

vs

```js
// #PathMark: ./src/server/utils/logger.js
function logMessage(message) {
  console.log(`[INFO]: ${message}`);
}
```

Despite the function's identical implementation, its placement within the client or server directory shifts its intended use and operational context. For the client-side, an AI might suggest enhancements related to user experience or development practices, like wrapping the log calls to only execute in non-production environments. On the server-side, the recommendations could focus on reliability, security, and performance, such as implementing different log levels (info, warn, error) and directing output to more persistent storage solutions suited for production environments.

```sh
% cat ./src/server/utils/logger.js | ChatGPT what does this do
'The given JavaScript function `logMessage(message)` is designed to log information to the console.
Here is how it works:
1. It receives one parameter: `message`. This is expected to be a string and this is the information that you want to log.
2. The `console.log()` statement is used to print information to the JavaScript console. This is usually used for troubleshooting purposes (debugging) or simply to provide information about the status/progress of a program.
3. In the `console.log()`, a template literal (denoted by the backticks) is used to concatenate "[INFO]: " with whatever `message` was passed into the function.
So, if you call `logMessage("Hello World")`, it would print out `[INFO]: Hello World` to the console.'

% cat ./src/client/utils/logger.js | ChatGPT what does this do
'This is a JavaScript function named `logMessage`. It takes one parameter called `message`.
The function uses `console.log` to print the message to the console, providing a way to log information for debugging purposes.
This can be useful for debugging issues in the code, tracking certain actions in the client-side JavaScript, or displaying informational messages.
As an example, if youd use `logMessage("Page loaded")`, it would output `[INFO]: Page loaded` in your web browsers JavaScript console.'

```

Likewise, an `EOF` tag can inform context:

```js
function logMessage(message) {
  console.log(`[INFO]: ${message}`);
}
```

```sh
% cat ./src/server/utils/logger.js | ChatGPT what is missing
'The function `logMessage(message)` itself looks fine. Its a simple logging utility that displays a given message prefixed with `[INFO]: `. However, without further context, its hard to determine whats missing.'
```

```js
function logMessage(message) {
  console.log(`[INFO]: ${message}`);
}
// EOF
```

```sh
% cat ./src/server/utils/logger.js | ChatGPT what is missing
'From what youve provided, it doesnt seem like anything is missing. You have a simple Javascript function named `logMessage` that takes a `message` argument. It uses Nodes console.log function to print a string to the console with `[INFO]: ` prepended to the `message` to be logged. The code seems correctly formatted. Nevertheless, if you want a module to export this function or want others to use it, you would need to add `module.exports = logMessage;` to the end of the file.'
```

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-pathmark`:

```sh
npm install eslint-plugin-pathmark --save-dev
```

## Usage

This package requires ESM.

Flat config ships with recommended rules. For flat config:

```js
// PathMark: ./eslint.congif.js
import pathmark from "eslint-plugin-pathmark";

export default [
  pathmark.configs.flat,
  // Adjust rules like so:
  {
    rules: {
      "pathmark/add-path": 0,
    },
  },
];
// EOF
```

### Legacy

Add `pathmark` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["pathmark"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "pathmark/add-path": 2
  }
}
```

## Configurations

<!-- begin auto-generated configs list -->

|     | Name          |
| :-- | :------------ |
| ✅  | `recommended` |

<!-- end auto-generated configs list -->

## Rules

<!-- begin auto-generated rules list -->

⚠️ Configurations set to warn in.\
✅ Set in the `recommended` configuration.\
🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                   | Description                                                           | ⚠️  | 🔧  |
| :------------------------------------- | :-------------------------------------------------------------------- | :-- | :-- |
| [add-eof](docs/rules/add-eof.md)       | enforce a specific tag to be present at the very end of a file.       | ✅  | 🔧  |
| [add-path](docs/rules/add-path.md)     | enforce each file includes a #PathMark comment indicating its path    | ✅  | 🔧  |
| [check-path](docs/rules/check-path.md) | disallow #PathMark tag's path to not match the file's actual location | ✅  | 🔧  |

<!-- end auto-generated rules list -->
