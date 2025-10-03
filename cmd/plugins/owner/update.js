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
  alias: ["update", "up", "upd"],
  command: ["update"],
  tags: ["owner"],
  desc: ["update sc with url"],
  owner: true,
  handler: async (m, { text, prefix, cmd }) => {
    let a = text.split(" ")
    if (a.length < 1) {
      return m.reply(`[ 🪷 ] where url?\n> ex: *${prefix + cmd}* https://github.com/balxz/Shiina-WaBot/blob/master/cmd/plugins/menu.js`)
    }

    let urls = a.filter(x => x.startsWith("http"))
    if (urls.length < 1) {
      return clients.sendMessage(m.chat, { text: `this a github url?\n> ex: *${prefix + cmd}* https://github.com/balxz/Shiina-WaBot/blob/master/cmd/plugins/menu.js` }, { quoted: m })
    }

    let s = await clients.sendMessage(m.chat, { text: "[ 🪷 ] downloading..." }, { quoted: m })
    let k = s.key
    let updated = []

    for (let u of urls) {
      try {
        if (!u.includes("/blob/")) continue

        let raw = u.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/")
        let parts = u.split("/blob/")
        if (parts.length < 2) continue
        let f = parts[1].split("/").slice(1).join("/")

        let res = await axios.get(raw)
        let p = path.resolve(process.cwd(), f)
        fs.mkdirSync(path.dirname(p), { recursive: true })
        fs.writeFileSync(p, res.data)
        updated.push(f)
      } catch (e) {
        console.log(e.message)
        await clients.sendMessage(m.chat, { text: e.stack, edit: k })
      }
    }
    
    await clients.sendMessage(m.chat, { text: "[ 🪷 ] uploading...", edit: k })

    if (updated.length) {
      await clients.sendMessage(m.chat, { text: "[ 🪷 ] file updated\n" + updated.map(x => "- " + x).join("\n"), edit: k })
      setTimeout(async () => {
        await m.reply("[ 🪷 ] restarting...")
        setTimeout(() => process.exit(1), 3000)
      }, 2000)
    } else {
      await clients.sendMessage(m.chat, { text: "[ 🪷 ] no file updated :(", edit: k })
    }
  }
}