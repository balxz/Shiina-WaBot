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
    alias: ["help"],
    command: ["menu"],
    tags: ["assisten"],
    owner: false,
    handler: async (m, { db, jam, tggl, runtime }) => {
        let abcd = `*乂 ɪ ɴ ғ ᴏ  ᴜ s ᴇ ʀ*\n`
        abcd += `> *name : ${m.pushName.toLowerCase()}*\n`
        abcd += `> *number : ${"0" + m.sender.split("@")[0].slice(2)}*\n`
        abcd += `> *role : ${db.get("user", m.sender).role}*\n`
        abcd += `–\n`
        abcd += `*乂 ᴛ ᴏ ᴅ ᴀ ʏ*\n`
        abcd += `> *hour : ${jam()} WIB*\n`
        abcd += `> *days : ${tggl()}*\n`
        abcd += `> *runtime : ${runtime()}*\n\n`
        abcd += "*乂 ᴍ ᴇ ɴ ᴜ  ᴀ ʟ ʟ*\n"
        abcd += String.fromCharCode(8206).repeat(4001)
        let cmd = Func.menu()
        for (let k in cmd) {
            abcd += `*— ${k.toUpperCase()}*\n`
            abcd +=
                cmd[k]
                    .map(x => `> 々 *${x.name}*${x.desc ? ` (${x.desc})` : ""}`)
                    .join("\n") + "\n\n"
        }
        abcd += `\`${set.wm + set.pack}\``

        return m.reply(abcd)
    }
}
