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
        const { state, saveCreds } = await bail.useMultiFileAuthState(pair.sesi)
        global.clients = bail.makeWASocket({
            logger: pino({
                level: "silent"
            }),
            printQRInTerminal: !pair.isPair,
            auth: state,
            browser: ["Ubuntu", "Chrome", "20.0.00"]
        })

        if (pair.isPair && !clients.authState.creds.registered) {
            let ph = pair.no.replace(/[^0-9]/g, "")
            await bail.delay(3000)
            let code = await clients.requestPairingCode(ph, "AAAAAAAA")
            code = code?.match(/.{1,4}/g)?.join("-") || code
            let tx = "— Pairing Request\n"
            tx += ` ◦ ✧ owner: ${owner.name}\n`
            tx += ` ◦ ✧ hour: ${jam()}\n`
            tx += ` ◦ ✧ days: ${tggl()}\n`
            tx += `${new Date()}\n`
            tx += `Your Pairing Code ${code}`
            console.log(tx)
        }

        clients.decodeJid = jid => {
            if (!jid) return jid
            if (/:\d+@/gi.test(jid)) {
                let decode = bail.jidDecode(jid) || {}
                return decode.user && decode.server && decode.user + "@" + decode.server || jid
            } else return jid
        }

        clients.ev.on("messages.upsert", async chatUpdate => {
            try {
                let mek = chatUpdate.messages[0]
                global.m = require("./src/simple").smsg(clients, mek)
                if (set.self && ![`${owner.no[0]}@s.whatsapp.net`, clients.user.id].includes(m.sender)) return
                await db.main(m)
                if (set.frmBot) {
                    if (m.fromMe) return
                }
                await require("#/cmd/case-wa")(clients, m, mek, scraper)
                await require("#declare/Print")(m, clients)
                if (set.read) {
                    await clients.readMessages([m.key])
                }
            } catch (err) {
                console.log(err)
            }
        })

        clients.ev.on("connection.update", update => {
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
            } else if (connection === "connecting") {
                console.log("[ 🪷 ] — connecting")
            }
        })

        clients.ev.on("call", async (sihama) => {
            if (!set.anticall) return
            for (let hama of sihama) {
                if (hama.isGroup == false) {
                    if (hama.status == "offer") {
                        await m.reply("*Hallo.*\n_pengguna saat ini tidak dapat menerima telefon._\n_silahkan tinggalkan pesan penting anda._")
                        if (set.block) {
                            await clients.updateBlockStatus(hama.from, "block")
                        }
                        await bail.delay(3000) // ben ra spam
                    }
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