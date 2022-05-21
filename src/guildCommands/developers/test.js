const { Command } = require('../../structures/functions/Command');

module.exports = new Command({
  name: 'test',
  description: 'test',
  type: 1,
  cooldown: 10000,

  run: async (interaction) => {
    interaction.reply('working')
  }
})