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
const { exec } = require("child_process")
const API = require("#src/api")

const cache = {}

module.exports = async (ctx, client, m) => {
    try {
        let msg = ctx.message || ctx.callbackQuery?.message || {}
        let body = msg.text || msg.caption || ctx.callbackQuery?.data || ""
        let cmd = body.slice(1).trim().split(/ +/).shift()?.toLowerCase()
        let args = body.trim().split(/ +/).slice(1)
        let isCmd = body.startsWith("/") || body.startsWith(".")

        if (msg && body && (body.startsWith("/") || body.startsWith("."))) {
            let cmd = ctx.message?.text?.split(" ")[0]
            console.log(
                chalk.blue(
                    `[ CMD BOT TELEGRAM ] : @${ctx.from.username || "no name"} — ${cmd}`
                )
            )
        }

        switch (cmd) {
            case "start": {
                let lang = "en"
                let b = ""
                if (lang === "id") {
                    b += `Halo @${ctx.from.username}\n`
                    b += "ingin memulai?\n"
                    b += "tag bot dan ketik keyword\n\n"
                    b += "Contoh:\n"
                    b += "@ba1zzmusic_bot andai kita - Feby Putry\n\n"
                    b += "atau bisa langsung ketik judul musik."
                    b += "\n\n— powered by @balxzzy"
                } else {
                    b += `Hello @${ctx.from.username}\n`
                    b += "Do you want to start?\n"
                    b += "Tag the bot and type your keyword\n\n"
                    b += "Example:\n"
                    b += "@ba1zzmusic_bot andai kita - Feby Putry\n\n"
                    b += "Or you can directly type the music title."
                    b += "\n\n— powered by @sh_team1"
                }

                await ctx.replyWithPhoto("https://raw.githubusercontent.com/balxz/akuuu-muaakk/refs/heads/main/this-project-shiina-1.png", {
                    caption: b,
                    reply_to_message_id: msg.message_id,
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text:
                                        lang === "id"
                                            ? "cari disini"
                                            : "search here",
                                    switch_inline_query_current_chat: ""
                                }
                            ]
                        ]
                    }
                })
                break
            }

            case "ev": {
                if (!bot.own.includes(ctx.from.id)) return
                let duh = args.join(" ") || "return"
                try {
                    let evaled = await eval(`(async () => { ${duh} })()`)
                    if (typeof evaled !== "string") {
                        evaled = require("util").inspect(evaled, { depth: 2 })
                    }
                    await ctx.reply(evaled, {
                        reply_to_message_id: msg.message_id
                    })
                } catch (err) {
                    await ctx.reply(String(err), {
                        reply_to_message_id: msg.message_id
                    })
                }
                break
            }

            case "exc": {
                if (!bot.own.includes(ctx.from.id)) return
                let duh = args.join(" ") || "ls"
                exec(duh, (err, stdout, stderr) => {
                    if (err)
                        return ctx.reply(err.message, {
                            reply_to_message_id: msg.message_id
                        })
                    if (stderr)
                        return ctx.reply(stderr, {
                            reply_to_message_id: msg.message_id
                        })
                    if (stdout)
                        return ctx.reply(stdout, {
                            reply_to_message_id: msg.message_id
                        })
                })
                break
            }

            default: {
                if (body.startsWith(`@${ctx.botInfo.username}`)) {
                    let q = body.replace(`@${ctx.botInfo.username}`, "").trim()
                    if (!q)
                        return ctx.reply(
                            `input soong in query.\nex: @${ctx.botInfo.username} let down\n\n— powered by @sh_team1`,
                            { reply_to_message_id: msg.message_id }
                        )
            
                    let a = new API()
                    let b = await a.yts(q)
                    if (!b.length)
                        return ctx.reply(
                            "data not found, please search again.\n\n— powered by @sh_team1",
                            { reply_to_message_id: msg.message_id }
                        )
            
                    cache[ctx.from.id] = b
            
                    let c = b
                        .slice(0, 7)
                        .map(d => [
                            { text: d.title, callback_data: `ply_${d.id}` }
                        ])
            
                    await ctx.replyWithPhoto(thumb.url, {
                        caption:
                            "do you wanting chooise?\nclick one the buttons below.\n\n— powered by @sh_team1",
                        reply_to_message_id: msg.message_id,
                        reply_markup: { inline_keyboard: c }
                    })
                }
            
                if (ctx.callbackQuery && ctx.callbackQuery.data) {
                    let dtCb = ctx.callbackQuery.data
                    if (dtCb.startsWith("ply_")) {
                        let id = dtCb.replace("ply_", "")
                        let b = cache[ctx.from.id] || []
                        let req = b.find(d => d.id === id)
            
                        if (req) {
                            let a = new API()
                            await ctx.answerCbQuery("writing...")
                            let statusMsg = await ctx.editMessageCaption(
                                "downloading...\n— powered by @sh_team1",
                                { reply_markup: { inline_keyboard: [] } }
                            )
            
                            let msk = await a.ytdl(req.url)
            
                            await ctx.telegram.editMessageCaption(
                                statusMsg.chat.id,
                                statusMsg.message_id,
                                undefined,
                                "process send...\n— powered by @sh_team1"
                            )
            
                            await ctx.replyWithAudio(
                                {
                                    url: msk.urls
                                },
                                {
                                    title: msk.metadata.title,
                                    performer: msk.metadata.channel,
                                    thumb: { url: msk.metadata.thumbnail }
                                }
                            )
            
                            await ctx.deleteMessage(statusMsg.message_id)
                            delete cache[ctx.from.id]
                        } else {
                            return ctx.reply(
                                "data not found, please search again.\n\n— powered by @sh_team1",
                                { reply_to_message_id: msg.message_id }
                            )
                        }
                    }
                }
            }   
        }
    } catch (e) {
        console.error(e)
        ctx.reply(e, { reply_to_message_id: ctx.message?.message_id })
    }
}

process.on("uncaughtException", err =>
    console.error("[ Uncaught Exception ]\n", err)
)
process.on("unhandledRejection", reason =>
    console.error("[ Unhandled Rejection ]\n", reason)
)
let f = require.resolve(__filename)
fs.watchFile(f, () => {
    fs.unwatchFile(f)
    console.log(`~> UPDATE [ 🪷 ] ${f}`)
    delete require.cache[f]
    require(f)
})