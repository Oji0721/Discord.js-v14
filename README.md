
# Hi, I'm Oji0721! 👋


I'm a Discord Bot Developer and here is my bot handler


# Discord.JS V14 Handler

A discord.js handler which support slash commands , events and more...



## **Installation | How to use the Bot**

**1.** Install [Node.js v16](https://nodejs.org/en/) or higher

**2.** Download this repo and unzip it | or git clone it

**3.** Fill everything in **`structures/config/config.json`**

**4.** Fill everything in **`.env`**

**5.** after Fill everything in config Type in shall **`npm install`**

**6.** start the bot with **`node src/structures/index.js`**
<br/>

### _Modify - config.json_

```js
  "owners": [
    "" // Owner ID here
  ]
```

### _Modify - .env_

```txt
DISCORD_TOKEN=YOUR-BOT-TOKEN
MONGO_URL=YOUR-MONGOOSE-URL
```

## Handler Features

- easy to use Handler
- support event Handler
- slash commands support
- message commands support
- based on [Discord.js v14 Documents](https://deploy-preview-1011--discordjs-guide.netlify.app/additional-info/changes-in-v14.html)
- provied code snipet for commands
- support sub directory in commands folder
- support code suggestions in Handler


## Feedback

Just message me on GitHub


## Usage/Examples

- For Slash Command
```js
const { Command } = require('../../structures/functions/Command');

module.exports = new Command({
  name: '',
  description: '',
  userPermissions: '',
  botPermissions: '',
  cooldown: 10000, // 10 Seconds
  type: 1, // ChatInput
  
  run: async ({ interaction }) => {
    // Code
  },
});
```

## License

[MIT LICENSE](https://choosealicense.com/licenses/mit/)

# Thanks For Using My Handler Please Give a Star
