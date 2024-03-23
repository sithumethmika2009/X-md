
import { xnxxSearch, xnxxdl } from '../lib/scraper.js';



let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  let chat = global.db.data.chats[m.chat];
  if (!chat.nsfw) throw `*🚫 To use premium features Register the bot .register your-name. age*`;
  let user = global.db.data.users[m.sender].age;
  if (user < 18) throw `පල පොඩි එකා.තෝ තාම පොඩී ඕව බලන්න🤭.`;
  if (!text) throw `✳️ නමක් ගහපම් බලන් ඉන්නෙ🫢`;

  m.react('💋');

  let url;
  try {
    url = new URL(text);
  } catch (error) {
    url = null;
  }

  if (url) {
    try {
      const files = await xnxxdl(url.href);
      if (files && files.high) {
        conn.sendFile(
          m.chat,
          files.high,
          'video.mp4',
          'ආ.....මෙන්න🫡',
          m
        );
        m.react('✅');
      } else {
        m.reply('❌ Error: හරියට ලින්ක් එක දාපම්.😼');
      }
    } catch (e) {
      console.error(e);
      m.reply('❌ දැන් මන් නිදි.පස්සෙ වෙලාවක දෙන්නම්.');
    }
  } else {
    try {
      const results = await xnxxSearch(text);
      if (results.length > 0) {
        const message = results.map((r, i) => `${i + 1}. [${r.title}](${r.link})`).join('\n');
        m.reply(message, null, {
          contextInfo: {
            mentionJid: conn.parseMention(message),
          },
        });
      } else {
        m.reply('❌ Error: එහෙම එකක් නම් නෑ.');
      }
    } catch (e) {
      console.error(e);
      m.reply('❌ දැන් නිදි.පස්සෙ බලමු.');
    }
  }
};

handler.help = ['xnxx'];
handler.tags = ['nsfw', 'premium'];
handler.command = ['xnxx'];
handler.group = true;
handler.premium = false;
handler.register = true;

export default handler;
