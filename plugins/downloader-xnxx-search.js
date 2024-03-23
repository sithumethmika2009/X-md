import { xvideosSearch, xvideosdl } from '../lib/scraper.js';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  let chat = global.db.data.chats[m.chat];
  if (!chat.nsfw) throw `*🚫 To use premium features Register the bot .register your-name. age*`;
  let user = global.db.data.users[m.sender].age;
  if (user < 18) throw `❎ You must be 18 years or older to use this feature.`;
  if (!text) throw `✳️ නමක් ගහපම් බලන් ඉන්නෙ🫢*`;

  m.react('⌛');
    if (!text) throw '✳️ නමක් ගහපම් බලන් ඉන්නෙ🫢';

    // Check if the input is a valid Xvideos URL
    const isURL = /^(https?:\/\/)?(www\.)?xvideos\.com\/.+$/i.test(text);

    try {
      if (isURL) {
        // If it's a valid URL, directly download the video
        const result = await xvideosdl(text);
        const { title, url } = result.result;

        // Send the video file
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();

        conn.sendFile(
          m.chat,
          Buffer.from(buffer),
          `${title}.mp4`,
          `*ආ......මෙන්න💋*`
        );

      } else {
        // If it's not a valid URL, perform a search and display the search results
        const results = await xvideosSearch(text);
        if (results.length === 0) {
          m.reply('එහෙම එකක් නම් නෑ.');
        } else {
          const searchResults = results.map((result, index) => {
            return `${index + 1}. *${result.title}*\nතියෙන වෙලාව: ${result.duration}\nකොලිටිය: ${result.quality}\nලිංකුව: ${result.url}`;
          }).join('\n\n');

          m.reply(`*Search Results for "${text}":*\n\n${searchResults}`);
        }
      }
    } catch (error) {
      console.error(error);
      throw '❌ දැන් මන් නිදි.පස්සෙ වෙලාවක දෙන්නම්.';
    }
  };

  handler.help = ['xvid']
  handler.tags = ['nsfw', 'premium']
handler.command = ['xvid'];
handler.group = true;
handler.premium = false;
handler.register = true;

handler.premium = false;

export default handler;
