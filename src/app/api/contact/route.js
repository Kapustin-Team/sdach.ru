import { NextResponse } from 'next/server'

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8201417104:AAHcpil6EhwuUE1qKwFOYF3x8O6TIh0G3vA'
const GROUP_CHAT_ID = '-5230938649' // Основная группа для заявок

export async function POST(request) {
  try {
    const { name, contact, business, task } = await request.json()

    if (!name || !contact) {
      return NextResponse.json({ error: 'Имя и контакт обязательны' }, { status: 400 })
    }

    const text = [
      '📩 *Новая заявка с сайта LADUSHKI MEDIA*',
      '',
      `👤 *Имя:* ${escape(name)}`,
      `📱 *Контакт:* ${escape(contact)}`,
      business ? `🏢 *Бизнес:* ${escape(business)}` : null,
      task ? `📝 *Задача:* ${escape(task)}` : null,
      '',
      `🕐 ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`,
    ].filter(Boolean).join('\n')

    const res2 = await sendMessage(GROUP_CHAT_ID, text)

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Contact route error:', e)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

async function sendMessage(chatId, text) {
  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
    }),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Telegram error for ${chatId}: ${err}`)
  }
  return res.json()
}

function escape(str) {
  return str.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&')
}
