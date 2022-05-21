const { ChatInputCommandInteraction, ContextMenuCommandInteraction, ApplicationCommandData, PermissionsBitField } = require('discord.js');
const { WbotClient } = require('../client/WbotClient');

/**
* @typedef {{ client: WbotClient, interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction, args: String[] }} RunOptions
* @param {RunOptions} runOptions
*/
function RunFunction(runOptions) {}

class Command {
  /**
  * @typedef {{ cooldown?: Number, userPermissions?: PermissionsBitField, options?: ApplicationCommandOptionData, run: RunFunction } & ApplicationCommandData} CommandOptions
  * @param {CommandOptions} options
  */
  constructor(options) {
    Object.assign(this, options)
  }
}

module.exports = { Command }