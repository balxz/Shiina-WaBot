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
  alias: ["set", "setting"],
  command: ["settings"],
  tags: ["owner"],
  desc: ["settings bot"],
  owner: true,

  handler: async (m, { db, text, prefix, cmd }) => {
    let y = db.list().settings

    let ky = {
      1: {
        on: "autobackup",
        msgOn: "*あ* _autobackup dinyalakan._",
        msgOff: "*あ* _autobackup dimatikan._"
      },
      2: {
        on: "autocleartmp",
        msgOn: "*あ* _autocleartmp dinyalakan._",
        msgOff: "*あ* _autocleartmp dimatikan._"
      },
      3: {
        on: "gconly",
        msgOn: "*あ* _gconly dinyalakan._",
        msgOff: "*あ* _gconly dimatikan._"
      }
    }

    if (!text) {
      return await clients.sendMessage(
        m.chat,
        {
          text: `opsi gk ad.\n\nopsi:\n1. autobackup\n2. autocleartmp\n3. gconly\n??ex: ${prefix + cmd} on 1\n??ex: ${prefix + cmd} off 1`
        },
        { quoted: m }
      )
    }

    let [mode, num] = text.trim().split(" ")
    if (!["on", "off"].includes(mode)) {
      return await clients.sendMessage(
        m.chat,
        { text: `dongo, mau on atau off?\n??ex: ${prefix + cmd} on 1` },
        { quoted: m }
      )
    }

    let klz = ky[num]
    if (!klz) {
      return await clients.sendMessage(
        m.chat,
        {
          text: `opsi gk ada\n\n1. autobackup\n2. autocleartmp\n3. gconly`
        },
        { quoted: m }
      )
    }

    let status = mode === "on"
    y[klz.on] = status

    await clients.sendMessage(
      m.chat,
      { text: status ? klz.msgOn : klz.msgOff },
      { quoted: m }
    )
  }
}