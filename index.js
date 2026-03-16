const { Client } = require('discord.js-selfbot-v13');
const client = new Client();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Web server to keep Replit alive
app.get('/', (req, res) => {
  res.send('Selfbot is running!');
});

app.listen(PORT, () => {
  console.log(`Keep-alive server running on port ${PORT}`);
});

// ✅ SECURE: Token comes from Secrets, NOT hardcoded
const TOKEN = process.env.TOKEN;
const PREFIX = '!';

// Check if token exists
if (!TOKEN) {
  console.error('❌ ERROR: No token found! Please add TOKEN to Secrets');
  process.exit(1);
}

client.on('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
    console.log(`Selfbot is ready! Use ${PREFIX}raid in any channel`);
});

client.on('messageCreate', async (message) => {
    if (message.author.id !== client.user.id) return;
    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'raid') {
        const guild = message.guild;
        if (!guild) return message.reply('This command only works in servers!');

        // Channel name with Zalgo text - copy this exactly
        const channelName = 'R҉A҉I҉D҉ ҉B҉Y҉ ҉V҉A҉M҉B҉O҉';

        try {
            const newChannel = await guild.channels.create(channelName, { 
                type: 'text' 
            });
            
            await newChannel.send(`## RAIDED BY VAMBO\n\n### NEVER SCAM AGAIN SON😂\n            😯KICK ROCKS😯\nhttps://media.tenor.com/hWmpAzAlsm4AAAAM/ishowspeed-scary-speed.gif`);
            
            console.log('✅ Raid completed!');
        } catch (error) {
            console.error('Error:', error);
        }
    }
});

client.login(TOKEN);
