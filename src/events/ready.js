const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const config = require('../config');
const { gradientCristal, gradientLogin } = require('./gradient');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.clear();

        const commandsArray = [];
        const commandFolders = fs.readdirSync(path.join(__dirname, '../commands'));

        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(path.join(__dirname, '../commands', folder)).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                commandsArray.push(command.data.toJSON());
            }
        }

        const rest = new REST({ version: '10' }).setToken(config.token);
        try {
            console.log(gradientCristal('Trwa usuwanie starych slash commands...'));

            const existingCommands = await rest.get(Routes.applicationGuildCommands(config.clientId, config.guildId));

            for (const command of existingCommands) {
                await rest.delete(Routes.applicationGuildCommand(config.clientId, config.guildId, command.id));
            }

            console.log(gradientCristal('Stare slash commands zostały usunięte.'));

            console.log(gradientCristal('Trwa rejestracja nowych slash commands...'));
            console.log(``);

            for (const command of commandsArray) {
                console.log(gradientCristal(`Rejestruję nową komendę: ${command.name}`));
                await rest.post(Routes.applicationGuildCommands(config.clientId, config.guildId), {
                    body: command,
                });
            }
            
            console.log(``);
            console.log(gradientCristal('Nowe Slash Commands zostały zarejestrowane!'));
        } catch (error) {
            console.error(error);
        }
        
        console.log(``);
        console.log(gradientLogin(`Zalogowano jako ${client.user.tag}!`));
        console.log(``);
    }
};