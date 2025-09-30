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
    alias: ["spotifys", "sps"],
    command: ["spotifys"],
    tags: ["search"],
    desc: ["spotify search track"],
    owner: false,
    handler: async (m, { prefix, cmd, text }) => {
        if (!text) {
            return m.reply(
                `[ 🪷 ] where query?\n> ex: ${prefix + cmd} duka last child`
            )
        }

        let aa = await apis
            .get("/api/v2/s/spotify", { q: text })
            .catch(e => m.reply(e))

        let res = aa.data
        if (!res || res.length === 0) {
            return m.reply("no results found")
        }

        let cap = "乂 *SPOTIFY SEARCH*\n"
        cap += `${aa.route}\n`
        cap += `? use *${prefix}spotifydl <url>* — for downloading\n\n`
        res.forEach((item, i) => {
            cap += `— ${item.title + " " + i + 1}\n`
            cap += `> artist: ${item.artist}\n`
            cap += `> album: ${item.album}\n`
            cap += `> duration: ${item.duration}\n`
            cap += `> release: ${item.release_date}\n`
            cap += `> url: ${item.url}\n\n`
        })

        await clients.sendMessage(
            m.chat,
            {
                text: cap,
                contextInfo: {
                    externalAdReply: {
                        body: "Spotify Search",
                        thumbnailUrl: res[0].thumbnail
                    }
                }
            },
            { quoted: m }
        )
    }
}
