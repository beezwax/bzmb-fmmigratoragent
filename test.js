const fs = require("fs");
const getClone = require("./getClone.js");

const args = process.argv.slice(2);

const [server, token, folder, database, clonesFolder, secure] = args;

console.log(server, token, folder, database, clonesFolder, secure);

(async () => {
  const clone = await getClone(
    server,
    token,
    folder,
    database,
    clonesFolder,
    secure
  );
  await fs.promises.writeFile(
    `testOutput/${database} Clone.fmp12`,
    Buffer.from(clone, "base64")
  );
})();
