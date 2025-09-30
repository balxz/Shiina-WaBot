const fs = require("fs");
const path = require("path");

module.exports = {
  alias: ["clearsesi"],
  command: ["clearsession"],
  tags: ["owner"],
  desc: ["clear session files"],
  owner: true,
  handler: async (m) => {
    const sessionPath = path.join(process.cwd(), pair.sesi);

    try {
      const files = await fs.promises.readdir(sessionPath);
      const filteredArray = files.filter(
        (item) =>
          item.startsWith("pre-key") ||
          item.startsWith("sender-key") ||
          item.startsWith("session-") ||
          item.startsWith("app-state")
      );

      let message = `Detected ${filteredArray.length} session files <3\n\n`;

      if (filteredArray.length === 0) {
        return m.reply(message);
      }

      message += filteredArray.map((e, i) => `${i + 1}. ${e}`).join("\n");

      m.reply(message);

      await sleep(2000);
      m.reply("Deleting memory files... <3");

      for (const file of filteredArray) {
        await fs.promises.unlink(path.join(sessionPath, file));
      }

      await sleep(2000);
      m.reply(
        "Successfully deleted all the memory files from the session folder... ;)"
      );
    } catch (err) {
      console.error("Error:", err);
      m.reply("An error occurred while accessing or deleting the files.");
    }
  },
};

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
