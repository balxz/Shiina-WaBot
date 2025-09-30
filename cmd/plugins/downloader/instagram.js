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
    alias: ["ig", "igdl", "instagramdl"],
    command: ["instagram"],
    tags: ["downloader"],
    desc: ["dl instagram media"],
    owner: false,
    handler: async (m, { cmd, text }) => {
        if (!text) {
            return m.reply(
                `[ 🪷 ] where url?\n> ex: ${cmd} https://www.instagram.com/p/DOxzbh2km0a/`
            )
        }

        let aa = await apis
            .get("/api/v2/d/instagram", { url: text })
            .catch(e => m.reply(e))

        let res = aa.data.data
        let cap = "乂 *INSTAGRAM*\n"
        cap += `- ${aa.route}\n`

        if (!res || !res.length) {
            return m.reply("[ 🪷 ] no media found")
        }

        let images = res.filter(v => v.type === "image")
        let videos = res.filter(v => v.type === "video")

        if (images.length > 0) {
            let album = images.map(img => ({
                image: { url: img.url },
                caption: null
            }))
            await m.reply(cap)
            await clients.sendMessage(
                m.chat,
                { albumMessage: album },
                { quoted: m }
            )
        }

        for (let vid of videos) {
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
}
