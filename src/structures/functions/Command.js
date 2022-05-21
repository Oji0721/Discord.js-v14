const { ChatInputCommandInteraction, ContextMenuCommandInteraction, ApplicationCommandData, PermissionsBitField, GuildMember } = require('discord.js');
const { WbotClient } = require('../client/WbotClient');

/**
* @typedef {{ client: WbotClient, interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction & { member: GuildMember }, args: String[] }} RunOptions
* @param {RunOptions} runOptions
*/
function RunFunction(runOptions) {}

class Command {
  /**
<<<<<<< HEAD
  * @typedef {{ cooldown?: Number, userPermissions?: PermissionsBitField, run: RunFunction } & ApplicationCommandData } CommandOptions
=======
  * @typedef {{ cooldown?: Number, userPermissions?: PermissionsBitField, run: RunFunction } & ApplicationCommandData} CommandOptions
>>>>>>> origin/main
  * @param {CommandOptions} options
  */
  constructor(options) {
    Object.assign(this, options)
  }
}

module.exports = { Command }
