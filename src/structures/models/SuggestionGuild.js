const { Schema, model } = require("mongoose");

const SuggestionsGuild = new Schema({
  guildId: { type: String, required:true },
  channelId: { type:String, required:true }
});

const models = new model("SuggestionsGuild", SuggestionsGuild);

module.exports = models;