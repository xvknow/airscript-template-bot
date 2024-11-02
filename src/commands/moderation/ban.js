const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('testowaKomenda')
        .setDescription('testowaKomenda')
        .addUserOption(option => option.setName('target').setDescription('Użytkownik do zbanowania').setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        await interaction.reply(`${target.tag} został zbanowany.`);
    },
};