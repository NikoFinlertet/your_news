import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
  try {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json(
        { error: 'Telegram configuration is missing' },
        { status: 500 }
      );
    }


    //Поднянуть бота с api
    const message = `🎉 Новая регистрация на beta YourNews!\n`;
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send Telegram notification');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    );
  }
} 