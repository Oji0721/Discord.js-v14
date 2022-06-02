const { 
  Client, 
  Partials, 
  Collection 
} = require('discord.js');
const { DiscordTogether } = require('discord-together');
require('dotenv').config();

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
    this.snipes = new Collection();
    this.cooldown = new Collection();
    this.config = require("../config/config.json");
    this.owners = this.config.owners;
    this.color = this.config.color;
  }
  start() {
    if(!process.env.DISCORD_TOKEN) return console.log('❌ Please provide a DISCORD_TOKEN and put it in .env file');
    this.login(process.env.DISCORD_TOKEN);
  }
}

module.exports = { WbotClient };
