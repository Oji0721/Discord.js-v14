const { 
  Client, 
  ChatInputCommandInteraction, 
  ApplicationCommandType, 
  ApplicationCommandOptionType, 
  EmbedBuilder, 
  ChannelType 
} = require('discord.js');
const SuggestionsGuild = require('../../structures/models/SuggestionGuild');
const ChatBot = require('../../structures/models/ChatBot');

module.exports = {
    name: 'config',
    description: 'setup some features in the server!',
    type: ApplicationCommandType.ChatInput,
    options: [
      {
        name: 'suggestion',
        description: 'Setup a Suggestion channel.',
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: 'channel',
            description: 'Mention a channel that you wanna setup as Suggestion channel.',
            required: true,
            type: ApplicationCommandOptionType.Channel,
            channelTypes: [
              ChannelType.GuildText
            ]
          },
        ]
      },
      {
        name: 'chatbot',
        description: 'Setup a ChatBot channel.',
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: 'channel',
            description: 'Mention a channel that you wanna setup as ChatBot channel.',
            required: true,
            type: ApplicationCommandOptionType.Channel,
            channelTypes: [
              ChannelType.GuildText
            ]
          }
        ]
      }
    ],
     /**
     *
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     * @param {String[]} args
     */
  run: async (client, interaction, args) => {
    if (!interaction.member.permissions.has('Administrator')) return interaction.reply({ content: 'You need to be `Administrator` to user this command', flags: 64 });
    const [subcommand] = args;
    const channel = interaction.options.getChannel('channel').id;
    switch (subcommand) {
      case 'suggestion' : {
        SuggestionsGuild.findOne({ guildId: interaction.guild.id }, async (err, data) => {
          if (err) return;
          if (data) {
            data.delete();
            new SuggestionsGuild({
              guildId: interaction.guild.id,
              channelId: channel
            }).save();
            return interaction.reply({ content: `Successfully setup the channel <#${channel}>!`, flags: 64 });
          }
          if (!data) {
            new SuggestionsGuild({
              guildId: interaction.guild.id,
              channelId: channel
            }).save();
            return interaction.reply({ content: `Successfully setup the channel <#${channel}>!`, flags: 64 });
          }
        })
      }
        break;
      case 'chatbot' : {
        ChatBot.findOne({ GuildId: interaction.guild.id }, async (err, data) => {
          if (err) return;
          if (data) {
            data.delete();
            new ChatBot({
              guildId: interaction.guild.id,
              channelId: channel
            }).save();
            return interaction.reply({ content: `Successfully setup the channel <#${channel}>!`, flags: 64 });
          }
          if (!data) {
            new ChatBot({
              guildId: interaction.guild.id,
              channelId: channel
            }).save();
            return interaction.reply({ content: `Successfully setup the channel <#${channel}>!`, flags: 64 });
          }
        })
      }
        break;
    }
  }
}