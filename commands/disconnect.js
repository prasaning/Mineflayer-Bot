const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('disconnect')
        .setDescription('Disconnects from an server.'),
    async execute(interaction, mineFlayer) {
        mineFlayer.disconnect();
        return await interaction.reply({ content: "> `Disconnected.`", ephemeral: false });
    },
};