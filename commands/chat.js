const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chat')
        .setDescription('Sends a chat message.')
        .addStringOption(option => option.setName("message")
            .setDescription("The message that the bots should send")
            .setRequired(true)
        ),
    async execute(interaction, mineFlayer) {
        const msg = interaction.options.getString("message");
        mineFlayer.chat(msg);
        return await interaction.reply({ content: "> `Sent.`", ephemeral: false });
    },
};