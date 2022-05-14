module.exports = {
  name: 'messageCreate',
  
  async execute(message, client) {
    if (!message.guild) return;
    if (message.content === 'testing') {
      if (message.author.id === '797410561050411038' || '900631272446115881') {
        message.channel.bulkDelete(100, true)
          setTimeout(() => message.channel.bulkDelete(100, true), 4000)
      }
    };
  }
}