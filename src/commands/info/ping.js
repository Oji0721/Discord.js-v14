const { Message, Client, EmbedBuilder, Formatters } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ['p'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
      const pong = await message.channel.send({ content: '⠀' }).then((m) => m.delete());
        const embed = new EmbedBuilder()
      .setAuthor({ name: '🏓 Pong!'})
      .setColor('#008000')
      .setDescription(`Bots Ping: ${client.ws.ping}ms!\nApi Ping: ${pong.createdTimestamp - message.createdTimestamp}ms!`)
      .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      return message.reply({ embeds: [embed] })
    },
};
