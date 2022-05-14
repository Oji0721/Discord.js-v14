const { Events } = require('../validation/eventNames');

module.exports = async (client, globPromise, ascii) => {
  let table = new ascii('Events Loaded');
  table.setHeading('File', "Load Status");
  
  (await globPromise(`${process.cwd()}/src/events/*/*.js`)).map(async (file) => {
    const event = require(file);
    const F = file.split('/');
    if (!Events.includes(event.name) || !event.name) {
      const L = file.split('/');
      await table.addRow(`${L[7] || 'MISSING'}`, '❌ ' + L[6] + '/' + L[7]);
      return;
    }
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
      await table.addRow(F[7], '✅');
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
      await table.addRow(F[7], '✅');
    }
  });
  console.log(table.toString());
}