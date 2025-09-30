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
    alias: ["mf", "mfdl"],
    command: ["mediafire"],
    tags: ["downloader"],
    desc: ["dl mediafire with url"],
    owner: false,
    handler: async (m, { cmd, text }) => {
        if (!text)
            return m.reply(
                `[ 🪷 ] where url?\n> ex: ${cmd} https://www.mediafire.com/file/qdwf39n0bo1pmt3/Better+Days+Played+v1.1.3.mcpack`
            )

        let aa = await apis
            .get("/api/v2/d/mediafire", { url: text })
            .catch(e => m.reply(e))

        let cap = "乂 *MEDIA - FIRE*\n"
        cap += `- ${aa.route}\n`
        cap += `> ${aa.data.upload}\n`

        // let c = await axios.get(aa.data.download)
        // let b = Buffer.from(c.data)

        return await clients.sendMessage(
            m.chat,
            {
                document: { url: aa.data.download },
                fileName: aa.data.filename,
                mimetype: aa.data.mimetype,
                caption: cap
            },
            { quoted: m }
        )
    }
}
