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
const path = require("path")

module.exports = {
    alias: ["plug"],
    command: ["plugins"],
    tags: ["owner"],
    desc: ["plugins manager"],
    owner: true,
    handler: async (m, { text }) => {
        let files = []
        function readDir(dir) {
            for (let file of fs.readdirSync(dir)) {
                let filePath = path.join(dir, file)
                let stat = fs.statSync(filePath)
                if (stat.isDirectory()) {
                    readDir(filePath)
                } else if (file.endsWith(".js")) {
                    files.push(path.relative("cmd/plugins", filePath))
                }
            }
        }
        readDir("cmd/plugins")

        let t = (text || m.quoted?.text || "").trim()
        if (!t) {
            return m.reply(`— 乂 Panduan Cara Pakai
> 1. *--get <no>* untuk mengambil plugin
> 2. *--add <nama.js>* untuk menambahkan plugin (reply kode)
> 3. *--del <no>* untuk menghapus plugin

> *– 乂 Daftar Plugin yang Tersedia :*
${files.map((x, i) => `> *${i + 1}*. ${x}`).join("\n")}`)
        }

        if (/--get/i.test(t)) {
            let n = parseInt(t.replace(/--get/i, "").trim())
            if (isNaN(n) || n < 1 || n > files.length)
                return m.reply(
                    `[ 🪷 ] pilih angka yang ada di daftar plugin\n${files
                        .map((x, i) => `> — *${i + 1}*. ${x}`)
                        .join("\n")}`
                )
            return m.reply(
                fs.readFileSync(
                    path.resolve("cmd/plugins", files[n - 1]),
                    "utf8"
                )
            )
        }

        if (/--add/i.test(t)) {
            let r = t.replace(/--add/i, "").trim()
            if (!r) return m.reply("[ 🪷 ] nama file nya?\n> ex: info/os.js")
            if (!m.quoted?.text) return m.reply("[ 🪷 ] — reply kodenya")
            if (!r.endsWith(".js"))
                return m.reply("[ 🪷 ] file harus .js\n> ex: info/os.js")
            let a = path.resolve("cmd/plugins", r)
            fs.mkdirSync(path.dirname(a), { recursive: true })
            fs.writeFileSync(a, m.quoted.text, "utf8")
            return m.reply(
                `[ 🪷 ] plugin ditambahkan *plugins/${r}*\n${files
                    .map((x, i) => `> — *${i + 1}*. ${x}`)
                    .join("\n")}`
            )
        }

        if (/--del+/i.test(t)) {
            let n = parseInt(t.replace(/--del+/i, "").trim())
            if (isNaN(n) || n < 1 || n > files.length)
                return m.reply(
                    `[ 🪷 ] pilih angka yang ada di daftar plugin\n${files
                        .map((x, i) => `> — *${i + 1}*. ${x}`)
                        .join("\n")}`
                )
            let target = path.resolve("cmd/plugins", files[n - 1])
            fs.unlinkSync(target)
            return m.reply(
                `[ 🪷 ] plugin ${files[n - 1]} dihapus\n${files
                    .map((x, i) => `> — *${i + 1}*. ${x}`)
                    .join("\n")}`
            )
        }
    }
}