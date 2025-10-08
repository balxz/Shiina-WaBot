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
    alias: ["help"],
    command: ["menu"],
    tags: ["assisten"],
    owner: false,
    handler: async (m, { prefix, db, jam, tggl, runtime }) => {
        let abcd = `*乂 ɪ ɴ ғ ᴏ  ᴜ s ᴇ ʀ*\n`
        abcd += `> *name : ${m.pushName.toLowerCase() || "-"}*\n`
        abcd += `> *number : ${"0" + m.sender.split("@")[0].slice(2)}*\n`
        abcd += `> *role : ${db.get("user", m.sender).role}*\n`
        abcd += `–\n`
        abcd += `*乂 ᴛ ᴏ ᴅ ᴀ ʏ*\n`
        abcd += `> *hour : ${jam()} WIB*\n`
        abcd += `> *days : ${tggl()}*\n`
        abcd += `> *runtime : ${runtime()}*\n\n`
        abcd += "*乂 ᴍ ᴇ ɴ ᴜ  ᴀ ʟ ʟ*\n"
        abcd += String.fromCharCode(8206).repeat(4001)
        let cmd = Func.menu()
        for (let k in cmd) {
          abcd += `*— ${k.toUpperCase()}*\n`
          abcd += cmd[k].map(x => `> 々 *${prefix+x.name}*${x.desc ? ` (${x.desc})` : ""}`).join("\n") + "\n\n"
        }
        abcd += `\`${set.wm + set.pack}\``
        
        let bton = [
          {
            name: "single_select",
            buttonParamsJson: JSON.stringify({
              title: "",
              sections: [
                {
                  title: "",
                  rows: []
                }
              ]
            })
          },
          {
            name: "open_webview",
            buttonParamsJson: JSON.stringify({
              title: ">_< 🪷",
              link: {
                in_app_webview: true,
                url: "https://balxzzy.web.id"
              }
            })
          },
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "insta >_< 🪴",
              url: "https://www.instagram.com/iqstore78"
            })
          }
        ]
        
        return await m.sendBtnDocu({
          title: "Shiina-WaBot v1.5.4",
          body: set.wm + set.pack,
          text: abcd,
          fileName: "@iqstore78",
          docFilePath: "./src/declare/Database.js",
          headerFilePath: "./src/declare/image/api.png",
          adThumbnailPath: "./src/declare/image/picture.png",
          bottomSheetTitle: "ShiinaBot",
          bottomSheetButtonTitle: "SECTIONS",
          buttons: bton
        })
    }
}