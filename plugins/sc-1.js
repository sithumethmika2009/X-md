import moment from 'moment-timezone';
import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
   let res = await fetch('https://api.github.com/repos/whiteshadowofficial/Jessi-md')
   let json = await res.json()
   let txt = `🤖 *X DL SYSTEM INFORMATION* 🤖

1.  _Runtime -: ${json.rtime}_
2.  _Ram Usage -: ${json.ram}_
3.  _Bot Version -: Not Published_

📶  *_Server System informations_*

1.  _Platform : ${json.hostname}_
2.  _Running OS : linux_
3.  _CPU Manufacture  -: Intel_
4.  _CPU Brand -: Xeon® Platinum 8375C_
5.  _CPU Speed -: 2.9_`

   await conn.relayMessage(m.chat,  {
    requestPaymentMessage: {
      currencyCodeIso4217: 'INR',
      amount1000: '50000000000',
      requestFrom: '0@s.whatsapp.net',
      noteMessage: {
      extendedTextMessage: {
      text: txt,
      contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
      showAdAttribution: true
      }}}}}}, {})
}

handler.help = ['sc <bot sc>']
handler.tags = ['general']
handler.command = /^sc(ript(bot)?|bot)?$/i

export default handler
