const path = require("path");
const fs = require("fs");
const validateFileMakerAdminApiToken = require("./validateFileMakerAdminApiToken.js");

const getClone = async (
  server,
  token,
  folder,
  database,
  clonesFolder = process.platform === "linux"
    ? "/opt/FileMaker/FileMaker Server/Data/ClonesOnly/"
    : process.platform === "darwin"
    ? "/Library/FileMaker Server/Data/ClonesOnly/"
    : "/Program Files/FileMaker/FileMaker Server/Data/ClonesOnly/",
  secure
) => {
  const validToken = await validateFileMakerAdminApiToken(server, token, false);
  if (!validToken) {
    throw new Error("Invalid FileMaker Admin API token");
  }
  const paths = [
    clonesFolder,
    folder,
    secure ? "Secure" : "Databases",
    `${database} Clone.fmp12`,
  ];
  const filePath = path.join(...paths);
  const fileFound = await fs.promises.access(filePath).then(
    () => true,
    () => false
  );
  if (!fileFound) {
    throw new Error("File not found");
  }
  const file = await fs.promises.readFile(filePath, { encoding: "base64" });
  return file;
};

module.exports = getClone;
