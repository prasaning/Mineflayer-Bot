const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Joins an server.')
        .addStringOption(option => option.setName("host")
            .setDescription("The host that the bots should connect to")
            .setRequired(true)
        )
        .addIntegerOption(option => option.setName("port")
            .setDescription("The port that the bots should connect to")
            .setRequired(true)
        )
        .addIntegerOption(option => option.setName("delay")
            .setDescription("The delay")
        )
        .addStringOption(option => option.setName("version")
            .setDescription("The version that the bots should use")
        )
        .addIntegerOption(option => option.setName("amount")
            .setDescription("The bot amount")
        ),
    async execute(interaction, mineFlayer) {
        const host = interaction.options.getString("host");
        const port = interaction.options.getInteger("port");
        const version = interaction.options.getString("version") ?? "1.8";
        const delay = interaction.options.getInteger("delay") ?? 1000;
        const amount = interaction.options.getInteger("amount") ?? 10;
        mineFlayer.join(host, port, delay, version, amount);
        return await interaction.reply({ content: "> `Connecting to " + host + ":" + port + " with version " + version + " (Sending " + amount + " bots)`", ephemeral: false });
    },
};