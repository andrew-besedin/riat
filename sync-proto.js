/* eslint-disable @typescript-eslint/no-require-imports */
// DEV TOOL: Sync all apps proto dirs with the root proto dir
const fs = require('fs/promises');
const { syncContent } = require('sync-content');

(async () => {
  const appsDirs = await fs.readdir('./apps');
  for (const appDir of appsDirs) {
    await syncContent('./proto', `./apps/${appDir}/src/proto`);
  }
})();
