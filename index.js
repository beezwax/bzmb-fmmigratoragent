const getClone = require("./getClone.js");

const getCloneSchema = {
  body: {
    type: "object",
    required: ["server", "token", "folder", "database"],
    properties: {
      server: { type: "string" },
      token: { type: "string" },
      folder: { type: "string" },
      database: { type: "string" },
      clonesFolder: { type: "string" },
      secure: { type: "boolean" },
    },
  },
};

async function bzmbFmmigratoragent(fastify, options) {
  fastify.post(
    "/bzmb-fmmigratoragent-getClone",
    { schema: getCloneSchema },
    async (req, res) => {
      try {
        const { server, token, folder, database, clonesFolder, secure } =
          req.body;
        const clone = await getClone(
          server,
          token,
          folder,
          database,
          clonesFolder,
          secure
        );
        res.code(200).send(clone);
      } catch (error) {
        res.code(500).send(error);
      }
    }
  );
}

module.exports = { microbond: bzmbFmmigratoragent };
