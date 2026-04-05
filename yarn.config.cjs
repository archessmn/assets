/** @type {import('@yarnpkg/types')} */
const { defineConfig } = require("@yarnpkg/types");

module.exports = defineConfig({
  async constraints({ Yarn }) {
    const packageVersions = {
      "@prisma/client": "7.5.0",
      ioredis: "^5.10.1",
      next: "16.2.1",
      minio: "^8.0.6",
      prisma: "7.5.0",
      react: "19.2.4",
      "socket.io": "^4.8.3",
      "socket.io-client": "^4.8.3",
      zod: "^4.1.12",
    };

    for (const workspace of Yarn.workspaces()) {
      for (const [packageName, packageVersion] of Object.entries(
        packageVersions,
      )) {
        for (const dep of Yarn.dependencies({
          ident: packageName,
          workspace: workspace,
        })) {
          dep.update(packageVersion);
        }
      }
    }
  },
});
