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
const fs = require("fs")
require("#src/configs")

exports.is = async (m) => {
  let a = m.isGroup ? m.key.participant : m.key.remoteJid
  let mtdt = { participants: [], subject: "-" }

  if (m.isGroup) {
    try {
      if (clients?.ws?.readyState === 1) {
        mtdt = await clients.groupMetadata(m.chat)
      } else {
        console.log("Clients not found, skip metadata grup.")
      }
    } catch (e) {
      console.error("Error groupMetadata\n", e.message)
    }
  }

  return {
    owner: [...owner.no.map((x) => x + "@s.whatsapp.net")].includes(a),
    group: m.isGroup,
    private: !m.isGroup,
    admin: m.isGroup ? mtdt.participants.some(v => v?.admin && v.id === a) : false,
    botadmin: m.isGroup ? mtdt.participants.some(v => v?.admin && v.id === clients.decodeJid(clients.user.id)) : false,
  }
}

let f = require.resolve(__filename)
fs.watchFile(f, () => {
  fs.unwatchFile(f)
  console.log(`~> UPDATE [ 🪷 ] ${f}`)
  delete require.cache[f]
  require(f)
})