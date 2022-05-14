const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  
  async execute(interaction, client) {
    if (!interaction.guild) return interaction.reply({ content: 'You can\'t run a command in Dm\'s', ephemeral: true });
    // Slash Command Handling
    if (interaction.isChatInputCommand()) {
      const cmd = client.slashCommands.get(interaction.commandName) || client.guildSlashCommands.get(interaction.commandName);
      if (!cmd) return interaction.reply({ content: "An error has occured", ephemeral: true });

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

      cmd.run(client, interaction, args);
    }

    // Context Menu Handling
    if (interaction.isContextMenuCommand()) {
      const command = client.slashCommands.get(interaction.commandName) || client.guildSlashCommands.get(interaction.commandName);
      if (command) command.run(client, interaction);
    }
  }
}