/**
    * Source
    * github.com/AxellNetwork/NekoBot/tree/master/scrapers
*/
const chokidar = require("chokidar")
const path = require("node:path")
const fs = require("node:fs")
const { promisify } = require("node:util")
const chalk = require("chalk")

const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)

const Scandir = async (dir) => {
  let subdirs = await readdir(path.resolve(dir))
  let files = await Promise.all(
    subdirs.map(async (subdir) => {
      let res = path.resolve(dir, subdir)
      let isDir = (await stat(res)).isDirectory()
      if (!isDir && res.endsWith(".js")) return res
      return null
    })
  )
  return files.filter(Boolean)
}

class Scraper {
  #src
  constructor(dir) {
    this.dir = path.resolve(dir)
    this.#src = {}
  }

  load = async () => {
    let data = await Scandir(this.dir)
    for (let i of data) {
      let name = path.basename(i, ".js")
      try {
        delete require.cache[i] 
        this.#src[name] = require(i)
      } catch (e) {
        console.log(chalk.red.bold("— failed load scrape —\n" + e))
        delete this.#src[name]
      }
    }
    return this.#src
  }

  watch = async () => {
    const watcher = chokidar.watch(this.dir, {
      persistent: true,
      ignoreInitial: true,
    })

    watcher.on("add", async (filename) => {
      if (!filename.endsWith(".js")) return
      let name = path.basename(filename, ".js")
      delete require.cache[filename]
      this.#src[name] = require(filename)
      console.log(chalk.cyan.bold("— new scrape —\n" + name))
      return this.load()
    })

    watcher.on("change", (filename) => {
      if (!filename.endsWith(".js")) return
      let name = path.basename(filename, ".js")
      delete require.cache[filename]
      this.#src[name] = require(filename)
      console.log(chalk.cyan.bold("— scrape edited —\n" + name))
      return this.load()
    })

    watcher.on("unlink", (filename) => {
      if (!filename.endsWith(".js")) return
      let name = path.basename(filename, ".js")
      delete this.#src[name]
      console.log(chalk.cyan.bold("— scrape deleted —\n" + name))
      return this.load()
    })
  }

  list = () => this.#src
}

module.exports = Scraper