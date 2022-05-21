const { EmbedBuilder, ChannelType } = require('discord.js');
const SuggestionsGuild = require('../../structures/models/SuggestionGuild');
const ChatBot = require('../../structures/models/ChatBot');
const { Command } = require('../../structures/functions/Command');

module.exports = new Command({
    name: 'config',
    description: 'setup some features in the server!',
    type: 1,
    default_permission: false,
    userPermissions: 'Administrator',
    botPermissions: 'Administrator',
    options: [
      {
        name: 'suggestion',
        description: 'Setup a Suggestion channel.',
        type: 1,
        options: [
          {
            name: 'channel',
            description: 'Mention a channel that you wanna setup as Suggestion channel.',
            required: true,
            type: 7,
            channelTypes: [
              ChannelType.GuildText
            ]
          },
        ]
      },
      {
        name: 'chatbot',
        description: 'Setup a ChatBot channel.',
        type: 1,
        options: [
          {
            name: 'channel',
            description: 'Mention a channel that you wanna setup as ChatBot channel.',
            required: true,
            type: 7,
            channelTypes: [
              ChannelType.GuildText
            ]
          }
        ]
      }
    ],

  run: async (interaction) => {
    const subcommand = interaction.options.getSubcommand();
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
})