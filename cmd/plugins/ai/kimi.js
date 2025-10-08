const fs = require("fs")
const axios = require("axios")
const crypto = require("crypto")

// Simpan sesi ke file
const SESSION_FILE = "./kimi_sessions.json"
function loadSessions() {
  if (!fs.existsSync(SESSION_FILE)) return {}
  return JSON.parse(fs.readFileSync(SESSION_FILE, "utf-8"))
}
function saveSessions(data) {
  fs.writeFileSync(SESSION_FILE, JSON.stringify(data, null, 2))
}

class KimiScraper {
  constructor() {
    this.baseURL = "https://www.kimi.com/api"
    // TOKEN UDAH LANGSUNG DI ISI
    this.token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ1c2VyLWNlbnRlciIsImV4cCI6MTc2MjE1OTU0NSwiaWF0IjoxNzU5NTY3NTQ1LCJqdGkiOiJkM2dkdGVlNnM0dDR2cXFnaHFsMCIsInR5cCI6ImFjY2VzcyIsImFwcF9pZCI6ImtpbWkiLCJzdWIiOiJkM2dkdGVlNnM0dDR2cXFnaHFqZyIsInNwYWNlX2lkIjoiZDNnZHRlNjZzNHQ0dnFxZ2htN2ciLCJhYnN0cmFjdF91c2VyX2lkIjoiZDNnZHRlNjZzNHQ0dnFxZ2htNzAiLCJzc2lkIjoiMTczMTQyOTU0NzY0NTM2MTk3NiIsImRldmljZV9pZCI6Ijc1NTcyODQyNjIwMTQxNDcwODAiLCJyZWdpb24iOiJvdmVyc2VhcyIsIm1lbWJlcnNoaXAiOnsibGV2ZWwiOjEwfX0.CEECs1EyPwYmxdf_NaWGhAbCvV70E_OoaOyrojYGfw72qagasXujNI0Tvg1kYjHqYieeJyCoBMG2xaKwoi9bGg"
    this.deviceId = this.#generateDeviceId()

    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        'accept': 'application/json, text/plain, */*',
        'authorization': `Bearer ${this.token}`,
        'content-type': 'application/json',
        'cookie': `kimi-auth=${this.token}`,
        'origin': 'https://www.kimi.com',
        'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Mobile Safari/537.36',
        'x-language': 'zh-CN',
        'x-msh-device-id': this.deviceId,
        'x-msh-platform': 'web',
        'x-traffic-id': this.deviceId
      }
    })
  }

  #generateDeviceId() {
    return crypto.randomBytes(8).readBigUInt64BE(0).toString()
  }

  async #createChatSession(sessionName) {
    const response = await this.axiosInstance.post('/chat', {
      name: sessionName || "未命名会话",
      born_from: "home",
      kimiplus_id: "kimi",
      is_example: false,
      source: "web",
      tags: []
    })
    return response.data
  }

  #sendMessage(chatId, message) {
    return new Promise((resolve, reject) => {
      const requestData = {
        kimiplus_id: "kimi",
        model: "k2",
        use_search: true,
        messages: [{ role: "user", content: message }]
      }

      this.axiosInstance.post(`/chat/${chatId}/completion/stream`, requestData, {
        responseType: 'stream'
      }).then(response => {
        let fullResponse = ''
        response.data.on('data', chunk => {
          const lines = chunk.toString().split('\n')
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6))
                if (data.event === 'cmpl' && data.text && data.view === 'cmpl') {
                  fullResponse += data.text
                } else if (data.event === 'all_done') {
                  resolve(fullResponse)
                  return
                }
              } catch {}
            }
          }
        })
        response.data.on('error', error => reject(error))
      }).catch(error => reject(error))
    })
  }

  async chat(userId, message) {
    let sessions = loadSessions()
    let chatId = sessions[userId]

    if (!chatId) {
      const session = await this.#createChatSession("Session-" + userId)
      chatId = session.id
      sessions[userId] = chatId
      saveSessions(sessions)
    }

    const result = await this.#sendMessage(chatId, message)
    return result
  }
}

const kimi = new KimiScraper()

module.exports = {
  alias: ["kimi"],
  command: ["kimi"],
  tags: ["ai"],
  desc: ["Chat dengan Kimi AI"],
  owner: false,
  handler: async (m, { text }) => {
    if (!text) return m.reply("Ketik pertanyaan.\nContoh: .kimi halo")

    try {
      let answer = await kimi.chat(m.sender, text)
      await m.reply(answer)
    } catch {
      await m.reply("Gagal ambil jawaban dari Kimi.")
    }
  }
}