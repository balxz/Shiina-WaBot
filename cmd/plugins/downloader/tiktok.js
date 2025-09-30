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
    alias: ["tt", "ttdl", "tiktokdl"],
    command: ["tiktok"],
    tags: ["downloader"],
    desc: ["dl tiktok video/slide"],
    owner: false,
    handler: async (m, { cmd, text }) => {
        if (!text) {
            return m.reply(
                `[ 🪷 ] where url?\n> ex: ${cmd} https://vt.tiktok.com/ZSDaBakDr`
            )
        }

        let aa = await apis
            .get("/api/v2/d/tiktok", { url: text })
            .catch(e => m.reply(e))

        let res = aa.data
        let cap = "乂 *T I K T O K*\n"
        cap += `- ${aa.route}\n`
        cap += `> — *creator*: ${res.creator}\n`
        cap += `> ${res.description || "-"}\n`

        if (res.type === "slideshow") {
            let album = res.slides.map(slide => ({
                image: { url: slide.original },
                caption: null
            }))
            await m.reply(cap)
            await clients.sendMessage(
                m.chat,
                { albumMessage: album },
                { quoted: m }
            )
        } else if (res.type === "video") {
            await clients.sendMessage(
                m.chat,
                {
                    video: { url: res.download[0] },
                    caption: cap
                },
                { quoted: m }
            )
        }
    }
}
