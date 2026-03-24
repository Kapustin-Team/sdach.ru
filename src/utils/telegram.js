'use server'

export default async function sendMessage(message) {
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: process.env.TG_BOT_CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      }
    );

    const data = await res.json();

    // Проверка на успешную отправку по Telegram API
    return data.ok === true;
  } catch (err) {
    console.error('Telegram error:', err);
    return false;
  }
}
