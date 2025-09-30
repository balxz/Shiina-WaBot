let chalk = require("chalk")
let CFonts = require("cfonts")
let gradient = require("gradient-string")
let Func = require("./src/declare/Func")

let g1 = gradient(["#FF6B9D", "#C44569", "#8B5CF6", "#6366F1"])
let g2 = gradient(["#06b6d4", "#3b82f6", "#8b5cf6"])

console.clear()

CFonts.say("SHIINA", {
    font: "block",
    align: "center",
    colors: ["#FF6B9D", "#C44569"],
    background: "transparent",
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: "0",
    gradient: ["#FF6B9D", "#8B5CF6"],
    independentGradient: false,
    transitionGradient: true,
})

console.log("\n")
console.log(chalk.cyan("═".repeat(60)))
console.log(chalk.bold.white("               WhatsApp Bot WhiskeySockets"))
console.log(chalk.cyan("═".repeat(60)))
console.log(chalk.hex("#FF6B9D")("   Created by  : ") + chalk.bold.white("balxzzy"))
console.log(chalk.hex("#8B5CF6")("   Support by  : ") + chalk.bold.white("Shiina API"))
console.log(chalk.hex("#06b6d4")("   Version     : ") + chalk.bold.white("1.0.0"))
console.log(chalk.hex("#10b981")("   Status      : ") + chalk.bold.greenBright("Active"))
console.log(chalk.cyan("═".repeat(60)))
console.log("\n")

let f = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
let steps = [
    { t: "Initializing Shiina Bot", c: g1 },
    { t: "Loading Modules", c: g2 },
    { t: "Connecting To WhatsApp", c: (x) => chalk.hex("#8B5CF6")(x) }
]

let si = 0
let fr = 0
let counter = 0

let intv = setInterval(() => {
    let s = steps[si]
    process.stdout.clearLine(0)
    process.stdout.cursorTo(0)
    process.stdout.write(chalk.cyan(f[fr]) + " " + s.c(s.t))  
    fr = (fr + 1) % f.length
    counter++
    if (counter % 10 === 0) {
        si++
        if (si >= steps.length) si = steps.length - 1
    }
}, 80)

setTimeout(() => {
    clearInterval(intv)
    process.stdout.clearLine(0)
    process.stdout.cursorTo(0)
    console.log(chalk.bold.greenBright("SHIINA WABOT IS ONLINE"))
    let abcd = Func.menu()
    let apcb = Object.values(abcd).reduce((a, b) => a + b.length, 0)
    //console.log()
    console.log(chalk.bold.hex("#FF6B9D")("TOTAL FEATURES: " + apcb))
    /*for (let cat in menu) {
        menu[cat].forEach(item => {
            console.log(chalk.white("  • " + item.name))
        })
    }*/
    
    //console.log(chalk.cyan("  ━".repeat(30)))
    console.log(chalk.bold.hex("#06b6d4")("Writing, request pairing...\n"))
    //console.log(chalk.gray("  ─".repeat(60)))
    //console.log("\n")
    
    try {
        require("./connect.js")
    } catch (e) {
        console.log("\n")
        console.log(chalk.red("  ═".repeat(30)))
        console.log(chalk.bold.red("   ERROR"))
        console.log(chalk.red("  ═".repeat(30)))
        console.log(chalk.white("  " + e.message))
        console.log(chalk.red("  ═".repeat(30)))
        console.log("\n")
        process.exit(1)
    }
}, 3500)

process.on("unhandledRejection", (e) => {
    console.log("\n")
    console.log(chalk.yellow("  ═".repeat(30)))
    console.log(chalk.bold.yellow("    Unhandled Rejection"))
    console.log(chalk.yellow("  ═".repeat(30)))
    console.log(chalk.white("  " + e.message))
    console.log(chalk.yellow("  ═".repeat(30)))
    console.log("\n")
})

process.on("uncaughtException", (e) => {
    console.log("\n")
    console.log(chalk.red("  ═".repeat(30)))
    console.log(chalk.bold.red("   Uncaught Exception"))
    console.log(chalk.red("  ═".repeat(30)))
    console.log(chalk.white("  " + e.message))
    console.log(chalk.red("  ═".repeat(30)))
    console.log("\n")
    process.exit(1)
})