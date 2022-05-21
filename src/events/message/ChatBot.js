const axios = require('axios');
const ChatBot = require('../../structures/models/ChatBot');

module.exports = {
  name: 'messageCreate',
  
  async execute(message, client) {
    if (message.author.bot || !message.guild || !message.channel || message.channel.type === 'DM') return;
    const name = [
      'My great botmaster, Oji0721.',
      'I was created by Oji0721.'
    ];
    
    ChatBot.findOne({ guildId: message.guild.id }, async (err, data) => {
      if (!data) return;
      if(err) return;
      if (message.channel.id === data.channelId) {
        axios.get(`http://api.brainshop.ai/get?bid=${process.env.BID}&key=${process.env.KEY}&uid=${message.author.id}&msg=${message.content}`)
        .then((res) => {
          if(['@'].some((word) => res.data.cnt.includes(word))) {
            message.channel.sendTyping();
            return message.reply('I can\'t ping Everyone, Here or Role.');
          };
          message.channel.sendTyping();
          return message.reply(res.data.cnt.replace('Acobot Team', 'Oji0721').replace('Aco', 'Wbot').replace('female', 'male'));
        })
        .catch((err) => {
          message.channel.sendTyping();
          return message.channel.send(':x: An Error occured.').then((msg) => setTimeout(() => msg.delete(), 3000)).catch(err => {});
        })
      }
    })
  }
}
