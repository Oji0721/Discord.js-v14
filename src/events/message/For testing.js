module.exports = {
  name: 'messageCreate',
  
  async execute(message, client) {
    if (!message.guild) return;
    if (message.content === 'testing') {
      if (message.author.id === '797410561050411038' || '900631272446115881') {
        let newchannel = await message.channel.clone()
        await message.channel.delete()
      }
    };
  }
}