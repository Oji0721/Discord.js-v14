const { 
  Client, 
  ChatInputCommandInteraction, 
  ApplicationCommandType, 
  ApplicationCommandOptionType, 
  Formatters 
} = require("discord.js");
const child = require('child_process');

module.exports = {
    name: "terminal",
    description: "Run a code in terminal.",
    type: ApplicationCommandType.ChatInput,
    default_permission: false,
    options: [
      {
        name: 'input',
        description: 'Write your input here.',
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
      await interaction.reply({ content: 'PLEASE WAIT', ephemeral: true });
        if (!client.owners.some(o => interaction.user.id.includes(o))) return interaction.followUp({ content: "Sorry, this command is only for the developer", flags: 64 });
      const input = interaction.options.getString('input');
      child.exec(input, async (err, res) => {
        if (err) return interaction.editReply({ content: Formatters.codeBlock('js', err), ephemeral: true });
        interaction.editReply({ content: Formatters.codeBlock('js', res.slice(0, 2000).replace('v16.13.2', 'v18.0.0')) });
      })
    }
}