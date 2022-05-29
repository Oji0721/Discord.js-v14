const { Command } = require('../functions/Command');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

module.exports = async (client, globPromise, ascii) => {
  const table = new ascii('Commands Loaded');
  table.setHeading('File', "Load Status");
  /**
  * @type {Command}
  */
  const command = await globPromise(
    `${process.cwd()}/src/commands/*/*.js`
  );

  const arrayOfSlashCommands = [];
  command.map((value) => {
    const file = require(value);
    const L = value.split('/');
    
    if (!file?.name) {
      return table.addRow(L[7], '❌');
    } else {
      client.commands.set(file.name, file);
      table.addRow(L[7], '✅');
    };

    if ([2, 3].includes(file.type)) delete file.description;
    arrayOfSlashCommands.push(file)
  });
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
  client.on('ready', async () => {
    (async () => {
      try {
        if (process.env.GUILD_ID) {
          await rest.put(
            Routes.applicationGuildCommands(client.user.id, process.env.GUILD_ID),
            { body: arrayOfSlashCommands });
        } else {
          await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: arrayOfSlashCommands });
        }
      } catch (err) {
        console.log(err)
      }
    })();
  });
  console.log(table.toString());
}
