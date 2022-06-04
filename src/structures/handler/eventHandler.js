module.exports = async (client, globPromise, ascii) => {
  let table = new ascii('Events Loaded');
  table.setHeading('File', "Load Status");
  
  (await globPromise(`${process.cwd()}/src/events/*/*.js`)).map(async (file) => {
    const event = require(file);
    if (!event.event) {
      table.addRow(event.event, '❌', 'This file doesn\'t had a name.');
    } else {
      client.on(event.event, event.run.bind(null, client));
      table.addRow(event.event, '✅');
    }
  });
  console.log(table.toString());
}
