import { createHash } from 'crypto'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) throw ` *එක පාරක් register උනාම ඇති..😾*`
  if (!Reg.test(text)) throw ``
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw ' *නමෙහි හිස්තැන් බෑ...⏱*️'
  if (!age) throw ' *The age cannot contain a space...⏱️*'
  if (name.length >= 30) throw ' *Your name is not accepted, please enter another name...⏱️*' 
  age = parseInt(age)
  if (age > 100) throw ' *Your age is not accepted, please enter another age...⏱️*'
  if (age < 5) throw ' ⏱*You cannot stay in this whatsapp group...⏱*️ '
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(`
╭─────────────
│
│ *Registered Successful..⏱️*
│
│ ➬*NAME:* ${name}
│ ➬*AGE* : ${age} years
│ ➬*ID* : ${sn}
│
╰─────────────

 jessi 
`.trim())
}
handler.help = ['register'].map(v => v + ' <name.age>')
handler.tags = ['Register']

handler.command = ['verify', 'req', 'register', 'qhw'] 

export default handler

