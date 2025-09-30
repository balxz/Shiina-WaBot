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
const {
    tggl,
    jam,
    RandomText,
    toRupiah,
    calculateProfit,
    runtime
} = require("#declare/Func")
const Plugins = require("#/cmd/handler")
const util = require("util")
const { exec } = require("child_process")
const fs = require("fs")

module.exports = async (clients, m, mek, scraper) => {
    try {
        let body = m.body || ""
        let isCmd = false
        let cmd = ""
        let args = []
        let text = ""

        if (set.prefix && Array.isArray(set.prefix)) {
            let usedPrefix = set.prefix.find(p => body.startsWith(p))
            if (usedPrefix) {
                isCmd = true
                cmd = body.slice(usedPrefix.length).trim().split(/ +/).shift().toLowerCase()
                args = body.trim().split(/ +/).slice(1)
                text = args.join(" ")
            }
        } else {
            isCmd = true
            cmd = body.trim().split(/ +/).shift().toLowerCase()
            args = body.trim().split(/ +/).slice(1)
            text = args.join(" ")
        }

        if (!isCmd) return
        let is = await require("#declare/Prehandler").is(m)

        switch (cmd) {
            case "ev": { // @owner @eval
                if (!is.owner) return m.reply("This command can only be used by the owner.")
                let duh = body.slice(body.indexOf(cmd) + cmd.length).trim() || "return m"
                try {
                    let evaled = await eval(`(async () => { ${duh} })()`)
                    if (typeof evaled !== "string") evaled = util.inspect(evaled)
                    await m.reply(evaled)
                } catch (err) {
                    m.reply(String(err))
                }
                break
            }

            case "exc": { // @owner @exec
                if (!is.owner) return m.reply("This command can only be used by the owner.")
                let duh = body.slice(body.indexOf(cmd) + cmd.length).trim() || "ls"
                exec(duh, (err, stdout) => {
                    if (err) return m.reply(`${err}`)
                    if (stdout) return m.reply(stdout)
                })
                break
            }

            default:
                await Plugins.connect({
                    m,
                    prefix: set.prefix,
                    cmd,
                    args,
                    text,
                    is,
                    Plugins,
                    scrap: scraper,
                    db,
                    tggl,
                    jam,
                    runtime
                })
                break
        }
    } catch (err) {
        console.error(err)
        await clients.sendMessage(
            owner.no[0] + "@s.whatsapp.net",
            { text: `${err}` },
            { quoted: m }
        )
    }
}

process.on("uncaughtException", err => {
    console.error("Uncaught Exception:", err)
})
process.on("unhandledRejection", err => {
    console.error("Unhandled Rejection:", err)
})
let f = require.resolve(__filename)
fs.watchFile(f, () => {
    fs.unwatchFile(f)
    console.log(`~> UPDATE [ 🪷 ] ${f}`)
    delete require.cache[f]
    require(f)
})