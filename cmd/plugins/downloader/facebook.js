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
    alias: ["fb", "fbdl", "facebookdl"],
    command: ["facebook"],
    tags: ["downloader"],
    desc: ["dl facebook media"],
    owner: false,
    handler: async (m, { cmd, text }) => {
        if (!text) {
            return m.reply(
                `[ 🪷 ] where url?\n> ex: ${cmd} https://www.facebook.com/share/v/1Cb7iCiypj/`
            )
        }

        let aa = await apis
            .get("/api/v2/d/facebook", { url: text })
            .catch(e => m.reply(e))

        let res = aa.data
        let cap = "乂 *FACEBOOK*\n"
        cap += `- ${aa.route}\n`
        if (res.description) cap += `- ${res.description}\n`

        await clients.sendMessage(m.chat, {
                video: {
                    url: res.hd
                },
                caption: cap
            },
            { quoted: m }
        )

        await clients.sendMessage(
            m.chat,
            {
                audio: {
                    url: res.mp3
                },
                mimetype: "audio/mpeg",
                fileName: "ppk.mp3"
            },
            {
                quoted: m
            }
        )
    }
}
