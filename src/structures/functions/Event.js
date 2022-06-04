const { WbotClient } = require('../client/WbotClient');
const { ClientEvents } = require('discord.js');
/**
* @template {key of ClientEvents} events
* @param {WbotClient} client
* @param {ClientEvents[events]} eventArgs
*/
function RunFunction(...eventArgs, client) { }

/**
* @template {key of ClientEvents} events
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
