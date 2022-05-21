const { EmbedBuilder, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
    /**
    * @param {CommandInteraction} interaction
    * @param {Client} client
    */
  async execute(interaction, client) {
    if (interaction.isSelectMenu()) {
      if(interaction.customId === 'edited') {
    
        // [EMBEDS]
        const embed = new EmbedBuilder()
          .setAuthor({ name: 'The interaction is expired!', iconURL: 'https://cdn.lengolabs.com/qbot-icons/xmark.png' })
          .setDescription('The interaction is exprired please run the command if you want to use the command again.')
          .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
          .setColor(client.color.redColor)
          .setTimestamp();
        await interaction.deferReply({ ephemeral: true })
    
        const value = interaction.values[0];
        if (value === 'info') { 
          interaction.followUp({ embeds: [embed] });
        } else if (value === 'utils') {
          interaction.followUp({ embeds: [embed] })
        }
      }
    }
  }
}
