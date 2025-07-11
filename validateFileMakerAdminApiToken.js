const https = require("https");
const fs = require("fs");

const validateFileMakerAdminApiToken = async (
  server,
  token,
  rejectUnauthorized = true
) => {
  const agent = new https.Agent({ rejectUnauthorized });
  const url = `https://${server}/fmi/admin/api/v2/server/metadata`;
  const urlObj = new URL(url);
  const host = urlObj.host;
  const path = urlObj.pathname;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const options = {
    headers,
    agent,
    host,
    path,
  };

  try {
    await httpsRequest(options);
    return true;
  } catch (error) {
    console.log(token);

    console.log(error);
    return false;
  }
};

function httpsRequest(params, postData) {
  return new Promise(function (resolve, reject) {
    const req = https.request(params, function (res) {
      // accumulate data
      let body = [];
      res.on("data", function (chunk) {
        body.push(chunk);
      });
      // resolve on end
      res.on("end", function () {
        console.log(Buffer.concat(body).toString());

        try {
          body = JSON.parse(Buffer.concat(body).toString());
        } catch (e) {
          fs.writeFileSync("error", Buffer.concat(body).toString());
          reject(e);
        }

        // reject on bad status
        if (res.statusCode < 200 || res.statusCode >= 300) {
          console.log(`HTTP Error. Status code: ${res.statusCode}`);
          console.log(`Path: ${params.path}`);
          return reject(new Error("statusCode=" + res.statusCode));
        }
        resolve(body);
      });
    });
    // reject on request error
    req.on("error", function (err) {
      // This is not a "Second reject", just a different sort of failure
      reject(err);
    });
    if (postData) {
      req.write(postData);
    }

    req.end();
  });
}

module.exports = validateFileMakerAdminApiToken;
