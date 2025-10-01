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

global.owner = {
    no: ["628"],
    name: "balxzzy"
}

global.set = {
    prefix: ["!", "."], // prefix: false — no prefix
    self: true, // false self
    read: false, // true? read new cht
    anticall: true, // rejected pas di tlp
    block: false, //?? true bakal auto block yang tlp
    frmBot: false, // ?true? bot GK respon dri sendiri
    wm: "ˢʰⁱⁱⁿᵃ ᵇᵒᵗ ᵐᵃᵈᵉ ", // set u wm
    pack: "ʷⁱᵗʰ ᵇᵃˡˣᶻᶻʸ" // stc
}


global.pair = {
    no: "628",
    isPair: true, // false qr code
    sesi: "src/session" 
}


/** tele connection bot token **/
global.bot = {
    on: false, // false bot tele nya mati || true nyala
    own: 629XXXXX, // id owner bot tele
    id: [
        "" // isi token tele mu, klau mau lebih salin copy 
    ]
}

/** settup Shiina api's **/
global.api = {
    url: "https://balxzzy.web.id",
    key: "Your Apikey" // login untuk claim free key di profile
}

/** ━━━━━━━━━━━━━━━━━━━━━━━━━ **/
/** assign to global **/
global.fs = require("fs")
global.axios = require("axios")
global.chalk = require("chalk")
global.bail = require("@sh/bot")
global.tg = require("@sh/tg")
global.apis = require("#src/utils/apis")(api.url, api.key)
global.start = Date.now()
global.Func = require("#declare/Func")

let f = require.resolve(__filename)
fs.watchFile(f, () => {
    fs.unwatchFile(f)
    console.log(`~> UPDATE [ 🪷 ] ${f}`)
    delete require.cache[f]
    require(f)
})