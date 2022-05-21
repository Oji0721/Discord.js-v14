const { ChatInputCommandInteraction, ContextMenuCommandInteraction, ApplicationCommandOptionData, PermissionsBitField } = require('discord.js');
const { WbotClient } = require('../client/WbotClient');

/**
* @param {WbotClient} client
* @param {ChatInputCommandInteraction | ContextMenuCommandInteraction} interaction
* @param {String[]} args
*/
function RunFunction(interaction, client, args) {}

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