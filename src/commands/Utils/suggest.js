const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const SuggestionsGuild = require('../../structures/models/SuggestionGuild');
const { Command } = require('../../structures/functions/Command');

module.exports = new Command({
    name: 'suggest',
    description: "Suggest a suggestion",
    type: 1,
    options: [
      {
        name: 'suggestion',
        description: 'Describe your suggestion.',
        type: 3,
        required: true
      }
    ],
  
  run: async ({ interaction, client }) => {
    const { options, guildId, member, user } = interaction;
    const Suggestion = options.getString('suggestion');
    const embed = new EmbedBuilder()
    .setColor(client.color.mainColor)
    .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })})
    .addFields([
      { name: 'Suggestion', value: Suggestion },
      { name: 'Status', value: 'PENDING'}
    ])
      .setTimestamp();

    const Buttons = new ActionRowBuilder()
    .addComponents([
      new ButtonBuilder()
      .setCustomId('suggest-accept')
      .setLabel('Accept')
      .setStyle(3)
    ])
    .addComponents([
      new ButtonBuilder()
      .setCustomId('suggest-decline')
      .setLabel('Decline')
      .setStyle(4)
    ])
    try {
      SuggestionsGuild.findOne({ guildId: interaction.guild.id }, async (err, data) => {
        if(!data) return interaction.reply({ content: 'This server is doesn\'t enabled this future.', ephemeral: true });
        const channel = interaction.guild.channels.cache.get(data.channelId);
        if (!channel) {
          return interaction.reply({ content: 'This server is doesn\'t enabled this future.', flags: 64 })
        }
        
        channel.send({ embeds: [embed], components: [Buttons], fetchReply: true }).then(async (msg) => {
        await msg.react('👍')
        await msg.react('👎')
      });
        
      return interaction.reply({ content: 'You successfully suggested!', flags: 64 });
      });
    } catch (err) {
      console.log(err);
    }
  }
})