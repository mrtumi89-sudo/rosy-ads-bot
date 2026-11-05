export default async (request) => {
  const TOKEN = Netlify.env.get("BOT_TOKEN");
  const WEBSITE = "https://keen-meerkat-9a8c24.netlify.app";

  if (!TOKEN) {
    return new Response("Bot token missing", { status: 500 });
  }

  if (request.method !== "POST") {
    return new Response("Bot is running!");
  }

  const update = await request.json();
  const message = update.message;

  if (message?.text === "/start") {
    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: message.chat.id,
        text: "🌐 Welcome to ROSY ADS!\n\nVisit our website below.",
        reply_markup: {
          inline_keyboard: [[
            {
              text: "🌐 Visit Website",
              url: WEBSITE
            }
          ]]
        }
      })
    });
  }

  return new Response("OK");
};
