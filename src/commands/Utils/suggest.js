const { 
  Client, 
  ChatInputCommandInteraction, 
  EmbedBuilder, 
  ActionRowBuilder, ButtonBuilder, 
  ApplicationCommandType, 
  ApplicationCommandOptionType 
} = require("discord.js");
const SuggestionsGuild = require('../../structures/models/SuggestionGuild');

module.exports = {
    name: 'suggest',
    description: "Suggest a suggestion",
    type: ApplicationCommandType.ChatInput,
    options: [
      {
        name: 'suggestion',
        description: 'Describe your suggestion.',
        type: ApplicationCommandOptionType.String,
        required: true
      }
    ],
  
  /**
* 
* @param {Client} client 
* @param {ChatInputCommandInteraction} interaction 
* @param {String[]} args
*/
  
  run: async (client, interaction, args) => {
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

        // if (!channel) return console.log('No channel found');
        
        channel.send({ embeds: [embed], components: [Buttons], fetchReply: true }).then((msg) => {
        msg.react('👍')
        msg.react('👎')
      });
        
      return interaction.reply({ content: 'You successfully suggested!', flags: 64 });
      });
    } catch (err) {
      console.log(err);
    }
  }
}