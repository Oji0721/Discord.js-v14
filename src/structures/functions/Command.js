const {
  ChatInputCommandInteraction,
  ApplicationCommandData,
  PermissionResolvable,
  GuildMember
} = require('discord.js');
const { WbotClient } = require('../client/WbotClient');

/**
* @typedef {{ client: WbotClient, interaction: ChatInputCommandInteraction & { member: GuildMember, client: WbotClient }, args: CommandInteractionOptionResolver }} RunOptions
* @param {RunOptions} runOptions
*/
function RunFunction(runOptions) { }

class Command {
  /**
  * @typedef {{ cooldown?: Number, userPermissions?: PermissionResolvable, botPermissions?: String[], run: RunFunction } & ApplicationCommandData } CommandOptions
  * @param {CommandOptions} options
  */
  constructor(options) {
    Object.assign(this, options)
  }
}

module.exports = { Command }
