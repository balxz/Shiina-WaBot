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

const path = require("path")

module.exports = {
    alias: ["gh", "ghdl"],
    command: ["github"],
    tags: ["downloader"],
    desc: ["dl gh repo file and gist"],
    owner: false,
    handler: async (m, { cmd, text }) => {
        if (!text)
            return m.reply(
                `[ 🪷 ] where url?\n> ex: ${cmd} https://github.com/balxz/swagger-nextjs`
            )

        let res = await apis
            .get("/api/v2/d/github", { url: text })
            .catch(e => m.reply(e))

        if (!res?.data) return m.reply("no data found")
        let data = res.data
        let fileUrl = ""
        let fileName = ""
        let mimeType = "application/octet-stream"
        let cap = ""

        if (data.type === "repository") {
            fileUrl = data.download
            fileName = `${data.name}-${data.default_branch}.zip`
            mimeType = "application/zip"
            cap = `乂 *GITHUB - REPO*\n`
            cap += `- owner: ${data.owner}\n`
            cap += `- description: ${data.description || "-"}\n`
            cap += `- default branch: ${data.default_branch}\n`
            cap += `- stars: ${data.stars}\n`
            cap += `- forks: ${data.forks}\n`
            cap += `- download: ${data.download}\n`
            cap += `- clone: ${data.clone}\n`

            return await clients.sendMessage(
                m.chat,
                {
                    document: { url: fileUrl },
                    fileName,
                    mimetype: mimeType,
                    caption: cap
                },
                { quoted: m }
            )
        } else if (data.type === "file") {
            fileUrl = data.raw_url
            fileName = data.name
            let ext = path.extname(fileName).slice(1)
            switch (ext) {
                case "js":
                    mimeType = "application/javascript"
                    break
                case "json":
                    mimeType = "application/json"
                    break
                case "md":
                    mimeType = "text/markdown"
                    break
                case "html":
                    mimeType = "text/html"
                    break
                case "css":
                    mimeType = "text/css"
                    break
                case "png":
                    mimeType = "image/png"
                    break
                case "jpg":
                case "jpeg":
                    mimeType = "image/jpeg"
                    break
                case "gif":
                    mimeType = "image/gif"
                    break
                default:
                    mimeType = "application/octet-stream"
            }
            cap = `乂 *GITHUB - FILE*\n`
            cap += `- owner: ${data.owner}\n`
            cap += `- branch: ${data.branch}\n`
            cap += `- path: ${data.path}\n`
            cap += `- size: ${data.size} bytes\n`
            cap += `- api: ${data.api_url}\n`

            return await clients.sendMessage(
                m.chat,
                {
                    document: { url: fileUrl },
                    fileName,
                    mimetype: mimeType,
                    caption: cap
                },
                { quoted: m }
            )
        } else if (data.type === "gist") {
            for (let file of data.data) {
                fileUrl = file.raw
                fileName = file.name
                let ext = path.extname(fileName).slice(1)
                switch (ext) {
                    case "js":
                        mimeType = "application/javascript"
                        break
                    case "json":
                        mimeType = "application/json"
                        break
                    case "rb":
                        mimeType = "text/x-ruby"
                        break
                    case "md":
                        mimeType = "text/markdown"
                        break
                    default:
                        mimeType = "application/octet-stream"
                }
                cap = `乂 *GITHUB - GIST*\n`
                cap += `- gist id: ${data.gist_id}\n`
                cap += `- owner: ${data.owner}\n`
                cap += `- description: ${data.description || "-"}\n`
                cap += `- file name: ${file.name}\n`
                cap += `- language: ${file.language || "-"}\n`
                cap += `- size: ${file.size} bytes\n`

                await clients.sendMessage(
                    m.chat,
                    {
                        document: { url: fileUrl },
                        fileName,
                        mimetype: mimeType,
                        caption: cap
                    },
                    { quoted: m }
                )
            }
            return
        } else {
            return m.reply("unsupported github type")
        }
    }
}
