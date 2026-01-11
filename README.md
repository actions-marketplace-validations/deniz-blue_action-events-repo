# deniz-blue/action-events-repo

A GitHub action to help manage repositories that store [@evnt Event Data](https://github.com/deniz-blue/events-format)

This action will:

- Check validity of event files
- Create a `github-pages` artifact to publish
  - `index.html` -> redirect to `event.nya.pub` with `?action=view-index`
  - `index.json` -> stores metadata about all the stored events
  - `events/**/*.json` -> event data
  - `events/**/.ls` -> `string[]` json for listing directory contents

This action uses `@evnt/dev` package under the hood
