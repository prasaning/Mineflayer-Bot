const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('move')
        .setDescription('Move to specific coordinates.')
        .addIntegerOption(option => option.setName("x")
            .setDescription("X coord")
            .setRequired(true)
        )
        .addIntegerOption(option => option.setName("y")
            .setDescription("Y coord")
            .setRequired(true)
        )
        .addIntegerOption(option => option.setName("z")
            .setDescription("Z coord")
            .setRequired(true)
        ),
    async execute(interaction, mineFlayer) {
        const x = interaction.options.getInteger("x");
        const y = interaction.options.getInteger("y");
        const z = interaction.options.getInteger("z");
        mineFlayer.moveToCoordinates(x, y, z);
        return await interaction.reply({ content: "> `Moving to coordinates.`", ephemeral: false });
    },
};