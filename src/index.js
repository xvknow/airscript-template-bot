const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,                     // Dostęp do serwera
        GatewayIntentBits.GuildMessages,              // Dostęp do wiadomości na serwerze
        GatewayIntentBits.MessageContent,             // Dostęp do treści wiadomości (potrzebne do komend opartych na wiadomościach)
        GatewayIntentBits.GuildMembers,               // Dostęp do listy członków serwera
        GatewayIntentBits.GuildMessageReactions,      // Dostęp do reakcji na wiadomości na serwerze
        GatewayIntentBits.GuildVoiceStates,           // Dostęp do stanu głosowego użytkowników (np. dla botów muzycznych)
        GatewayIntentBits.GuildMessageTyping,         // Powiadomienia o wpisywaniu wiadomości przez użytkowników
        GatewayIntentBits.GuildPresences              // Dostęp do statusów (online/offline) użytkowników na serwerze
    ]
});

client.commands = new Collection();

const commandFolders = fs.readdirSync(path.join(__dirname, 'commands'));
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(path.join(__dirname, 'commands', folder)).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
    }
}

const eventFiles = fs.readdirSync(path.join(__dirname, 'events')).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

client.login(token);