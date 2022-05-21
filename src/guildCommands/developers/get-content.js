const { Command } = require('../../structures/functions/Command');

module.exports = new Command({
  name: 'get-content',
  type: 3,

  run: async ({ inter }) => {
    const msg = await inter.channel.messages.fetch(inter.targetId);
    inter.reply(msg.content)
  }
})