const { Event } = require('../../structures/functions/Event');

module.exports = new Event('interactionCreate', async(client, interaction) => {
    if (inter.isContextMenuCommand()) {
      const cmd = client.commands.get(interaction.commandName);
      
if (cmd) cmd.run({ interaction, client });
    }
}
