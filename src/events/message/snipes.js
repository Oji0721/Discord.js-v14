module.exports = {
  name: 'messageDelete',

  async execute(message, client) {
    if(!message.guild || message.author?.bot) return;
    client.snipes.set(message.channel.id, {
      content: message.content,
      author: message.author?.tag,
      avatar: message.author?.displayAvatarURL({ dynamic: true }),
      image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })
  }
}