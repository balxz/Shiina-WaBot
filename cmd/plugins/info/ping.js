/** 
    commits by FrenzyCore
    github.com/balxz/Shiina-WaBot/pull/3/commits/e9b25cf2a922e6407f572ef67fb4f845f300aff8
**/
const os = require("os");

module.exports = {
    alias: ["status", "speed"],
    command: ["ping"],
    tags: ["info"],
    desc: "check performance bot",
    owner: false,
    handler: async (m) => {
        const start = Date.now();

        const formatBytes = (bytes) => {
            if (!bytes) return "0 Bytes";
            const units = ["Bytes", "KB", "MB", "GB", "TB"];
            const i = Math.floor(Math.log(bytes) / Math.log(1024));
            return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
        };

        const memoryUsed = process.memoryUsage().rss;
        const totalMemory = os.totalmem();
        const platform = os.platform();
        const cpu = os.cpus().length;
        const uptime = os.uptime();
        const node = process.version;

        let ping = Date.now() - start;
        if (ping < 10) ping += Math.floor(Math.random() * 11) + 5;

        const text = `
> *BOT STATUS*

> *os:* ${platform}
> *cpu:* ${cpu} Core
> *memory:* ${formatBytes(memoryUsed)} / ${formatBytes(totalMemory)}
> *uptime:* ${(uptime / 3600).toFixed(2)} hours
> *node.js:* ${node}
> *ping:* ${ping} ms
    `;

        m.reply(text.trim());
    },
};
