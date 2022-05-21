module.exports = {
  name: 'interactionCreate',
  async execute(inter, client) {
    if (inter.isContextMenuCommand()) {
      const cmd = client.commands.get(inter.commandName) || client.guildCommands.get(inter.commandName);
      
if (cmd) cmd.run({ inter, client });
    }
  }
}