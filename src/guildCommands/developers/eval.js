const { EmbedBuilder, Formatters } = require("discord.js");
const { inspect } = require('util');
const { Command } = require('../../structures/functions/Command');

module.exports = new Command({
    name: "eval",
    description: "Evalute some JavaScript files.",
    type: 1,
    defaultPermission: false,
    options: [
      {
        name: 'code',
        description: 'Write your code here.',
        type: 3,
        required: true
      }
    ],
  
    run: async ({ interaction, client, args }) => {
      if (!client.owners.some(o => interaction.user.id.includes(o))) return interaction.reply({ content: "Sorry, this command is only for the developer", flags: 64 });
      const { channelId, guildId, userId, message, channel, guild, user } = interaction;
      const nuke = async () => {
        let newChannel = await channel.clone();
        await channel.delete();
        await newChannel.send({ content: 'Please enjoy with a new channel :)' });
      };

        const command = interaction.options.getString('code');
        await interaction.deferReply({ ephemeral: true });
      if(['token', 'destroy', 'exit', 'env', 'login'].some(word => interaction.options.getString('code').includes(word))) {
        return interaction.followUp({ content: "Those words are blacklisted!" })
      }

        try {
            const evaled = eval(command)
            const embed = new EmbedBuilder()
            .setColor(client.color.greenColor)
            .setTitle("correctly evaluated")
            .addFields([
              { name: `**Type:**`, value: Formatters.codeBlock('prolog', `${typeof(evaled)}`), inline: true },
              { name: "**Evaluated in:**", value: Formatters.codeBlock('yaml', `${Date.now() -interaction.createdTimestamp}ms`), inline: true },
              { name: "**Entrance**", value: Formatters.codeBlock("js", command) },
              { name: "**Exit**", value: Formatters.codeBlock('js', `${inspect(evaled, {depth: 0})}`) }
              ])

            interaction.followUp({ embeds: [embed], ephemral: true })

        } catch (error) {
            const embedfailure = new EmbedBuilder()
            .setColor(client.color.redColor)
            .addFields([
              { name: `Entrance`, value: Formatters.codeBlock("js", command) },
              { name: `Error`, value: Formatters.codeBlock('js', error) }
            ])

            interaction.followUp({ embeds: [embedfailure], ephemeral: true }) 
        }
    }
})