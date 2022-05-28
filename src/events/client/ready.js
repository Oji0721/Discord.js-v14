const { connect } = require('mongoose');
require('dotenv').config();

module.exports = {
  name: 'ready',
  once: true,
  
  async execute(client) {
    await client.application.fetch();
    
    console.log(`${client.user.tag} is ready to go!`);
    if (process.env.MONGO_URL) {
      await connect(process.env.MONGO_URL)
        .then(() => console.log('Connected to mongodb'))
        .catch((err) => console.log(err));
    }
  }
}
