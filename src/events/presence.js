const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        client.user.setActivity({
            type: ActivityType.Custom,
            name: 'customstatus',
            state: "🔗 www.airscript.pl",
        });
    }
}