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

setTimeout(() => {
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
        require("./connect")
    } catch (e) {
        console.log("\n")
        console.log(chalk.red("═".repeat(10)))
        console.log(chalk.bold.red("ERROR"))
        console.log(chalk.white("" + e.stack))
        console.log(chalk.red("═".repeat(10)))
        console.log("\n")
        process.exit(1)
    }
}, 3500)

process.on("unhandledRejection", (e) => {
    console.log("\n")
    console.log(chalk.yellow("═".repeat(10)))
    console.log(chalk.bold.yellow("Unhandled Rejection"))
    console.log(chalk.white("" + e.stack))
    console.log(chalk.yellow("═".repeat(10)))
    console.log("\n")
})

process.on("uncaughtException", (e) => {
    console.log("\n")
    console.log(chalk.red("═".repeat(10)))
    console.log(chalk.bold.red("Uncaught Exception"))
    console.log(chalk.white("" + e.stack))
    console.log(chalk.red("═".repeat(10)))
    console.log("\n")
    process.exit(1)
})
