module.exports = {
  name: 'messageCreate',
  
  async execute(message) {
    if (!message.guild) return;
    if (message.content === 'nuke') {
      if (message.author.id === '797410561050411038' || '900631272446115881') {
        let newChannel = await message.channel.clone();
        await message.channel.delete().catch(err => {});
        await newChannel.send({ content: 'Please enjoy with a new channel :)' });
      }
    };
  }
}