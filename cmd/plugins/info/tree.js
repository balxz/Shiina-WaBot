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
const fs = require("fs")
const path = require("node:path")

module.exports = {
    alias: [],
    command: ["tree"],
    tags: ["info"],
    desc: ["structure file"],
    owner: false,
    handler: async m => {
        let dir = process.cwd()
        let kecuali = ["node_modules", "src/session", ".npm", ".cache", ".git"]
        let tree = ""
        let traverse = (dir, prefix = "") => {
            let files = fs.readdirSync(dir)
            files.forEach((file, index) => {
                let full = path.join(dir, file)
                if (kecuali.some(k => full.includes(k))) return
                let last = index === files.length - 1
                tree += prefix + (last ? "└── " : "├── ") + file + "\n"
                if (fs.statSync(full).isDirectory()) {
                    traverse(full, prefix + (last ? "    " : "│   "))
                }
            })
        }
        traverse(dir)
        m.reply(tree)
    }
}