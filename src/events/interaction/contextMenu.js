module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (inter.isContextMenuCommand()) {
      const cmd = client.commands.get(interaction.commandName);
      
if (cmd) cmd.run({ interaction, client });
    }
  }
}
