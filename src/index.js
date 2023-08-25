/** @format */

require("dotenv").config();
const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`Logged in as ${c.user.tag}`);
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) {
    // This makes it not reply to it self if it got same hello command back
    return;
  }
  if (msg.content === "hello") {
    msg.reply(`what up @${msg.author.username}`);
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "add") {
    const num1 = interaction.options.get("first-number").value;
    const num2 = interaction.options.get("second-number").value;

    interaction.reply(`Sum is ${num1 + num2}`);
  }

  if (interaction.commandName === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("Embed Title")
      .setDescription("This is an Embed Description")
      .setColor("Random")
      .addFields(
        {
          name: "Field title",
          value: "some random value",
          inline: false,
        },
        {
          name: "Second Field title",
          value: "some random value",
          inline: true,
        },
        {
          name: "Third Field title",
          value: "some random value",
          inline: true,
        },
      );
    interaction.reply({ embeds: [embed] });
  }
});

client.on('messageCreate', (msg) => {
  if(msg.content === 'embed') {
    const embed = new EmbedBuilder()
      .setTitle("Embed Title")
      .setDescription("This is an Embed Description")
      .setColor("Random")
      .addFields(
        {
          name: "Field title",
          value: "some random value",
          inline: false,
        },
        {
          name: "Second Field title",
          value: "some random value",
          inline: true,
        },
        {
          name: "Third Field title",
          value: "some random value",
          inline: true,
        },
      );
      msg.channel.send({ embeds: [embed] });
  }
})
client.login(process.env.TOKEN);
