import * as core from "@actions/core";
import * as github from "@actions/github";
import { globSync, writeFileSync } from "fs";

/**
 * Creates an .index.json at repository root with a list of event paths and their URLs.
 */
export const createIndexJson = async (dir: string) => {
    const { owner, repo } = github.context.repo;
    const repository = `${owner}/${repo}`;
    const pagesUrl = `https://${owner}.github.io/${repo}`;

    core.info(`Repository: ${repository}`);
    core.info(`Pages URL: ${pagesUrl}`);

    const paths = globSync("**/*.json", {
        cwd: dir,
        exclude: ["node_modules/**", ".github/**", "dist/**", "**/.ls", ".index.json"],
    });

    writeFileSync(".index.json", JSON.stringify({
        repository,
        events: paths.map(path => ({
            path,
            url: `${pagesUrl}/${dir}/${path}`,
        })),
    }, null, 2));
};
