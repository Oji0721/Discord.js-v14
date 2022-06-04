const { WbotClient } = require('../client/WbotClient');
const { ClientEvents } = require('discord.js');
/**
* @template {keyof ClientEvents} events
* @param {WbotClient} client
* @param {ClientEvents[events]} eventArgs
*/
function RunFunction(...eventArgs, client) { }

/**
* @template {keyof ClientEvents} events
*/
class Event {
  /**
  * @paran {events} event
  * @param {RunFunction<events>} runFunction
  */
  constructor(event, runFunction) {
    this.event = event;
    this.run = runFunction;
  }
}

module.exports = { Event }
