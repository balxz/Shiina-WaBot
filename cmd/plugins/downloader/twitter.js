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
    alias: ["twit", "twdl", "twitdl"],
    command: ["twitter"],
    tags: ["downloader"],
    desc: ["dl twitter media"],
    owner: false,
    handler: async (m, { cmd, text }) => {
        if (!text) {
            return m.reply(
                `[ 🪷 ] where url?\n> ex: ${cmd} https://x.com/elonmusk/status/1234567890`
            )
        }

        let aa = await apis
            .get("/api/v2/d/twitter", { url: text })
            .catch(e => m.reply(e))

        let res = aa.data
        let cap = "乂 *TWITTER*\n"
        cap += `- ${aa.route}\n`
        if (res.description) cap += `- ${res.description}\n`

        if (res.type === "video") {
            for (let vid of res.media) {
                await clients.sendMessage(
                    m.chat,
                    {
                        video: { url: vid.url },
                        caption: cap
                    },
                    { quoted: m }
                )
            }
        }

        if (res.type === "image") {
            let album = res.media.map(img => ({
                image: { url: img },
                caption: null
            }))
            await m.reply(cap)
            await clients.sendMessage(
                m.chat,
                { albumMessage: album },
                { quoted: m }
            )
        }
    }
}
