// PathMark: ./src/helpers.ts
import fs from "node:fs";
import path from "node:path";

/**
 *
 * @param startDirectory - The full filepath from /
 * @returns the project root
 */
export function findProjectRoot(startDirectory: string): string {
  let currentDirectory = startDirectory;
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  while (!fs.existsSync(path.join(currentDirectory, "package.json"))) {
    const parentDirectory = path.dirname(currentDirectory);
    if (parentDirectory === currentDirectory)
      throw new Error("Reached filesystem root without finding package.json");
    currentDirectory = parentDirectory;
  }

  return currentDirectory;
}

export const mark = "PathMark:";
export const eof = "EOF";
// EOF
