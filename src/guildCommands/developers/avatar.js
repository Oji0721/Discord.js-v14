const { Command } = require('../../structures/functions/Command');

module.exports = new Command({
  name: 'avatar',
  type: 2,
  
  run: async ({ inter, client }) => {
    let user = inter.guild.members.cache.get(inter.targetId) || client.users.cache.get(inter.targerId);

    inter.reply({ content: user.displayAvatarURL({ extension: "png", size: 2048 }), ephemeral: true });
  }
});