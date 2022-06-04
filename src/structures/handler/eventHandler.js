module.exports = async (client, globPromise, ascii) => {
  let table = new ascii('Events Loaded');
  table.setHeading('File', "Load Status");
  
  (await globPromise(`${process.cwd()}/src/events/*/*.js`)).map(async (file) => {
    const event = require(file);
    client.on(event.event, event.run.bind(null, client));
    
  });
  console.log(table.toString());
}
