const { Formatters } = require("discord.js");
const child = require('child_process');
const { Command } = require('../../structures/functions/Command');

module.exports = new Command({
    name: "terminal",
    description: "Run a code in terminal.",
    type: 1,
    default_permission: false,
    options: [
      {
        name: 'input',
        description: 'Write your input here.',
        type: 3,
        required: true
      }
    ],
  
    run: async ({ interaction, client }) => {
      await interaction.reply({ content: 'PLEASE WAIT', ephemeral: true });
        if (!client.owners.some(o => interaction.user.id.includes(o))) return interaction.followUp({ content: "Sorry, this command is only for the developer", flags: 64 });
      const input = interaction.options.getString('input');
      child.exec(input, async (err, res) => {
        if (err) return interaction.editReply({ content: Formatters.codeBlock('js', err), ephemeral: true });
        interaction.editReply({ content: Formatters.codeBlock('js', res.slice(0, 2000).replace('v16.13.2', 'v18.0.0')) });
      })
    }
})