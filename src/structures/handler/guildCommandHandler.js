const { ApplicationCommandType } = require('discord.js');

module.exports = async (client, globPromise, ascii) => {
  const table = new ascii('Guild Commands Loaded');
  table.setHeading('File', "Load Status");
  const slashCommands = await globPromise(
    `${process.cwd()}/src/guildCommands/*/*.js`
  );

  const arrayOfGuildSlashCommands = [];
  slashCommands.map((value) => {
    const file = require(value);
    const L = value.split('/');
    
if (!file?.name) {
  return table.addRow(L[7], '❌');
} else {
  client.guildCommands.set(file.name, file);
  table.addRow(L[7], '✅');
};

    if ([ApplicationCommandType.Message, ApplicationCommandType.User].includes(file.type)) delete file.description;
    arrayOfGuildSlashCommands.push(file)
  });
  client.on("ready", async () => {
    await client.guilds.cache.get('926400183867146290').commands.set(arrayOfGuildSlashCommands);
  });
  console.log(table.toString());
}