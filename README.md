### privew
---
![ss](https://github.com/balxz/akuuu-muaakk/raw/refs/heads/main/Screenshot_20250930-183237.jpg)
---
![ss](https://github.com/balxz/akuuu-muaakk/raw/refs/heads/main/Screenshot_20250930-183356.jpg)
---
![ss](https://github.com/balxz/akuuu-muaakk/raw/refs/heads/main/IMG-20250930-WA0070.jpg)
---
# hallo min🪷, dibaca ya.

script ini memiliki aturan.
berikut:
- sangat dilarang untuk menjual
- dilarang mengapus wm? hargai dev (pengembang)
- jika kamu memakai, itu bukan hak mu 100% ya
- dan script ini dilarang untuk di reupload ya:)

step instalasi.
pastikan server kamu telah menginstall nodejs ya...
berikut:
### clone repo dulu 😁
```bash
git clone https://github.com/balxz/Shiina-WaBot
```
### masuk ke directory
```bash
cd Shiina-WaBot
```
### instalasi module
```bash
npm i
```
### running menggunakan nodejs
```bash
node .
```
### running menggunakan bun
```bash
bun run .
```

oh iya, sebelum menjalankan, ubah terlebih dahulu nama file di src yang `configs.example.js` ubah ke `configs.js`.
setelah itu jalankan CMD di atas ya.

> ev return m
```javascript
{
  key: {
    remoteJid: '120363460791747138@g.us',
    fromMe: false,
    id: 'AC6885A2C363751B17CF6E1E4B5A07D2',
    participant: '628214828773@s.whatsapp.net'
  },
  messageTimestamp: 1758981493,
  pushName: 'bb? balzz?—balxzzy.web.id',
  broadcast: false,
  message: Message {
    senderKeyDistributionMessage: SenderKeyDistributionMessage {
      groupId: '120363402607147138@g.us',
      axolotlSenderKeyDistributionMessage: [Uint8Array]
    },
    messageContextInfo: MessageContextInfo { messageSecret: [Uint8Array] },
    conversation: 'ev return m'
  },
  id: 'AC6885A2C363751B17CF6E1E4B5A07D2',
  from: '120363460791747138@g.us',
  isBaileys: false,
  chat: '120363460791747138@g.us',
  fromMe: false,
  isGroup: true,
  sender: '628214828773@s.whatsapp.net',
  mtype: 'conversation',
  msg: 'ev return m',
  body: 'ev return m',
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


### SESI EXAMPLE 
> bagaimana cara menambah `fitur` di plugins?.
```javascript
module.exports = {
    alias: ["t", "testing", "testings"],
    command: ["tes"],
    tags: ["info"],
    desc: ["testing"],
    owner: false,
    botadmin: false,
    private: false,
    group: false,
    admin: false
    handler: async (m, { prefix, cmd, args, text, is, Plugins, scrap, db, tggl, jam, runtime }) => {
        m.reply("Hallo Dari Sh Team 🪷")
    }
}
```
seperti itu, kamu bisa langsung add dengan fitur `plug` loh. caranya `plug --add tes/tes.js` sambil reply kode nya🪷.

> bagaimana cara menambah `fitur` di `case`?
```javascript
case "hallo": { // @main @hallo
   m.reply("ya hallo")
  break
}
```
? apa sih guna nya komentar @?.
ya itu di awal adalh category, jika @main, dia bakal ada di category main saat CMD menu.
untuk yang ke dua itu adalah command yang akna di tampilkan di menu.

### penjelasan pengguna-an scrap
```javascript
module.exports = {
    alias: ["sy", "say", "saying"],
    command: ["saying"],
    tags: ["info"],
    desc: ["saying"],
    owner: false,
    botadmin: false,
    private: false,
    group: false,
    admin: false
    handler: async (m, { prefix, cmd, args, text, is, Plugins, scrap, db, tggl, jam, runtime }) => {
        let a = await scrap.say(text)
        m.reply(a)
    }
}
```
_`src/scrapers`_
---
ingin contribusi?, langsung aja fork repo ini dan pull request, insyaallah aku acc❤️

jangan lupa beri star yaa ⭐
