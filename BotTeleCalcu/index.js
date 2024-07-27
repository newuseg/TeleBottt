const TelegramBot = require('node-telegram-bot-api');
// const math = require('mathjs');`

app.get("/", (req, res) => {
    res.send("Bot is Live");
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:$(port)`);
});

const token = '6911484112:AAHd4u5vZ7lvwyayrgCT2F1CBZJmxqBssTg';

const bot = new TelegramBot(token, { polling: true });

// Store user states
const userStates = {};

// Listen for messages
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // Check if the user is starting the conversation
    if (!userStates[chatId]) {
        if (msg.text.toLowerCase() === 'bot') {
            bot.sendMessage(chatId, 'Welcome to the Calculator Bot! Please type any arithmetic expression (e.g., 5 + 3 * 2) to get started.');
            userStates[chatId] = true; // Mark this user as having started the conversation
        } else {
            bot.sendMessage(chatId, 'Enter Bot Password');
        }
        return; // Exit the function
    }

    const expression = msg.text;

    try {
        // Evaluate the expression using mathjs
        const result = math.evaluate(expression);
        bot.sendMessage(chatId, `Result: ${result}`);
    } catch (error) {
        bot.sendMessage(chatId, 'Invalid expression. Please use a valid arithmetic expression. \n ex:-\t + \t -\t * \t / \n 6+2');
    }
});

// Optional: Reset user state after a period of inactivity
setInterval(() => {
    Object.keys(userStates).forEach(chatId => {
        // You can implement your own logic to reset the state after a certain time
        // For example, resetting if no message received in last 5 minutes
        // Here we simply keep the state until the bot is restarted
    });
}, 60000); // Run every minute
