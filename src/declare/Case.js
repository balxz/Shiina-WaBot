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
const Case = {
    get: (n) => {
        let c = fs.readFileSync(process.cwd() + "/cmd/case-wa.js", "utf8"),
            r = /case .*?:/g,
            f = (c.match(r) || []).find(v => v.includes(n))
        if (!f) return null
        let s = c.indexOf(f),
            b = c.indexOf("{", s),
            i = b + 1,
            x = 1
        while (x && i < c.length) c[i++] == "{" ? x++ : c[i - 1] == "}" && x--
        return c.slice(s, i)
    },
    add: (cod) => {
        let c = fs.readFileSync(process.cwd() + "/cmd/case-wa.js", "utf8")
        let r = /case\s+["'`](.*?)["'`]\s*:/g, m
        while ((m = r.exec(c)) !== null) {
            if ([`"`, `'`, "`"].some(q => cod.includes(`case ${q}${m[1]}${q}`))) {
                throw `case "${m[1]}" udah ada tolol`
            }
        }
        let p = c.lastIndexOf("default:")
        if (p == -1) throw "default: ga ketemu tolol"
        let out = c.slice(0, p) + "\n  " + cod.trim() + "\n\n  " + c.slice(p)
        fs.writeFileSync(process.cwd() + "/cmd/case-wa.js", out)
    },
    delete: (ky) => {
        let c = fs.readFileSync(process.cwd() + "/cmd/case-wa.js", "utf8")
        let r = new RegExp(`case\\s+["'\`]${ky}["'\`]\\s*:\\s*`)
        let m = c.match(r)
        if (!m) throw "case ga ketemu tolol"
        let s = c.indexOf(m[0])
        let b = c.indexOf("{", s)
        if (b === -1) throw "blok { ga ada tolol"
        let x = 1, i = b + 1
         while (x && i < c.length) {
           if (c[i] === "{") x++
           else if (c[i] === "}") x--
           i++
         }
         let out = c.slice(0, s) + c.slice(i)
         fs.writeFileSync(process.cwd() + "/cmd/case-wa.js", out)
    },
    list: () => {
        return Func.menu()
    }
}

module.exports = Case