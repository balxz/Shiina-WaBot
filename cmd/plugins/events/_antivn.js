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
exports.all = true
exports.handler = async function (m, { is, db }) {
    let chtny = db.get("group", m.chat)
    let isVn = m.mtype
    if (chtny.antivn) {
        if (/audioMessage/i.test(isVn)) {
            if (!is.admin || is.botadmin) {
                await clients.sendMessage(m.chat, { delete: m.key })
                await m.reply("[ 🪷 ] admin melarang adanya *vn*/*audio*")
            }
        }
    }
    return !0
}
