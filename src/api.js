/** 
    * buat bot tele 
**/
const fs = require("node:fs")
const axios = require("axios")

class API {
  async yts(q) {
    const r = await axios.get(`https://ytdl.siputzx.my.id/search/`, {
      params: { q },
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "sec-ch-ua": '"Chromium";v="137", "Not/A)Brand";v="24"',
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": '"Android"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        referrer: "https://ytdl.siputzx.my.id/swagger"
      }
    })
    return r.data.data.results || []
  }

  async ytdl(u) {
    let a = await axios.get(`https://anabot.my.id/api/download/ytmp3?url=${u}&apikey=freeApikey`).then(a => a.data.data.result)
    return a
  }
}

module.exports = API

let f = require.resolve(__filename)
fs.watchFile(f, () => {
    fs.unwatchFile(f)
    console.log(`~> UPDATE [ 🪷 ] ${f}`)
    delete require.cache[f]
    require(f)
})