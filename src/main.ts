import * as core from '@actions/core';
import { checkEvents } from "./tasks/check";
import { createDotLsFiles } from "./tasks/ls";
import { createIndexJson } from "./tasks/indexjson";

export async function run(): Promise<void> {
	core.info("@deniz-blue/action-events-repo is running")
	try {
		const eventsDir = core.getInput("events-dir") || "events";
		core.info(`Using events directory: ${eventsDir}`);

		await checkEvents(eventsDir);
		await createDotLsFiles(eventsDir);
		await createIndexJson(eventsDir);

		core.info("Complete")
	} catch (error) {
		if (error instanceof Error) core.setFailed(error.message)
	}
}
