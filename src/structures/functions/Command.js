const {
  ChatInputCommandInteraction,
  ContextMenuCommandInteraction,
  ApplicationCommandData,
  CommandInteractionOptionResolver,
  PermissionResolvable,
  GuildMember
} = require('discord.js');
const { WbotClient } = require('../client/WbotClient');

/**
* @typedef {{ client: WbotClient, interaction: ChatInputCommandInteraction & { member: GuildMember, client: WbotClient }, inter: ContextMenuCommandInteraction, args: CommandInteractionOptionResolver }} RunOptions
* @param {RunOptions} runOptions
*/
function RunFunction(runOptions) { }

class Command {
  /**
  * @typedef {{ cooldown?: Number, userPermissions?: PermissionResolvable, botPermissions?: PermissionResolvable, run: RunFunction } & ApplicationCommandData } CommandOptions
  * @param {CommandOptions} options
  */
  constructor(options) {
    Object.assign(this, options)
  }
}

module.exports = { Command }
