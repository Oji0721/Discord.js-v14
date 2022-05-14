const { 
  Client, 
  Partials, 
  Collection 
} = require('discord.js');
const { DiscordTogether } = require('discord-together');

class WbotClient extends Client {
  constructor() {
    super({
      partials: [
        Partials.Message,
        Partials.Channel,
        Partials.User,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.GuildScheduledEvent
      ],
      intents: [
        'Guilds',
        'GuildMembers',
        'GuildBans',
        'GuildEmojisAndStickers',
        'GuildIntegrations',
        'GuildWebhooks',
        'GuildInvites',
        'GuildVoiceStates',
        'GuildPresences',
        'GuildMessages',
        'GuildMessageReactions',
        'GuildMessageTyping',
        'DirectMessages',
        'DirectMessageReactions',
        'DirectMessageTyping',
        'MessageContent'
      ]
    });
    this.commands = new Collection();
    this.slashCommands = new Collection();
    this.guildSlashCommands = new Collection();
    this.snipes = new Collection();
    this.config = require("../config/config.json");
    this.discordTogether = new DiscordTogether(this);
  }
}

module.exports = { WbotClient };