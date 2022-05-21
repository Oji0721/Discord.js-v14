const { Command } = require('../../structures/functions/Command');

module.exports = new Command({
  name: 'avatar',
  type: 2,
  run: async (interaction, client) => {
    let user =
      interaction.guild.members.cache.get(interaction.targetId) || client.users.cache.get(interaction.targetId);

    interaction.reply({ content: user.displayAvatarURL({ extension: "png", size: 2048 }), ephemeral: true });
  }
});