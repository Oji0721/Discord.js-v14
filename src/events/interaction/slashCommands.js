const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
  name: 'interactionCreate',
  
  async execute(interaction, client) {
    if (!interaction.guild) return interaction.reply({ content: 'You can\'t run a command in Dm\'s', ephemeral: true });
    // Slash Command Handling
    if (interaction.isChatInputCommand()) {
      const cmd = client.commands.get(interaction.commandName) || client.guildCommands.get(interaction.commandName);
      if (!cmd) return interaction.reply({ content: "An error has occured", ephemeral: true });
      const embed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true}) })
      .setTimestamp();

      const args = [];

      for (let option of interaction.options.data) {
        if (option.type === ApplicationCommandOptionType.Subcommand) {
          if (option.name) args.push(option.name);
          option.options?.forEach((x) => {
            if (x.value) args.push(x.value);
          });
        } else if (option.value) args.push(option.value);
      }
      interaction.member = interaction.guild.members.cache.get(interaction.user.id);
      
      if (cmd) {
        if(cmd.cooldown) {
          if (client.cooldown.has(`${cmd.name}, ${interaction.user.id}`)) { 
            interaction.reply({ embeds: [ 
              embed.setColor(client.color.mainColor)
              .setDescription(`⚠️ **SLOW DOWN**\nYou are on cooldown \`${ms(client.cooldown.get(`${cmd.name}, ${interaction.user.id}`) - Date.now(), { long: true })}\``)
            ], flags: 64 });
          } else {
          cmd.run(client, interaction, args);
          client.cooldown.set(`${cmd.name}, ${interaction.user.id}`, Date.now() + cmd.cooldown);
          setTimeout(() => {
            client.cooldown.delete(`${cmd.name}, ${interaction.user.id}`);
          }, cmd.cooldown);
          }
        } else if (cmd.userPermissions || cmd.botPermissions) {
          if (!interaction.member.permissions.has(cmd.userPermissions)) {
            return interaction.reply({ embeds: [
              embed.setColor(client.color.redColor)
              .setDescription(`You need a \`${cmd.userPermissions}\` permission to use this command.`)
            ], flags: 64 });
          } else if (!interaction.guild.members.me.permissions.has(cmd.botPermissions)) {
            return interaction.reply({ embeds: [
            embed.setColor(client.color.mainColor)
            .setDescription(`I need a \`${cmd.userPermissions}\` permission to use this command.`)
          ], flags: 64 });
          } else {
            cmd.run(client, interaction, args);
          }
        } else if (cmd.run) {
          cmd.run(client, interaction, args);
        }
      }
    }

    // Context Menu Handling
    if (interaction.isContextMenuCommand()) {
      const command = client.commands.get(interaction.commandName) || client.guildCommands.get(interaction.commandName);
      if (command) command.run(client, interaction);
    }
  }
}