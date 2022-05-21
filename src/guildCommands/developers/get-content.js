const { Command } = require('../../structures/functions/Command');

module.exports = new Command({
  name: 'get-content',
  type: 3,

  run: async (interaction) => {
    const msg = await interaction.channel.messages.fetch(interaction.targetId);
    interaction.reply(msg.content)
  }
})