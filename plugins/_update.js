import { exec } from 'child_process';

let handler = async (m, { conn, usedPrefix, command, isOwner }) => {
    
    try {
        const repoOwner = 'sithumethmika2009'; // https://github.com/sithumethmika2009/X-md
        const repoName = 'X-md';
        const branch = 'master'; //masterdefault

        m.reply('ඉදාම් බලන්න....');

        exec(`git ls-remote https://github.com/${repoOwner}/${repoName}.git ${branch}`, async (error, stdout, stderr) => {
            if (error) {
                console.error('Update check error:', error);
                console.error('Update check stderr:', stderr);
                await conn.reply(m.chat, 'දැන් බෑ,පස්සෙ බලමු🤧.', m);
                return;
            }

            const remoteCommit = stdout.trim();
            const localCommit = require('child_process').execSync('git rev-parse HEAD').toString().trim();

            if (remoteCommit === localCommit) {
                await conn.reply(m.chat, '> බොටා is uptodate.ආයෙ බලන්න දෙයක් නෑ.', m);
            } else {
                await conn.reply(m.chat, 'update එකක් තියේ.හිටු update කරන ගමන්....', m);

                exec('git pull origin main', async (updateError, updateStdout, updateStderr) => {
                    if (updateError) {
                        console.error('> Jessi-MD update error:', updateError);
                        console.error('> Jessi-MD update stderr:', updateStderr);
                        await conn.reply(m.chat, '> වැඩේ අව්ල් ගියා😪.ආයෙ බලන්න.', m);
                        return;
                    }

                    await conn.reply(m.chat, '> X-md සාර්තකව update වන ලදි. Restart වෙමින් පවතී...', m);

                    
                    setTimeout(() => {
                        conn.send('> Jessi-MD is restarting...');
                        process.exit(0);
                    }, 1000);
                });
            }
        });
    } catch (err) {
        console.error('Update check error:', err);
        await conn.reply(m.chat, 'Update බැලීමෙ දෝෂයක් ඇති විය.', m);
    }
};

handler.help = ['update];
handler.tags = ['misc'];
handler.command = /^(update)$/i;

handler.owner = true
handler.botAdmin = true



export default handler;
