const {
  ContextMenuCommandInteraction,
  UserApplicationCommandData,
  MessageApplicationCommandData
} = require('discord.js');
const { WbotClient } = require('../client/WbotClient');

/**
* @typedef {{ client: WbotClient, interaction: ContextMenuCommandInteraction }} RunOptions
* @param {RunOptions} runOptions
*/
function RunFunction(runOptions) { }

class ContextCommand {
  /**
  * @typedef {{ run: RunFunction } & UserApplicationCommandData | MessageApplicationCommandData } CommandOptions
  * @param {CommandOptions} options
  */
  constructor(options) {
    Object.assign(this, options)
  }
}

module.exports = { ContextCommand }
