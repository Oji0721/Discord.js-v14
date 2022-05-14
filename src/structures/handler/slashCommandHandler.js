const { ApplicationCommandType } = require('discord.js');

module.exports = async (client, globPromise, ascii) => {
  const table = new ascii('Slash Commands Loaded');
  table.setHeading('File', "Load Status");
  const slashCommands = await globPromise(
    `${process.cwd()}/src/slashCommands/*/*.js`
  );

  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
    const file = require(value);
    const L = value.split('/');
    
if (!file?.name) {
  return table.addRow(L[7], '❌');
} else {
  client.slashCommands.set(file.name, file);
  table.addRow(L[7], '✅');
};

    if ([ApplicationCommandType.Message, ApplicationCommandType.User].includes(file.type)) delete file.description;
    arrayOfSlashCommands.push(file)
  });
  client.on("ready", async () => {
    // Register for a single guilds
    // await client.guilds.cache.get('926400183867146290').commands.set(arrayOfSlashCommands);

    // Register for all the guilds the bot is in
    await client.application.commands.set(arrayOfSlashCommands)
  });
  console.log(table.toString());
}