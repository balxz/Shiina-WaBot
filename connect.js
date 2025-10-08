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
/* paksa nyala walau eror **/
process.on("uncaughtException", console.error)

//console.clear()
require("module-alias/register")
require("#src/configs");
(async () => {
    const pino = require("pino")
    const { tggl, jam } = require("#declare/Func")
    const Database = require("#declare/Database")
    global.scraper = new (await require("#scrapers"))("src/scrapers/src")
    global.db = new Database("database.json")
    await db.init()
    await scraper.load()
    await scraper.watch()
    setInterval(async () => {
        await db.save()
        await scraper.load()
    }, 2000)

    async function clientstart() {
        const { state, saveCreds } = await bail.shUseMultiFileAuthState(pair.sesi)
        global.clients = bail.makeWASocket({
            logger: pino({ level: "silent" }),
            printQRInTerminal: !pair.isPair,
            auth: state,
            browser: ["Ubuntu", "Chrome", "20.0.00"]
        })
        
        clients.chats = {}

        clients.decodeJid = jid => {
            if (!jid) return jid
            if (/:\d+@/gi.test(jid)) {
                let decode = bail.jidDecode(jid) || {}
                return decode.user && decode.server ? decode.user + "@" + decode.server : jid
            } else return jid
        }

        clients.ev.on("messages.upsert", async chatUpdate => {
            try {
                let mek = chatUpdate.messages[0]
                const m = require("#src/simple").smsg(clients, mek)
                if (set.self && ![`${owner.no[0]}@s.whatsapp.net`, clients.user.id].includes(m.sender)) return
                await db.main(m)
                if (set.frmBot) if (m.fromMe) return
                await require("#/cmd/case-wa")(clients, m, mek, scraper)
                await require("#declare/Print")(m, clients)
                if (set.read) await clients.readMessages([m.key])
            } catch (err) {
                console.log(err)
            }
        })

        clients.ev.on("connection.update", async update => {
            const { connection, lastDisconnect } = update
            if (connection === "close") {
                let reason = lastDisconnect?.error?.output?.statusCode
                console.log("[ 🍂 ] connection close", reason)
                console.clear()
                console.log("[ 🌿 ] restart")
                clientstart()
                tele()
            } else if (connection === "open") {
                console.log("[ 🪷 ] — connected")
                let gcny = (await clients.groupFetchAllParticipating().catch(() => ({}))) || {}
                        for (let id in gcny) {
                          clients.chats[id] = gcny[id]
                          bail.delay(500)
                        }
            } else if (connection === "connecting") {
                console.log("[ 🪷 ] — connecting")
            }
        })

        clients.ev.on("group-participants.update", async ({ id }) => {
            if (!id || id === "status@broadcast") return
            try {
                clients.chats[id] = await clients.groupMetadata(id)
                await new Promise(resolve => setTimeout(resolve, 500))
            } catch (e) {
                console.error(`data group ${id}: ${e}`)
            }
        })

        clients.ev.on("groups.update", async (updates) => {
            for (let update of updates) {
                let id = update.id
                if (!id || id === "status@broadcast" || !id.endsWith("@g.us")) continue
                try {
                    clients.chats[id] = await clients.groupMetadata(id)
                    await new Promise(resolve => setTimeout(resolve, 500))
                } catch (err) {
                    console.error(`data group ${id}: ${err}`)
                }
            }
        })

        clients.ev.on("call", async (sihama) => {
            if (!set.anticall) return
            for (let hama of sihama) {
                if (!hama.isGroup && hama.status == "offer") {
                    await clients.rejectCall(hama.id, hama.from)
                    await m.reply("*Hallo.*\n_pengguna saat ini tidak dapat menerima telefon._\n_silahkan tinggalkan pesan penting anda._")
                    if (set.block) await clients.updateBlockStatus(hama.from, "block")
                    await bail.delay(3000)
                }
            }
        })

        clients.ev.on("creds.update", saveCreds)
    }

    async function tele() {
        if (!bot.on) return
        let { Telegraf } = require("@sh/tg")
        let tkny = bot.id.map(token => new Telegraf(token))
        tkny.forEach(client => {
            client.use(async (ctx, next) => {
                await require("#/cmd/case-tele")(ctx, client)
                await next()
            })
            client.launch()
        })

        process.once("SIGINT", () => tkny.forEach(c => c.stop("SIGINT")))
        process.once("SIGTERM", () => tkny.forEach(c => c.stop("SIGTERM")))

        console.log("TGBOT ONLINE")
        return tkny
    }

    tele()
    clientstart()
})()