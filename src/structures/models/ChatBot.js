const { Schema, model } = require("mongoose");

const ChatBot = new Schema({
  guildId: { type: String, required:true },
  channelId: { type:String, required:true }
});

const models = new model("ChatBot", ChatBot);

module.exports = models;