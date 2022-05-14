const { Message, Client, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "snipe",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
    const msg = client.snipes.get(message.channel.id)
    if (!msg) return message.reply({ content: 'No deleted messages found' })
    const embed = new EmbedBuilder()
    .setAuthor({ name: msg.author, iconURL: msg.avatar})
    .setDescription(`\`${msg.content || 'No Content'}\``)
    .setFooter({ text: 'Get sniped lol' })
    .setColor('#906FED')
    .setImage(msg.image)
    .setTimestamp();
      message.delete();
    return message.channel.send({ embeds: [embed] });
    },
};
