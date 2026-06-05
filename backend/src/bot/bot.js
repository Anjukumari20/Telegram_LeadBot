const { Telegraf } = require("telegraf");
const Lead = require("../models/Lead");

function startBot() {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  // Don't start the bot if no token is provided
  if (!token || token === "your_telegram_bot_token_here") {
    console.log("⚠️  Telegram bot token not set. Bot will not start.");
    return;
  }

  const bot = new Telegraf(token);

  // Store user session data temporarily in memory
  // Key = telegram user ID, Value = their current progress
  const sessions = {};

  // ─── /start command ─────────────────────────────────────────
  bot.start((ctx) => {
    const userId = ctx.from.id.toString();

    // Reset their session when they start fresh
    sessions[userId] = { step: "name" };

    ctx.reply(
      `👋 Welcome to the Lead Collection Bot!\n\nPlease enter your *Full Name*:`,
      { parse_mode: "Markdown" }
    );
  });

  // ─── Handle all text messages ────────────────────────────────
  bot.on("text", async (ctx) => {
    const userId = ctx.from.id.toString();
    const userInput = ctx.message.text.trim();
    const session = sessions[userId];

    // If user hasn't started yet, ask them to use /start
    if (!session) {
      return ctx.reply('Please type /start to begin.');
    }

    // ── Step 1: Collect Name ──
    if (session.step === "name") {
      session.name = userInput;
      session.step = "email";
      return ctx.reply("✅ Got it! Now please enter your *Email Address*:", {
        parse_mode: "Markdown",
      });
    }

    // ── Step 2: Collect Email ──
    if (session.step === "email") {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userInput)) {
        return ctx.reply("❌ Invalid email. Please enter a valid email address:");
      }

      session.email = userInput;
      session.step = "mobile";
      return ctx.reply("✅ Got it! Now please enter your *Mobile Number*:", {
        parse_mode: "Markdown",
      });
    }

    // ── Step 3: Collect Mobile ──
    if (session.step === "mobile") {
      // Validate mobile: numbers only, at least 10 digits
      const mobileRegex = /^\d{10,}$/;
      if (!mobileRegex.test(userInput)) {
        return ctx.reply(
          "❌ Invalid mobile number. It must be numeric and at least 10 digits. Try again:"
        );
      }

      session.mobile = userInput;

      // ── Save to Database ──
      try {
        // Check for duplicate email
        const existing = await Lead.findOne({ email: session.email });
        if (existing) {
          delete sessions[userId];
          return ctx.reply(
            "⚠️ This email is already registered. Use /start to try again with a different email."
          );
        }

        // Save the lead
        const newLead = new Lead({
          name: session.name,
          email: session.email,
          mobile: session.mobile,
          telegramId: userId,
        });
        await newLead.save();

        // Clean up session
        delete sessions[userId];

        return ctx.reply(
          `🎉 *Thank you, ${session.name}!*\n\nYour details have been saved successfully.\n\n` +
            `📋 *Summary:*\n` +
            `👤 Name: ${session.name}\n` +
            `📧 Email: ${session.email}\n` +
            `📱 Mobile: ${session.mobile}`,
          { parse_mode: "Markdown" }
        );
      } catch (error) {
        console.error("Bot DB error:", error.message);
        delete sessions[userId];
        return ctx.reply(
          "❌ Something went wrong while saving. Please try again with /start"
        );
      }
    }
  });

  // Start the bot using long polling
  bot.launch();
  console.log("✅ Telegram Bot started");

  // Graceful shutdown
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}

module.exports = startBot;
