const { 
  Client, 
  ChatInputCommandInteraction, 
  ApplicationCommandType, 
  ApplicationCommandOptionType, 
  EmbedBuilder 
} = require("discord.js");

module.exports = {
    name: "ping",
    description: "Returns a WebSocket ping.",
    type: ApplicationCommandType.ChatInput,
    options: [
      {
        name: 'ephemeral',
        description: 'Do you want to do the message ephemeral?',
        type: ApplicationCommandOptionType.Boolean,
        defaultMemberPermission: 'Administrator'
      }
    ],
    /**
     *
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      const [ephemeral] = args;
      const pongMessage = await interaction.reply({ content: '⠀', fetchReply: true, ephemeral: ephemeral })
        const embed = new EmbedBuilder()
      .setAuthor({ name: '🏓 Pong!'})
      .setColor('#008000')
      .setDescription(`Bots Ping: ${client.ws.ping}ms!\nApi Ping: ${pongMessage.createdTimestamp - interaction.createdTimestamp}ms!`)
      .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      return interaction.editReply({ embeds: [embed] })
    }
}
