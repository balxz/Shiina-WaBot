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
const chalk = require("chalk")
const moment = require("moment")

module.exports = async (m, clients) => {
  if (!m.message) return
  let isgr = m.isGroup, bbi = {}
  if (isgr) try { bbi = await clients.groupMetadata(m.chat) } catch {}
  let t = isgr ? {
    p: chalk.hex("#FF6B8B"),
    s: chalk.hex("#60D7A9"),
    a: chalk.hex("#FFD166"),
    tx: chalk.hex("#FCFCFC"),
    b: chalk.hex("#FF6B8B")
  } : {
    p: chalk.hex("#7BB0FF"),
    s: chalk.hex("#FF9E6D"),
    a: chalk.hex("#C597FF"),
    tx: chalk.hex("#FCFCFC"),
    b: chalk.hex("#7BB0FF")
  }
  let em = {
    gr: ["🏠", "👥", "🗣️", "🔊", "🎪"],
    priv: ["👤", "🤫", "🔒", "💌", "📩"],
    ti: timoji()
  }
  let se = isgr ? em.gr[Math.floor(Math.random() * em.gr.length)] : em.priv[Math.floor(Math.random() * em.priv.length)]
  let tim = moment().format("YYYY-MM-DD HH:mm:ss")

  let groupName = bbi?.subject || "-"
  let chatId = isgr ? (bbi?.id || "-") : m.chat
  let userName = m.pushName || "-"
  let userNumber = m.sender ? "0" + m.sender.split("@")[0].slice(2) : "-"
  let messageType = m.mtype || "-"
  let messageBody = m.body || "-"

  let he = [
    t.b("╔" + "═".repeat(35)),
    t.b("║") + t.p(`   ${se}  ${isgr ? "G R O U P  C H A T" : "P R I V A T E  C H A T"}  ${em.ti}  `),
  ].join("\n")

  let co = [
    t.b("║ ") + t.s("⌚ Time:    ") + t.tx(tim),
    t.b("║ ") + t.s("🏷️ Group:   ") + t.tx(groupName),
    t.b("║ ") + t.s("📋 ID:      ") + t.tx(chatId),
    t.b("║ ") + t.s("👤 User:    ") + t.tx(userName),
    t.b("║ ") + t.s("📞 Number:  ") + t.tx(userNumber),
    t.b("║ ") + t.s("🔗 Type:    ") + t.tx(messageType),
    t.b("╚" + "═".repeat(35)),
    t.a("— message — "),
    t.tx(messageBody)
  ].join("\n")
  
  let outp = [he, co].join("\n")
  console.log(outp + "\n")
}

function timoji() {
  let hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return "🌅"
  if (hour >= 12 && hour < 17) return "🌞"
  if (hour >= 17 && hour < 20) return "🌇"
  return "🌙"
}

let f = require.resolve(__filename)
if (global.fs) {
  fs.watchFile(f, () => {
    fs.unwatchFile(f)
    console.log(chalk.hex("#FF6B8B")(`~> ${timoji()} UPDATE [ 🪷 ] ${f}`))
    delete require.cache[f]
    require(f)
  })
}