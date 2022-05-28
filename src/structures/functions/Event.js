const { ClientEvents } = require('discord.js');
const { WbotClient } = require('../client/WbotClient');

/**
* @ @typedef {{ name: keyof ClientEvents, run: RunFunction }} Key
* @typedef {{ ...args: ClientEvents[Key], client: WbotClient }} RunOptions
* @param {RunOptions} runOptions
*/
function RunFunction(runOptions) { }

class Command {
  /**
  * @typedef {{ name: keyof ClientEvents, run: RunFunction }} CommandOptions
  * @param {CommandOptions} options
  */
  constructor(options) {
    Object.assign(this, options)
  }
}

module.exports = { Command }
