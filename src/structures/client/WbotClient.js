const { Client, Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { glob } = require("glob");
const { promisify } = require("util");
const ascii = require('ascii-table');
require('dotenv').config();

const globPromise = promisify(glob);

class WbotClient extends Client {
  constructor() {
    super({
      partials: [ 21 ],
      intents: 131071
    });
    this.commands = new Collection();
    this.snipes = new Collection();
    this.cooldown = new Collection();
    this.config = require("../config/config.json");
    this.owners = this.config.owners;
    this.color = this.config.color;
  }
  
  start() {
    if(!process.env.DISCORD_TOKEN) return console.log('❌ Please provide a DISCORD_TOKEN and put it in .env file');
    this.registerModules();
    this.login(process.env.DISCORD_TOKEN);
  }
  
  async registerModules() {
    const cmdTable = new ascii('Commands Loaded');
    cmdTable.setHeading('File', "Load Status");
  
    const command = await globPromise(
      `${process.cwd()}/src/commands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    command.map((value) => {
      const file = require(value);
      const L = value.split('/');
    
      if (!file?.name) {
        return cmdTable.addRow(L[7], '❌')
      } else {
        this.commands.set(file.name, file);
        cmdTable.addRow(L[7], '✅')
      };

      if ([2, 3].includes(file.type)) delete file.description;
      arrayOfSlashCommands.push(file)
    });
    const rest = new REST({ version: '10' }).setToken(this.token);
    this.on('ready', async () => {
      (async () => {
        try {
          if (process.env.GUILD_ID) {
            await rest.put(
              Routes.applicationGuildCommands(this.user.id, process.env.GUILD_ID),
              { body: arrayOfSlashCommands });
          } else {
            await rest.put(
            Routes.applicationCommands(this.user.id),
              { body: arrayOfSlashCommands });
          }
        } catch (err) {
          console.log(err)
        }
      })();
    });
    console.log(cmdTable.toString());

    let eventTable = new ascii('Events Loaded');
    eventTable.setHeading('File', "Load Status");

    (await globPromise(`${process.cwd()}/src/events/*/*.js`)).map(async (file) => {
      const event = require(file);
      if (!event.event) {
        eventTable.addRow(event.event, '❌', 'This file doesn\'t had a name.');
      } else {
        this.on(event.event, event.run.bind(null, this));
        eventTable.addRow(event.event, '✅');
      }
    });
    console.log(eventTable.toString());

    process.on('unhandledRejection', (reason, p) => {
      console.log(reason, p);
    });

    process.on('uncaughtException', (err, origin) => {
      console.log(err, origin);
    });

    process.on('uncaughtExceptionMonitor', (err, origin) => {
      console.log(err, origin);
    });

    process.on('multipleResolves', (type, promise, reason) => {
      console.log(type, promise, reason);
    });
  }
}

module.exports = { WbotClient };
