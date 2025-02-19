const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('move2')
        .setDescription('Move to a player.')
        .addStringOption(option => option.setName("player")
            .setDescription("The player that the bots should move to")
            .setRequired(true)
        ),
    async execute(interaction, mineFlayer) {
        const player = interaction.options.getString("player");
        mineFlayer.moveToPlayer(player);
        return await interaction.reply({ content: "> `Moving to player.`", ephemeral: false });
    },
};