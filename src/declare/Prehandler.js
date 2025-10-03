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

exports.is = async (m) => {
  if (!m.message) return

  let bbi = { participants: [], subject: "-" }
    if (m.isGroup) {
      bbi = (await clients.groupMetadata(m.chat).catch(e => {
        console.log(e.stack)
        return null
      })) || { participants: [], subject: "-" }
    }

  return {
    owner: owner.no.map(a => a + "@s.whatsapp.net").includes(m.sender),
    group: m.isGroup,
    private: !m.isGroup,
    admin: m.isGroup ? bbi.participants?.some(v => v.admin && v.jid === m.sender) : false,
    botadmin: m.isGroup ? bbi.participants?.some(v => v.admin && v.jid === clients.decodeJid(clients.user.id)) : false
  }
}

let f = require.resolve(__filename)
fs.watchFile(f, () => {
  fs.unwatchFile(f)
  console.log(`~> UPDATE [ 🪷 ] ${f}`)
  delete require.cache[f]
  require(f)
})
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
//const fs = require("fs")
//require("#src/configs")

//exports.is = async (m) => {
//  let a = m.isGroup ? m.key.participant : m.key.remoteJid
//  let mtdt = { participants: [], subject: "-" }

//  if (m.isGroup) {
//    if (clients?.ws?.readyState === 1) {
//      mtdt = await clients.groupMetadata(m.chat)
//    }
//  }

//  let isAdmin = (jid) => {
//    return mtdt.participants.some(v => v?.admin && v.jid === jid)
//  }

//  return {
//    owner: [...owner.no.map((x) => x + "@s.whatsapp.net")].includes(a),
//    group: m.isGroup,
//    private: !m.isGroup,
//    admin: isAdmin(a) || false,
//    botadmin: isAdmin(clients.decodeJid(clients.user.id)) || false 
//  }
//}