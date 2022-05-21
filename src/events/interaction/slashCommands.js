const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const ms = require('ms');
const { Command } = require('../../structures/functions/Command');

module.exports = {
  name: 'interactionCreate',
  
  async execute(interaction, client) {
    if (!interaction.guild) return interaction.reply({ content: 'You can\'t run a command in Dm\'s', ephemeral: true });
    // Slash Command Handling
    if (interaction.isChatInputCommand()) {
      /**
      * @type {Command}
      */
      const command = client.commands.get(interaction.commandName) || client.guildCommands.get(interaction.commandName);
      if (!command) return interaction.reply({ content: "An error has occured", ephemeral: true });
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
      
      if (command) {
        if(command.cooldown) {
          if (client.cooldown.has(`${command.name}, ${interaction.user.id}`)) { 
            interaction.reply({ embeds: [ 
              embed.setColor(client.color.mainColor)
              .setDescription(`⚠️ **SLOW DOWN**\nYou are on cooldown \`${ms(client.cooldown.get(`${command.name}, ${interaction.user.id}`) - Date.now(), { long: true })}\``)
            ], flags: 64 });
          } else {
          command.run({ interaction, client, args });
          client.cooldown.set(`${command.name}, ${interaction.user.id}`, Date.now() + command.cooldown);
          setTimeout(() => {
            client.cooldown.delete(`${command.name}, ${interaction.user.id}`);
          }, command.cooldown);
          }
        } else if (command.userPermissions || command.botPermissions) {
          if (!interaction.member.permissions.has(command.userPermissions)) {
            return interaction.reply({ embeds: [
              embed.setColor(client.color.redColor)
              .setDescription(`You need a \`${command.userPermissions}\` permission to use this command.`)
            ], flags: 64 });
          } else if (!interaction.guild.members.me.permissions.has(command.botPermissions)) {
            return interaction.reply({ embeds: [
            embed.setColor(client.color.mainColor)
            .setDescription(`I need a \`${command.userPermissions}\` permission to use this command.`)
          ], flags: 64 });
          } else {
            command.run({ interaction,  client, args });
          }
        } else if (command.run) {
          command.run({ interaction, client, args });
        }
      }
    }

    // Context Menu Handling
    if (interaction.isContextMenuCommand()) {
      const cmd = client.commands.get(interaction.commandName) || client.guildCommands.get(interaction.commandName);
      if (cmd) cmd.run({ interaction, client });
    }
  }
}