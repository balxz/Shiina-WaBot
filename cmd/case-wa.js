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
        ////???? pakai split ?. biar gk null ygy
        let body = (
            m?.mtype === "conversation" ? m?.message?.conversation :
            m?.mtype === "imageMessage" ? m?.message?.imageMessage?.caption :
            m?.mtype === "videoMessage" ? m?.message?.videoMessage?.caption :
            m?.mtype === "extendedTextMessage" ? m?.message?.extendedTextMessage?.text :
            m?.mtype === "buttonsResponseMessage" ? m?.message?.buttonsResponseMessage?.selectedButtonId :
            m?.mtype === "listResponseMessage" ? m?.message?.listResponseMessage?.singleSelectReply?.selectedRowId :
            m?.mtype === "templateButtonReplyMessage" ? m?.message?.templateButtonReplyMessage?.selectedId :
            m?.mtype === "interactiveResponseMessage" ? JSON.parse(m?.msg?.nativeFlowResponseMessage?.paramsJson || "{}")?.id :
            m?.mtype === "messageContextInfo" ? m?.message?.buttonsResponseMessage?.selectedButtonId ||
            m?.message?.listResponseMessage?.singleSelectReply?.selectedRowId || m?.text || m?.body : ""
        ) || ""

//TypeError: Cannot read properties of null (reading 'body')
//    at module.exports (/root/Shiina-WaBot/cmd/case-wa.js:61:77)
//    at EventEmitter.<anonymous> (/root/Shiina-WaBot/connect.js:77:47)
//    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
//ReferenceError: cmd is not defined
//    at module.exports (/root/Shiina-WaBot/cmd/case-wa.js:114:32)
//    at EventEmitter.<anonymous> (/root/Shiina-WaBot/connect.js:77:47)
//    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)

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
        } else if (body) {
            isCmd = true
            cmd = body.trim().split(/ +/).shift().toLowerCase() || m?.quoted?.body?.text || ""
            args = body.trim().split(/ +/).slice(1)
            text = args.join(" ")
        }

        if (!isCmd || !cmd) return
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
                let execCmd = body.slice(body.indexOf(cmd) + cmd.length).trim() || "ls"
                exec(execCmd, (err, stdout) => {
                    if (err) return m.reply(`${err}`)
                    if (stdout) return m.reply(stdout)
                })
                break
            }

            default:
                await Plugins.connect({
                    m,
                    prefix: set.prefix,
                    body,
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
    } catch (e) {
        console.error(e.stack)
        let ppk = `乂 NEW ERROR\n`
        ppk += `> file: ${__filename}\n`
        ppk += `> sender: ${m?.sender}\n`
        ppk += `> from: ${m?.chat}\n\n`
        ppk += `[ ERROR LOGS ]\n`
        ppk += `\`\`\`${e?.stack || e}\`\`\`` + "\n"
        ppk += "━".repeat(15)
        await clients.sendMessage(
            owner.no[0] + "@s.whatsapp.net", {
                text: ppk
            }, {
                quoted: m
            }
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
