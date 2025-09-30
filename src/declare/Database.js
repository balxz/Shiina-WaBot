/** 
    Source
    github.com/AxellNetwork/NekoBot/blob/master/lib/database.js
**/

require("#src/configs")
const fs = require("node:fs")
const path = require("node:path")

class Database {
  #data
  constructor(filename) {
    this.databaseFile = path.join(".", filename)
    this.#data = {}
  }

  default = () => {
    return {
      user: {},
      group: {},
      settings: {
        autobackup: true,
        autocleartmp: true, 
        gconly: false,
        self: set.self,
        read: set.read,
        anticall: set.anticall,
        block: set.block,
        frombot: set.frmBot
      },
    }
  }

  init = async () => {
    const data = await this.read()
    this.#data = { ...this.default(), ...data }
    return this.#data
  }

  read = async () => {
    if (fs.existsSync(this.databaseFile)) {
      const data = fs.readFileSync(this.databaseFile)
      return JSON.parse(data)
    } else {
      return this.default()
    }
  }

  save = async () => {
    const jsonData = JSON.stringify(this.#data, null, 2)
    fs.writeFileSync(this.databaseFile, jsonData)
  }

  add = async (type, id, newData) => {
    if (!this.#data[type]) return `data *${type}* tidak ditemukan.`
    if (!this.#data[type][id]) {
      this.#data[type][id] = newData
    }
    await this.save()
    return this.#data[type][id]
  }

  delete = async (type, id) => {
    if (this.#data[type] && this.#data[type][id]) {
      delete this.#data[type][id]
      await this.save()
      return `*${type}* dengan ID ${id} telah dihapus.`
    } else {
      return `*${type}* dengan ID ${id} tidak ditemukan.`
    }
  }

  get = (type, id) => {
    if (this.#data[type] && this.#data[type][id]) {
      return this.#data[type][id]
    } else {
      return `*${type}* dengan ID ${id} tidak ditemukan.`
    }
  }

  main = async (m) => {
    await this.read()
    if (m.isGroup) {
      await this.add("group", m.chat, {
        mute: false,
        antivn: false,
        autodown: false,
        warning: {
            toxic: 0,
            promosi: 0,
            link: 0,
            spam: 0
        },
        sewa: {
          status: false,
          expired: 0,
        }
      })
    }
    await this.add("user", m.sender, {
      name: "?",
      role: "Beginner",
      limit: 50,
      register: false,
      rpg: {
        balance: 0,
      },
      level: 1,
      store: {
        saldo: 0,
        vip: false,
      },
      premium: {
        status: false,
        expired: 0,
      },
      banned: {
        status: false,
        expired: 0,
      },
    })
    await this.save()
    return this.list()
  }

  list = () => {
    return this.#data
  }
}

module.exports = Database
let f = require.resolve(__filename)
fs.watchFile(f, () => {
    fs.unwatchFile(f)
    console.log(`~> UPDATE [ 🪷 ] ${f}`)
    delete require.cache[f]
    require(f)
})