const { ContextCommand } = require('../../structures/functions/ContextCommand');

module.exports = new ContextCommand({
  name: 'get-content',
  type: 3,

  run: async ({ interaction }) => {
    const msg = await interaction.channel.messages.fetch(interaction.targetId);
    interaction.reply(msg.content)
  }
})
