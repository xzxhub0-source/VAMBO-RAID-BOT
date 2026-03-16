const { Client } = require('discord.js-selfbot-v13');
const client = new Client();

// Use an environment variable for the token - THIS IS IMPORTANT FOR DISCLOUD
const TOKEN = process.env.TOKEN; 
const PREFIX = '!';

client.on('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.id !== client.user.id) return;
    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'raid') {
        const guild = message.guild;
        if (!guild) return; // Don't run in DMs

        const channelName = 'R҉A҉I҉D҉ ҉B҉Y҉ ҉V҉A҉M҉B҉O҉';

        try {
            const newChannel = await guild.channels.create(channelName, { type: 'text' });
            await newChannel.send(`## RAIDED BY VAMBO\n\n### NEVER SCAM AGAIN SON😂\n            😯KICK ROCKS😯\nhttps://media.tenor.com/hWmpAzAlsm4AAAAM/ishowspeed-scary-speed.gif`);
            console.log('✅ Raid command executed.');
        } catch (error) {
            console.error('Error:', error);
        }
    }
});

client.login(TOKEN);
