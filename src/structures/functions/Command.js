const { ChatInputCommandInteraction, ContextMenuCommandInteraction, ApplicationCommandOptionData, PermissionsBitField } = require('discord.js');
const { WbotClient } = require('../client/WbotClient');

/**
* @typedef {{ client: WbotClient, interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction, args: String[] }} RunOptions
*/
function RunFunction(RunOptions) {}

class Command {
  /**
  * @typedef {{ name: String, description: String, type?: Number, default_permission?: Boolean, cooldown?: Number, userPermissions?: PermissionsBitField, options?: ApplicationCommandOptionData, run: RunFunction }} CommandOptions
  * @param {CommandOptions} options
  */
  constructor(options) {
    this.name = options.name;
    this.description = options.description;
    this.type = options.type;
    this.cooldown = options.cooldown;
    this.options = options.options;
    this.run = options.run;
  }
}

module.exports = { Command }