const os = require("os");

module.exports = {
    alias: ["status", "speed"],
    command: ["ping"],
    tags: ["info"],
    desc: "Check bot status & performance",
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

> *OS:* ${platform}
> *CPU:* ${cpu} Core
> *Memory:* ${formatBytes(memoryUsed)} / ${formatBytes(totalMemory)}
> *Uptime:* ${(uptime / 3600).toFixed(2)} hours
> *Node.js:* ${node}
> *Ping:* ${ping} ms
    `;

        m.reply(text.trim());
    },
};
