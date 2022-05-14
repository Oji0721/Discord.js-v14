const { 
  Client, 
  ChatInputCommandInteraction, 
  ApplicationCommandType, 
  ApplicationCommandOptionType, 
  EmbedBuilder, 
  Formatters 
} = require("discord.js");
const { inspect } = require('util');
const child = require('child_process');

module.exports = {
    name: "eval",
    description: "Evalute some JavaScript files.",
    type: ApplicationCommandType.ChatInput,
    options: [
      {
        name: 'code',
        description: 'Write your code here.',
        type: ApplicationCommandOptionType.String,
        required: true
      }
    ],
    /**
     *
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        if(interaction.user.id !== '900631272446115881') return interaction.reply({ content: "Sorry, this command is only for the developer", flags: 64 });
      const { channelId, guildId, userId, message, channel, guild, user } = interaction;

        const command = interaction.options.getString('code');
        await interaction.deferReply({ ephemeral: true });
      if(['token', 'destroy', 'exit', 'env', 'login'].some(word => interaction.options.getString('code').includes(word))) {
        return interaction.followUp({ content: "Those words are blacklisted!" })
      }

        try {
            const evaled = eval(command)
            const embed = new EmbedBuilder()
            .setColor("#50C790")
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
            .setColor("#FA5757")
            .addFields([
              { name: `Entrance`, value: Formatters.codeBlock("js", command) },
              { name: `Error`, value: Formatters.codeBlock('js', error) }
            ])

            interaction.followUp({ embeds: [embedfailure], ephemeral: true }) 
        }
    }
}