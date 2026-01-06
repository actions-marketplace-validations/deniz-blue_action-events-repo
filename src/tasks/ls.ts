import { globSync, writeFileSync } from "fs";
import { join } from "path";
import * as core from "@actions/core";

/**
 * Task to create `.ls` files in each event directory, which list the contents of that directory in a json string array format.
 * @param dir Root events directory
 */
export const createDotLsFiles = async (dir: string) => {
    globSync("**/", {
        cwd: dir,
        exclude: ["node_modules/**", ".github/**", "dist/**", "**/.ls"],
    }).forEach((subdir) => {
        const fullPath = join(dir, subdir);
        const contents = globSync("*", {
            cwd: fullPath,
            exclude: [".ls"],
        }).filter((name) => !name.startsWith("."));
        const lsPath = join(fullPath, ".ls");
        const lsContent = JSON.stringify(contents, null, 2);
        writeFileSync(lsPath, lsContent);
        core.info(`Created .ls file at: ${lsPath}`);
    });
};
