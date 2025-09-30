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
    alias: ["spotid", "spd"],
    command: ["spotifydl"],
    tags: ["downloader"],
    desc: ["spotify download track"],
    owner: false,
    handler: async (m, { cmd, text }) => {
        if (!text) {
            return m.reply(
                `[ 🪷 ] where url?\n> ex: ${cmd} https://open.spotify.com/track/5eWwqbC7tvgzKyMiNYzaxA`
            )
        }

        let aa = await apis
            .get("/api/v2/d/spotify", { url: text })
            .catch(e => m.reply(e))

        let res = aa.data

        let cap = "乂 *SPOTIFY DOWNLOAD*\n"
        cap += `${aa.route}\n\n`
        cap += `> title: ${res.title}\n`
        cap += `> url: ${text}\n`

        await clients.sendMessage(
            m.chat,
            {
                audio: { url: res.download },
                mimetype: "audio/mpeg",
                fileName: `${res.title}.mp3`,
                contextInfo: {
                    externalAdReply: {
                        title: res.title,
                        body: "Spotify Downloader",
                        thumbnailUrl: res.image,
                        mediaUrl: text,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                },
                caption: cap
            },
            { quoted: m }
        )
    }
}
