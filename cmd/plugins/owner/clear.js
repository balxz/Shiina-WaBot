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
  alias: ["csesi"],
  command: ["clear"],
  tags: ["owner"],
  desc: ["clear session"],
  owner: true,
  handler: async (m, { }) => {
    let cwd = process.cwd()
        fs.readdirSync(`${cwd}/src/session`).filter(v => v !== "creds.json").forEach(f => fs.rmSync(`${cwd}/src/session/${f}`))
    m.reply("```successfully cleaned sesi folder file```")
  }
}