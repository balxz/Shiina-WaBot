/**
     * Copyright © 2025 [ balxzzy ]
     *
     * All rights reserved. This source code is the property of [ Shiina Team ].
     * Unauthorized copying, distribution, modification, or use of this file,
     * via any medium, is strictly prohibited without prior written permission.
     *
     * This software is protected under international copyright laws.
     *
     * Contact: [ pa424013@gmail.com ]
     * GitHub: https://github.com/balxz
     * Official: https://balxzzy.web.id
     * Support: https://t.me/sh_team1
 */
require("#src/configs")
const fs = require("fs")
const path = require("path")
const chokidar = require("chokidar")

let plugins = []
let watcher = null

function clearCache(filePath) {
    const resolved = path.resolve(filePath)
    delete require.cache[resolved]
}

const Plugins = {
    create: async (dir) => {
        let plgns = []
        let folder = fs.readdirSync(dir)
        for (let file of folder) {
            let filePath = path.join(dir, file)
            let stat = fs.statSync(filePath)
            if (stat.isDirectory()) {
                let subPlugins = await Plugins.create(filePath)
                plgns = [...plgns, ...subPlugins]
                continue
            }
            if (file.endsWith(".js")) {
                try {
                    clearCache(filePath)
                    let plugin = require(path.resolve(filePath))
                    if (typeof plugin === "function" || typeof plugin === "object") {
                        plugin.path = path.relative(process.cwd(), filePath)
                        if (plugin.command && !Array.isArray(plugin.command)) {
                            plugin.command = [plugin.command]
                        }
                        if (plugin.alias && !Array.isArray(plugin.alias)) {
                            plugin.alias = [plugin.alias]
                        }
                        plgns.push(plugin)
                    }
                } catch (e) {
                    console.error(`${filePath}\n`, e.stack)
                }
            }
        }
        return plgns
    },

    reload: async () => {
        try {
            const updated = await Plugins.create("./cmd/plugins")
            plugins = updated
            console.log(`[ 🪷 ] reload ${plugins.length} plug`)
        } catch (e) {
            console.error("Failed to reload plugins\n", e.stack)
        }
    },

    connect: async (data) => {
        if (plugins.length === 0) {
            plugins = await Plugins.create("./cmd/plugins")
        }

        if (!watcher) {
            watcher = chokidar.watch("./cmd/plugins", { ignoreInitial: true })
            watcher.on("all", () => Plugins.reload())
        }

        let { cmd, args, text, m } = data
        let is = await require("#declare/Prehandler").is(m, clients)

        if (!cmd) {
            for (let plugin of plugins) {
                if (plugin.all) {
                    try {
                        if (typeof plugin.handler === "function") {
                            await plugin.handler(m, { ...data, is })
                        } else if (typeof plugin === "function") {
                            await plugin(m, { ...data, is })
                        }
                    } catch (e) {
                        console.error(`${plugin.path}\n`, e.stack)
                        m.reply(`> ${plugin.path}\n${e}`)
                    }
                }
            }
            return null
        }

        for (let plugin of plugins) {
            let commands = []
            if (plugin.command) {
                commands = Array.isArray(plugin.command)
                    ? plugin.command
                    : [plugin.command]
            }
            if (plugin.alias) {
                const aliases = Array.isArray(plugin.alias)
                    ? plugin.alias
                    : [plugin.alias]
                commands = [...commands, ...aliases]
            }
            if (commands.length === 0) continue

            let ma = commands.some(c => c.toLowerCase() === cmd.toLowerCase())

            if (ma) {
                if (plugin.owner && !is.owner) {
                    m.reply("[ 🪷 ] forbidden\n> This command can only be used by the owner.")
                    return null
                }
                if (plugin.group && !is.group) {
                    m.reply("[ 🪷 ] forbidden\n> This command can only be used in group chats.")
                    return null
                }
                if (plugin.private && !is.private) {
                    m.reply("[ 🪷 ] forbidden\n> This command can only be used in private chats.")
                    return null
                }
                if (plugin.admin && !await is.admin) {
                    m.reply("[ 🪷 ] forbidden\n> This command can only be used by a group admin.")
                    return null
                }
                if (plugin.botadmin && !await is.botadmin) {
                    m.reply("[ 🪷 ] forbidden\n> This command requires the bot to be a group admin.")
                    return null
                }

                try {
                    if (set.loading) await m.react("🪷")
                    let r = await (plugin.handler || plugin)(m, { ...data, is })
                    if (set.loading) await m.react("")
                    return r
                } catch (e) {
                    console.error(`${plugin.path}\n`, e.stack)
                    let ppk = `乂 — N E W  E R R O R\n`
                    ppk += `> *command*: ${ma}\n`
                    ppk += `> *file*: ${plugin.path}\n`
                    ppk += `> *sender*: ${m.sender}\n`
                    ppk += `> *from*: ${m.chat}\n\n`
                    ppk += `*[ ERROR LOGS ]*\n`
                    ppk += `\`\`\`${e?.stack || e}\`\`\`` + "\n"
                    ppk += "━".repeat(15)
                    clients.sendMessage(
                        owner.no[0] + "@s.whatsapp.net", {
                            text: ppk,
                            mentions: [owner.no[0] + "@s.whatsapp.net"]
                        }, {
                            quoted: m
                        }
                    )
                    if (set.loading) await m.react("🟥")
                }
            }
        }
        return null
    }
}

module.exports = Plugins

let f = require.resolve(__filename)
fs.watchFile(f, () => {
    fs.unwatchFile(f)
    console.log(`~> UPDATE [ 🪷 ] ${f}`)
    delete require.cache[f]
    require(f)
})