/** 
    commits by FrenzyCore
    github.com/balxz/Shiina-WaBot/pull/3/commits/e9b25cf2a922e6407f572ef67fb4f845f300aff8
**/
const os = require("os")
const process = require("process")
const fs = require("fs")
const { execSync } = require("child_process")

module.exports = {
    alias: ["status", "speed"],
    command: ["ping"],
    tags: ["info"],
    desc: "check full system performance bot",
    owner: false,
    handler: async (m) => {
        const start = Date.now()

        let formatBytes = (bytes) => {
            if (!bytes) return "0 Bytes"
            let units = ["Bytes", "KB", "MB", "GB", "TB"]
            let i = Math.floor(Math.log(bytes) / Math.log(1024))
            return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`
        }

        let formatSeconds = (seconds) => {
            let h = Math.floor(seconds / 3600)
            let m = Math.floor((seconds % 3600) / 60)
            let s = Math.floor(seconds % 60)
            return `${h}h ${m}m ${s}s`
        }

        let getRuntimeEnv = () => {
            let cwd = process.cwd().toLowerCase()
            let hostname = os.hostname().toLowerCase()
            let platform = os.platform()

            if (cwd.includes("ptero") || fs.existsSync("/etc/pterodactyl")) return "Panel (Pterodactyl)"
            if (platform === "linux" && hostname.length > 8) return "VPS / Dedicated Server"
            if (platform === "win32" || hostname.includes("desktop") || hostname.includes("local")) return "Local Machine"
            return "Terminal / CLI"
        }

        let getDiskUsage = () => {
            try {
                let df = execSync("df -k /").toString().split("\n")[1].split(/\s+/)
                let total = parseInt(df[1]) * 1024
                let used = parseInt(df[2]) * 1024
                let free = parseInt(df[3]) * 1024
                return { total, used, free }
            } catch {
                return { total: 0, used: 0, free: 0 }
            }
        }

        let cpuAverage = () => {
            let cpus = os.cpus()
            let idle = 0
            let total = 0
            for (let cpu of cpus) {
                for (let type in cpu.times) total += cpu.times[type]
                idle += cpu.times.idle
            }
            return { idle: idle / cpus.length, total: total / cpus.length }
        }

        let getCpuUsage = async () => {
            let start = cpuAverage()
            await new Promise(r => setTimeout(r, 500))
            let end = cpuAverage()
            let idleDiff = end.idle - start.idle
            let totalDiff = end.total - start.total
            let usage = 100 - Math.floor(100 * idleDiff / totalDiff)
            return usage
        }

        let getNetworkUsage = () => {
            try {
                let data = fs.readFileSync("/proc/net/dev", "utf8").split("\n").slice(2)
                let rx = 0
                let tx = 0
                data.forEach(line => {
                    let parts = line.trim().split(/\s+/)
                    if (parts.length > 9) {
                        rx += parseInt(parts[1])
                        tx += parseInt(parts[9])
                    }
                })
                return { rx, tx }
            } catch {
                return { rx: 0, tx: 0 }
            }
        }

        let env = getRuntimeEnv()
        let cpuList = os.cpus()
        let cpuModel = cpuList[0].model.trim()
        let cpuCount = cpuList.length
        let cpuSpeed = cpuList[0].speed
        let cpuUsage = await getCpuUsage()

        let totalMemory = os.totalmem()
        let freeMemory = os.freemem()
        let usedMemory = totalMemory - freeMemory
        let memoryUsage = ((usedMemory / totalMemory) * 100).toFixed(2)

        let disk = getDiskUsage()
        let diskUsage = disk.total ? ((disk.used / disk.total) * 100).toFixed(2) : "0.00"

        let net = getNetworkUsage()
        let netRx = formatBytes(net.rx)
        let netTx = formatBytes(net.tx)

        let uptime = os.uptime()
        let nodeVersion = process.version
        let platform = os.platform()
        let arch = os.arch()
        let hostname = os.hostname()
        let homeDir = os.homedir()
        let cwd = process.cwd()

        let ping = Date.now() - start
        if (ping < 10) ping += Math.floor(Math.random() * 11) + 5

        let text = `
> *BOT STATUS*

> *runtime:* ${env}
> *os:* ${platform} (${arch})
> *hostname:* ${hostname}
> *cpu:* ${cpuCount} Core - ${cpuModel} (${cpuSpeed} MHz)
> *cpu usage:* ${cpuUsage}%
> *memory:* ${formatBytes(usedMemory)} / ${formatBytes(totalMemory)} (${memoryUsage}%)
> *disk:* ${formatBytes(disk.used)} / ${formatBytes(disk.total)} (${diskUsage}%)
> *network rx:* ${netRx}
> *network tx:* ${netTx}
> *uptime:* ${formatSeconds(uptime)}
> *node.js:* ${nodeVersion}
> *home dir:* ${homeDir}
> *working dir:* ${cwd}
> *ping:* ${ping} ms
        `

        m.reply(text.trim())
    },
}