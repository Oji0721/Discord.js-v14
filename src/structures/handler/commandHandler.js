module.exports = async (client, globPromise, ascii) => {
  const table = new ascii('Commands Loaded');
  table.setHeading('File', "Load Status");
  const commandFiles = await globPromise(`${process.cwd()}/src/commands/**/*.js`);
  commandFiles.map((value) => {
    
const file = require(value);
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];

    if (file.name) {
      const properties = { directory, ...file  };
      client.commands.set(file.name, properties);
      table.addRow(splitted[7], '✅');
    }
  });
  console.log(table.toString());
}