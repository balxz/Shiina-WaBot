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
module.exports = {
    alias: ["help"],
    command: ["menu"],
    tags: ["assisten"],
    owner: false,
    handler: async (m, { prefix, db, jam, tggl, runtime }) => {
        let abcd = `*乂 ɪ ɴ ғ ᴏ  ᴜ s ᴇ ʀ*\n`
        abcd += `> *name : ${m.pushName.toLowerCase()}*\n`
        abcd += `> *number : ${"0" + m.sender.split("@")[0].slice(2)}*\n`
        abcd += `> *role : ${db.get("user", m.sender).role}*\n`
        abcd += `–\n`
        abcd += `*乂 ᴛ ᴏ ᴅ ᴀ ʏ*\n`
        abcd += `> *hour : ${jam()} WIB*\n`
        abcd += `> *days : ${tggl()}*\n`
        abcd += `> *runtime : ${runtime()}*\n\n`
        abcd += "*乂 ᴍ ᴇ ɴ ᴜ  ᴀ ʟ ʟ*\n"
        abcd += String.fromCharCode(8206).repeat(4001)
        let cmd = Func.menu()
        for (let k in cmd) {
          abcd += `*— ${k.toUpperCase()}*\n`
          abcd += cmd[k].map(x => `> 々 *${prefix+x.name}*${x.desc ? ` (${x.desc})` : ""}`).join("\n") + "\n\n"
        }
        abcd += `\`${set.wm + set.pack}\``
        
        let bton = [
          {
            name: "single_select",
            buttonParamsJson: JSON.stringify({
              title: "",
              sections: [
                {
                  title: "",
                  rows: []
                }
              ]
            })
          },
          {
            name: "open_webview",
            buttonParamsJson: JSON.stringify({
              title: ">_< 🪷",
              link: {
                in_app_webview: true,
                url: "https://balxzzy.web.id"
              }
            })
          },
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "insta >_< 🪴",
              url: "https://www.instagram.com/iqstore78"
            })
          }
        ]
        
        return await m.sendBtnDocu({
          title: "Shiina-WaBot v1.5.4",
          body: set.wm + set.pack,
          text: abcd,
          fileName: "@iqstore78",
          docFilePath: "./src/declare/Database.js",
          headerFilePath: "./src/declare/image/api.png",
          adThumbnailPath: "./src/declare/image/picture.png",
          bottomSheetTitle: "ShiinaBot",
          bottomSheetButtonTitle: "SECTIONS",
          buttons: bton
        })
    }
}












