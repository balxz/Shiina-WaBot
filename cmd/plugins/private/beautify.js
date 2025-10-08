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
const beautify = require("js-beautify")
module.exports = {
    alias: ["beautify"],
    command: ["prettier"],
    tags: ["private"],
    desc: ["prettier ur code"],
    private: false,
    handler: async m => {
        if (!m.quoted)
            return m.reply(await m.detect("[ 🪷 ] balas codenya nya"))
        let b = beautify(m.quoted.text, {
            indent_size: 4,
            space_in_empty_paren: true
        })
        return m.reply(b)
    }
}