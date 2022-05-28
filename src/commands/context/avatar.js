const { ContextCommand } = require('../../structures/functions/ContextCommand');

module.exports = new ContextCommand({
  name: 'avatar',
  type: 2,
  
  run: async ({ interaction, client }) => {
    let user = interaction.guild.members.cache.get(interaction.targetId) || client.users.cache.get(interaction.targerId);

    interaction.reply({ content: user.displayAvatarURL({ extension: "png", size: 2048 }), ephemeral: true });
  }
});