/*




ev return clients.sendMessage(
    m.chat,
    {
        text: 'This is an Interactive message!',
        title: 'Hiii',
        subtitle: 'There is a subtitle', 
        footer: 'Hello World!',
        interactiveButtons: [
            {
                name: 'quick_reply',
                buttonParamsJson: JSON.stringify({
                    display_text: 'Click Me!',
                    id: 'your_id'
                })
            },
            {
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                    display_text: 'Follow Me',
                    url: 'https://whatsapp.com/channel/0029Vag9VSI2ZjCocqa2lB1y',
                    merchant_url: 'https://whatsapp.com/channel/0029Vag9VSI2ZjCocqa2lB1y'
                })
            },
            {
                name: 'cta_copy',
                buttonParamsJson: JSON.stringify({
                    display_text: 'Click Me!',
                    copy_code: 'https://whatsapp.com/channel/0029Vag9VSI2ZjCocqa2lB1y'
                })
            },
            {
                name: 'cta_call',
                buttonParamsJson: JSON.stringify({
                    display_text: 'Call Me!',
                    phone_number: '628xxx'
                })
            },
            {
                name: 'cta_catalog',
                buttonParamsJson: JSON.stringify({
                    business_phone_number: '628xxx'
                })
            },
            {
                name: 'cta_reminder',
                buttonParamsJson: JSON.stringify({
                    display_text: '...'
                })
            },
            {
                name: 'cta_cancel_reminder',
                buttonParamsJson: JSON.stringify({
                    display_text: '...'
                })
            },
            {
                name: 'address_message',
                buttonParamsJson: JSON.stringify({
                    display_text: '...'
                })
            },
            {
                name: 'send_location',
                buttonParamsJson: JSON.stringify({
                    display_text: '...'
                })
            },
            {
                name: 'open_webview',
                buttonParamsJson: JSON.stringify({
                    title: 'Follow Me!',
                    link: {
                        in_app_webview: true, // or false
                        url: 'https://whatsapp.com/channel/0029Vag9VSI2ZjCocqa2lB1y'
                    }
                })
            },
            {
               name: 'mpm',
               buttonParamsJson: JSON.stringify({
                  product_id: '8816262248471474'
               })
            },
            {
               name: 'wa_payment_transaction_details',
               buttonParamsJson: JSON.stringify({
                  transaction_id: '12345848'
               })
            },
            {
               name: 'automated_greeting_message_view_catalog',
               buttonParamsJson: JSON.stringify({
                   business_phone_number: '628xxx', 
                   catalog_product_id: '12345'
               })
            },
            {
                name: 'galaxy_message', 
                buttonParamsJson: JSON.stringify({
                	mode: 'published', 
                    flow_message_version: '3', 
                    flow_token: '1:1307913409923914:293680f87029f5a13d1ec5e35e718af3',
                    flow_id: '1307913409923914',
                    flow_cta: 'Itsukichann kawaii >\\<', 
                    flow_action: 'navigate', 
                    flow_action_payload: {
                    	screen: 'QUESTION_ONE',
                        params: {
                        	user_id: '123456789', 
                            referral: 'campaign_xyz'
                        }
                    }, 
                    flow_metadata: {
                    	flow_json_version: '201', 
                        data_api_protocol: 'v2', 
                        flow_name: 'Lead Qualification [en]',
                        data_api_version: 'v2', 
                        categories: ['Lead Generation', 'Sales']
                   }
                }) 
            }, 
            {
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                    title: 'Click Me!',
                    sections: [
                        {
                            title: 'Title 1',
                            highlight_label: 'Highlight label 1',
                            rows: [
                                {
                                    header: 'Header 1',
                                    title: 'Title 1',
                                    description: 'Description 1',
                                    id: 'Id 1'
                                },
                                {
                                    header: 'Header 2',
                                    title: 'Title 2',
                                    description: 'Description 2',
                                    id: 'Id 2'
                                }
                            ]
                        }
                    ]
                })
            }
        ]
    }
)





ev let sectionRows = Object.keys(Func.menu()).map(category => ({
  title: category.toUpperCase(),
  rows: Func.menu()[category].map(item => ({
    id: item.name,
    title: item.name,
    description: item.desc || "-"
  }))
}))

let buttons = [
  {
    name: "single_select",
    buttonParamsJson: JSON.stringify({ has_multiple_buttons: true })
  },
  {
    name: "call_permission_request",
    buttonParamsJson: JSON.stringify({ has_multiple_buttons: true })
  },
  {
    name: "single_select",
    buttonParamsJson: JSON.stringify({
      title: "MENU",
      sections: sectionRows,
      has_multiple_buttons: true
    })
  },
  {
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
      display_text: "Shiina Api",
      url: "https://balxzzy.web.id"
    })
  }
]

await m.sendBtnDocu({
  title: "Shiina-WaBot v1.5.4",
  body: set.wm + set.pack,
  text: "ready to get started?",
  fileName: "@iqstore78",
  docFilePath: "./src/declare/Database.js",
  headerFilePath: "./src/declare/image/api.png",
  adThumbnailPath: "./src/declare/image/picture.png",
  bottomSheetTitle: "ShiinaBot",
  bottomSheetButtonTitle: "SECTIONS",
  buttons: buttons
})










case "allmenu": {
  const menuText = `
HI, ${pushname}!
I'm *${global.namaBot}*

▢ *Runtime:* ${runtime(process.uptime())}
▢ *Mode:* ${danzz.public ? "Public" : "Self"}
▢ *Platform:* ${os.platform()}

*≡ AI*
 · ${m.prefix}ai
 · ${m.prefix}songai

*≡ SEARCH*
 · ${m.prefix}google
 · ${m.prefix}pinterest
 · ${m.prefix}play
 · ${m.prefix}ytsearch
 · ${m.prefix}lyric
 · ${m.prefix}spotify

*≡ DOWNLOADER*
 · ${m.prefix}facebook
 · ${m.prefix}instagram
 · ${m.prefix}ytmp3
 · ${m.prefix}ytmp4
 · ${m.prefix}tiktok
 · ${m.prefix}spotifydl

*≡ TOOLS*
 · ${m.prefix}ddos
 · ${m.prefix}removebg
 · ${m.prefix}tourl
 · ${m.prefix}idgc
 · ${m.prefix}saveweb
 · ${m.prefix}spamngl
 · ${m.prefix}enc
 · ${m.prefix}remini
 · ${m.prefix}cekresi
 · ${m.prefix}cekip
 · ${m.prefix}shortlink
 · ${m.prefix}snapcode
 · ${m.prefix}cekpln
 · ${m.prefix}i2v
 · ${m.prefix}tovn
 · ${m.prefix}trace
 · ${m.prefix}sub4unlock
 · ${m.prefix}sfl
 · ${m.prefix}pastebin
 · ${m.prefix}getpastebin
 · ${m.prefix}cekphising
 · ${m.prefix}rvo
 · ${m.prefix}toimg

*≡ STICKER*
 · ${m.prefix}sticker

*≡ INFO*
 · ${m.prefix}owner
 · ${m.prefix}mode
 · ${m.prefix}ping
 · ${m.prefix}pinghost
 · ${m.prefix}cekkey

*≡ OWNER*
 · ${m.prefix}setname
 · ${m.prefix}setprefix
 · ${m.prefix}ddos
 · ${m.prefix}restart
 · ${m.prefix}backup
 · ${m.prefix}self
 · ${m.prefix}public
 · ${m.prefix}restart
 · ${m.prefix}salurkan
 · ${m.prefix}getcase
 · ${m.prefix}listcase
 · ${m.prefix}addcase
 · ${m.prefix}delcase
 · ${m.prefix}getcase
 · ${m.prefix}setpp
 · ${m.prefix}addakses
  `.trim();

  try {
    const kuronekoJpgPath = path.join(
      __dirname,
      "./library/image/kuroneko.jpg"
    );

    if (!fs.existsSync(kuronekoJpgPath)) {
      throw new Error(
        `File not found: ${kuronekoJpgPath}. Pastikan 'kuroneko.jpg' ada di folder library/image.`
      );
    }

    let cihuy = fs.readFileSync(kuronekoJpgPath);

    let msg = generateWAMessageFromContent(
      m.chat,
      {
        interactiveMessage: {
          header: {
            documentMessage: {
              url: "https://mmg.whatsapp.net/v/t62.7119-24/539012045_745537058346694_1512031191239726227_n.enc",
              mimetype: "application/pdf",
              fileSha256: "+gmvvCB6ckJSuuG3ZOzHsTBgRAukejv1nnfwGSSSS/4=",
              fileLength: "999999999999",
              pageCount: 0,
              mediaKey:
                "MWO6fI223TY8T0i9onNcwNBBPldWfwp1j1FPKCiJFzw=",
              fileName: "KuroNeko",
              fileEncSha256:
                "ZS8v9tio2un1yWVOOG3lwBxiP+mNgaKPY9+wl5pEoi8=",
              directPath:
                "/v/t62.7119-24/539012045_745537058346694_1512031191239726227_n.enc",
              mediaKeyTimestamp: "1756370084",
              jpegThumbnail: cihuy,
            },
            hasMediaAttachment: true,
          },
          body: { text: "" },
          footer: { text: menuText },
          nativeFlowMessage: {
            buttons: [
              {
                name: "single_select",
                buttonParamsJson: `{"has_multiple_buttons":true}`,
              },
              {
                name: "call_permission_request",
                buttonParamsJson: `{"has_multiple_buttons":true}`,
              },
              {
                name: "single_select",
                buttonParamsJson: JSON.stringify({
                  title: "KuroNeko",
                  sections: [
                    {
                      title: "KuroNeko",
                      highlight_label: "🫩",
                      rows: [
                        {
                          title: "ddos",
                          description: "<!> ddos only owner",
                          id: ".ddos",
                        },
                        {
                          title: "owner",
                          description: "<!> Owner Bot",
                          id: ".owner",
                        },
                        {
                          title: "ping",
                          description: "<!> check ping bot",
                          id: ".ping",
                        },
                      ],
                    },
                  ],
                  has_multiple_buttons: true,
                }),
              },
              {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                  display_text: "KuroNeko",
                  id: "123456789",
                  copy_code: "I Love You Danzz 💖",
                }),
              },
              {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                  display_text: "My Channel WhatsApp",
                  url: "https://whatsapp.com/channel/0029VbBMgJFKAwEh6KHlHI1G",
                  merchant_url:
                    "https://whatsapp.com/channel/0029VbBMgJFKAwEh6KHlHI1G",
                }),
              },
            ],
            messageParamsJson: JSON.stringify({
              limited_time_offer: {
                text: "DanzzAraAra",
                url: "https://github.com/DanzzAraAra",
                copy_code: "I LOVE DANZZ",
                expiration_time: 1754613436864329,
              },
              bottom_sheet: {
                in_thread_buttons_limit: 2,
                divider_indices: [1, 2, 3, 4, 5, 999],
                list_title: "DanzzAraAra",
                button_title: "SELECTION",
              },
              tap_target_configuration: {
                title: "▸ X ◂",
                description: "bomboclard",
                canonical_url: "https://github.com/DanzzAraAra",
                domain: "shop.example.com",
                button_index: 0,
              },
            }),
          },
          contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 777,
            isForwarded: true,
            externalAdReply: {
              title: "",
              body: "KuroNeko x Danzz",
              mediaType: 1,
              thumbnailUrl: "https://c.termai.cc/i46/wsYc.jpg",
              mediaUrl: "",
              sourceUrl: "",
              showAdAttribution: false,
              renderLargerThumbnail: true,
            },
          },
        },
      },
      { userJid: m.sender, quoted: m }
    );

    await danzz.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
  } catch (error) {
    console.error("Gagal mengirim menu interaktif:", error);
    await danzz.sendMessage(
      m.chat,
      {
        text: menuText,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363415137660406@newsletter",
            newsletterName: "𝕶𝖚𝖗𝖔𝕹𝖊𝖐𝖔 | ダンズ",
          },
        },
      },
      { quoted: m }
    );
  }
  break;
}*/




