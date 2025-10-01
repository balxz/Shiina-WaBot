# Shiina WhatsApp Bot

<div align="center">

![Preview](https://github.com/balxz/akuuu-muaakk/raw/refs/heads/main/Screenshot_20250930-183237.jpg)

[![Node.js](https://img.shields.io/badge/Node.js-16.x%20or%20higher-green.svg)](https://nodejs.org/)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Bot-brightgreen.svg)](https://whatsapp.com/)
[![License](https://img.shields.io/badge/License-Custom-blue.svg)](#aturan-penggunaan)

Bot WhatsApp dengan sistem plugin yang fleksibel dan mudah dikustomisasi.

</div>

---

## Preview Lainnya

<details>
<summary>Lihat screenshot lainnya</summary>

![Screenshot 1](https://github.com/balxz/akuuu-muaakk/raw/refs/heads/main/Screenshot_20250930-183237.jpg)
![Screenshot 2](https://github.com/balxz/akuuu-muaakk/raw/refs/heads/main/Screenshot_20250930-183356.jpg)
![Screenshot 3](https://github.com/balxz/akuuu-muaakk/raw/refs/heads/main/IMG-20250930-WA0070.jpg)

</details>

---

## Aturan Penggunaan

Harap dibaca sebelum menggunakan script ini:

- Dilarang keras untuk menjual script ini
- Dilarang menghapus watermark, hargai developer yang sudah buat
- Kalau kamu pakai script ini, bukan berarti ini 100% hak milikmu
- Dilarang reupload tanpa izin dari developer
- Boleh modifikasi asal tetap cantumkan credit
- Kontribusi via pull request sangat dipersilahkan

---

## Fitur Utama

- Sistem plugin yang mudah dan fleksibel untuk menambah command
- Support multiple command alias
- Manajemen grup lengkap
- Kontrol akses untuk admin dan owner
- Database untuk menyimpan data
- Built-in web scraper
- Performa cepat dan ringan
- Mudah untuk update ke versi terbaru

---

## Yang Perlu Disiapkan

Sebelum instalasi, pastikan sudah punya:

- Node.js versi 16 atau lebih tinggi
- Git untuk clone repository
- NPM atau Bun (opsional, tapi lebih cepat)
- Koneksi internet yang stabil

---

## Cara Install

### Clone Repository

```bash
git clone https://github.com/balxz/Shiina-WaBot
cd Shiina-WaBot
```

### Install Dependencies

Pakai NPM:
```bash
npm install
```

Atau kalau mau lebih cepat, pakai Bun:
```bash
bun install
```

### Setup Konfigurasi

Rename file konfigurasi dulu:
```bash
mv src/configs.example.js src/configs.js
```

Kalau di Windows:
```cmd
ren src\configs.example.js configs.js
```

Terus edit file `src/configs.js` sesuai kebutuhan, minimal ganti nomor owner.

### Jalankan Bot

Pakai Node.js:
```bash
node .
```

Pakai Bun:
```bash
bun run .
```

Kalau mau jalanin di background dan auto restart kalau error, pakai PM2:
```bash
npm install -g pm2
pm2 start index.js --name shiina-bot
pm2 save
pm2 startup
```

---

## Deploy ke Pterodactyl Panel

### Persiapan Server

Bikin server baru di panel Pterodactyl dengan spec minimal:
- Image: Node.js versi 16 atau lebih tinggi
- RAM: 512MB (rekomen 1GB kalau mau lancar)
- Disk: 1GB
- CPU: 50%

### Upload dan Install
### > download zip terlebih dahulu
![ss](https://nefyu.my.id/ozyl.jpg)
### > upload zip script
![ss](https://nefyu.my.id/r5jq.jpg)
### > unzip file nya
![ss](https://nefyu.my.id/83aa.jpg)
### > masuk ke folder `Shiina-Wabot` lalu centang semua dan move
![ss](https://nefyu.my.id/u3sf.jpg)
### > lalu ketik kan `../` supaya berada di container
![ss](https://nefyu.my.id/mvwb.jpg)
### instalasi?
> pergi ke startup dan isi `Command Run` dengan `npm install`
> setalah selesai install module, rename lagi `Command Run` menjadi `node .` atau `node index`

### Deploy ke VPS
```bash
ssh root@ip
```
```bash
git clone https://github.com/balxz/Shiina-WaBot
cd Shiina-WaBot
npm install
mv src/configs.example.js src/configs.js
nano src/configs.js
```

### run dengan PM2
```bash
npm install -g pm2
pm2 start . --name "bot"
pm2 save
pm2 startup
```

### Monitoring Bot
```bash
pm2 logs shiina-bot
```

---

## Struktur Project

```
Shiina-WaBot/
├── .gitignore
├── README.md
├── cmd
│   ├── case-tele.js
│   ├── case-wa.js
│   ├── handler.js
│   └── plugins
│       ├── downloader
│       │   ├── facebook.js
│       │   ├── github.js
│       │   ├── instagram.js
│       │   ├── mediafire.js
│       │   ├── spotify.js
│       │   ├── threads.js
│       │   ├── tiktok.js
│       │   └── twitter.js
│       ├── events
│       │   ├── _antivn.js
│       │   └── _role.js
│       ├── group
│       │   ├── kick.js
│       │   └── link.js
│       ├── info
│       │   ├── ls.js
│       │   └── tree.js
│       ├── menu.js
│       ├── owner
│       │   ├── backup.js
│       │   ├── plugin.js
│       │   └── settings.js
│       ├── private
│       │   └── beautify.js
│       └── searching
│           └── spotify.js
├── connect.js
├── database.json
├── index.js
├── package-lock.json
├── package.json
└── src
    ├── api.js
    ├── configs.example.js
    ├── configs.js
    ├── declare
    │   ├── Case.js
    │   ├── Database.js
    │   ├── Func.js
    │   ├── Prehandler.js
    │   ├── Print.js
    │   └── image
    │       ├── api.png
    │       ├── banner.png
    │       └── picture.png
    ├── scrapers
    │   ├── index.js
    │   └── src
    │       └── say.js
    ├── simple.js
    └── utils
        └── apis.js

```

---

## Cara Bikin Plugin Baru

### Method 1: Bikin File Plugin

Bikin file baru di folder `plugins/`, contoh `plugins/info/test.js`:

```javascript
module.exports = {
    alias: ["t", "testing", "testings"],
    command: ["tes"],
    tags: ["info"],
    desc: ["Testing command"],
    owner: false,      // Cuma owner yang bisa pakai?
    botadmin: false,   // Bot harus jadi admin?
    private: false,    // Cuma bisa di private chat?
    group: false,      // Cuma bisa di group?
    admin: false,      // Cuma admin group yang bisa pakai?
    handler: async (m, { prefix, cmd, args, text, is, Plugins, scrap, db, tggl, jam, runtime }) => {
        m.reply("Hallo dari Sh Team")
    }
}
```

### Method 2: Pakai Case System

Edit file utama dan tambah case baru:

```javascript
case "hallo": { // @main @hallo
    m.reply("Ya hallo!")
    break
}
```

Keterangan komentar:
- `@main` adalah kategori command (bakal muncul di menu)
- `@hallo` adalah nama command (yang ditampilin di list menu)

### Method 3: Quick Add

Bisa juga langsung add plugin dengan command `plug`:
```
.plug --add nama-folder/nama-file.js
```

Reply command ini ke kode pluginnya.

---

## Parameter Handler

Parameter yang bisa dipakai di dalam handler:

- `m` - Object message, isinya semua info tentang pesan
- `prefix` - Prefix command yang dipakai
- `cmd` - Command yang dipanggil
- `args` - Array arguments dari command
- `text` - Full text dari message
- `is` - Object buat cek berbagai kondisi
- `Plugins` - Manager plugin
- `scrap` - Function buat web scraping
- `db` - Akses ke database
- `tggl` - Tanggal sekarang
- `jam` - Waktu sekarang
- `runtime` - Waktu bot udah jalan

---

## Message Object

Contoh return dari `m` kalau di console log:

```javascript
{
  key: {
    remoteJid: '628229387382@s.whatsapp.net',
    fromMe: false,
    id: 'AC3BE153BE8AD76F51B33FF760D30E10',
    participant: undefined
  },
  messageTimestamp: 1759301050,
  pushName: 'bb? balzz?—balxzzy.web.id',
  broadcast: false,
  message: Message {
    conversation: '.ev return m',
    messageContextInfo: MessageContextInfo {
      deviceListMetadata: [DeviceListMetadata],
      deviceListMetadataVersion: 2,
      messageSecret: [Uint8Array]
    }
  },
  id: 'AC3BE153BE8AD76F51B33FF760D30E10',
  from: '628229387382@s.whatsapp.net',
  isBaileys: false,
  chat: '628229387382@s.whatsapp.net',
  fromMe: false,
  isGroup: false,
  sender: '628229387382@s.whatsapp.net',
  mtype: 'conversation',
  msg: '.ev return m',
  body: '.ev return m',
  quoted: null,
  mentionedJid: [],
  sendBtnDocu: [AsyncFunction (anonymous)],
  reply: [AsyncFunction (anonymous)],
  send: [AsyncFunction (anonymous)],
  copy: [Function (anonymous)],
  react: [Function (anonymous)],
  detect: [Function (anonymous)]
}
```

---

## Pakai Scraper

Contoh cara pakai built-in scraper:

```javascript
module.exports = {
    alias: ["sy", "say"],
    command: ["saying"],
    tags: ["tools"],
    desc: ["Convert text jadi speech"],
    handler: async (m, { text, scrap }) => {
        let a = scrap.say.send(text)
        m.reply(a)
    }
}
```

Semua scraper ada di folder `src/scrapers/`.

---

## Update Bot

### Manual Update

```bash
# Backup file penting dulu
cp src/configs.js configs.backup.js
cp -r database database-backup

# Pull update dari GitHub
git pull origin main

# Restore konfigurasi
cp configs.backup.js src/configs.js

# Install dependencies baru kalau ada
npm install

# Restart bot
pm2 restart shiina-bot
```

### Auto Update Script

Bikin file `update.sh`:

```bash
#!/bin/bash
echo "Updating bot..."

# Backup config
cp src/configs.js /tmp/configs.backup.js

# Update dari GitHub
git stash
git pull origin main

# Restore config
cp /tmp/configs.backup.js src/configs.js

# Install dependencies
npm install

# Restart
pm2 restart shiina-bot

echo "Update selesai!"
```

Jalankan:
```bash
chmod +x update.sh
./update.sh
```

---

## Troubleshooting

### Bot Nggak Respon

```bash
# Cek logs dulu
pm2 logs shiina-bot

# Coba restart
pm2 restart shiina-bot

# Kalau masih error, hapus session dan scan ulang
rm -rf sessions/
pm2 restart shiina-bot
```

### Error Module Not Found

```bash
# Install ulang semua dependencies
rm -rf node_modules package-lock.json
npm install
```

### QR Code Nggak Keluar

```bash
# Hapus session lama
rm -rf sessions/

# Jalankan ulang
node .
```

### Bot Sering Disconnect

Beberapa hal yang bisa dicoba:
- Pastikan koneksi internet stabil
- Pakai nomor WhatsApp yang jarang dipakai buat yang lain
- Jangan scan QR code di banyak device
- Update Node.js ke versi terbaru
- Kalau pakai hosting gratisan, coba upgrade ke yang berbayar

### Error di Pterodactyl?
> mungkin node nya versi lawas😹

---

## Kontribusi

Kontribusi sangat diterima. Caranya:

1. Fork repository ini
2. Bikin branch baru untuk fitur yang mau ditambah
3. Commit perubahan yang udah dibuat
4. Push ke branch di repository kamu
5. Bikin Pull Request ke repository ini

Insyaallah bakal di-review dan di-merge kalau sesuai.

---

## Support
Kalau ada error lapor:
- Buat issue di GitHub Issues
- Atau hubungi via website: balxzzy.web.id

---
