const { EmbedBuilder, CommandInteraction, Colors, ActionRowBuilder, ButtonBuilder } = require('discord.js');

  /**
    * @param {CommandInteraction} interaction
  */

module.exports = {
  name: 'interactionCreate',
  
  async execute(interaction, client) {
    if (interaction.isButton()) {
      const embed = interaction.message.embeds[0];
      const Buttons = new ActionRowBuilder()
        .addComponents([
          new ButtonBuilder()
          .setCustomId('suggest-accept')
          .setLabel('Accept')
          .setStyle(3)
          .setDisabled(true)
        ])
        .addComponents([
          new ButtonBuilder()
          .setCustomId('suggest-decline')
          .setLabel('Decline')
          .setStyle(4)
          .setDisabled(true)
        ])
    
      switch (interaction.customId) {
        case 'suggest-accept' : {
          if (!interaction.member.permissions.has('Administrator')) return interaction.reply({ content: 'ONLY ADMINISTRATOR CAN CLICK THIS BUTTON!', ephemeral: true })
          EmbedBuilder.from(embed.data.fields[1] = { name: 'Status', value: 'ACCEPTED' })
          EmbedBuilder.from(embed.data.fields[2] = { name: 'Accepted by', value: interaction.user.tag })
          EmbedBuilder.from(embed.data.color = Colors.Green)
          interaction.message.edit({ embeds: [EmbedBuilder.from(embed.data)], components: [Buttons] });
          return interaction.reply({ content: 'You successfully accept the suggestion!', ephemeral: true })
        }
          break;
        case 'suggest-decline' : {
          if (!interaction.member.permissions.has('Administrator')) return interaction.reply({ content: 'ONLY ADMINISTRATOR CAN CLICK THIS BUTTON!', ephemeral: true })
            EmbedBuilder.from(embed.data.fields[1] = { name: 'Status', value: 'DECLINED' })
              EmbedBuilder.from(embed.data.fields[2] = { name: 'Declined by', value: interaction.user.tag })
                EmbedBuilder.from(embed.data.color = Colors.Red)
                  interaction.message.edit({ embeds: [EmbedBuilder.from(embed.data)], components: [Buttons] });
          return interaction.reply({ content: 'You successfully declined the suggestion!', ephemeral: true })
        }
          break;
      }
    }
  }
}