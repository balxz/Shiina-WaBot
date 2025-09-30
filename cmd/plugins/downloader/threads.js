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
    alias: ["thrds", "thrdl", "th"],
    command: ["threads"],
    tags: ["downloader"],
    desc: ["dl threads media"],
    owner: false,
    handler: async (m, { cmd, text }) => {
        if (!text) {
            return m.reply(
                `[ 🪷 ] where url?\n> ex: ${cmd} https://www.threads.com/@nurainiharapan/post/DO5ObbUEryW?xmt=AQF0bpBhnPfRKYbls2Fi25yL8pdqXAPn1ODKID-xABlKCw&slof=1`
            )
        }

        let aa = await apis
            .get("/api/v2/d/threads", { url: text })
            .catch(e => m.reply(e))

        let res = aa.data
        let cap = "乂 *THREADS*\n"
        cap += `${aa.route}\n`
        if (res.description) cap += `${res.description}\n`

        if (res.video_urls && res.video_urls.length > 0) {
            for (let vid of res.video_urls) {
                await clients.sendMessage(
                    m.chat,
                    {
                        video: { url: vid },
                        caption: cap
                    },
                    { quoted: m }
                )
            }
        }

        if (res.image_urls && res.image_urls.length > 0) {
            let album = res.image_urls.map(img => ({
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
