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
module.exports = {
    alias: ["link", "gclink"],
    command: ["linkgc"],
    tags: ["group"],
    group: true,
    botadmin: true,
    handler: async m => {
        let a = await clients.groupMetadata(m.chat)
        let kntl = `> — ( *${a.subject}* )\n`
        kntl += `> ( *${a.id}* )\n`
        kntl += `> https://chat.whatsapp.com/${await clients.groupInviteCode(
            m.chat
        )}\n`
        kntl += a.desc || ""
        return m.reply(kntl)
    }
}
