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
const { execSync } = require("child_process")
const fs = require("fs")

module.exports = {
    alias: ["bckp"],
    command: ["backup"],
    tags: ["owner"],
    desc: ["backup project"],
    owner: true,
    handler: async m => {
        let exclude = ["node_modules", "package-lock.json", ""]
        let ls = execSync("ls")
            .toString()
            .split("\n")
            .filter(f => !exclude.includes(f))
        let zipFile = "backup.zip"
        execSync(`zip -r ${zipFile} ${ls.join(" ")}`)
        await clients.sendMessage(
            m.chat,
            {
                document: fs.readFileSync(`./${zipFile}`),
                fileName: zipFile,
                mimetype: "application/zip"
            },
            {
                quoted: m
            }
        )
        fs.unlinkSync(`./${zipFile}`)
    }
}
