require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
client.commands = new Discord.Collection();

const prefix = "!nepse";
const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content
    .slice(prefix.length + 1, msg.content.length)
    .split(/ +/);

  const command = args.shift();
  // console.log("Hey there: ", client.commands.get(command))
  if(!client.commands.get(command)){
    msg.reply(`${command} is not a valid command.`);
  } else{
    client.commands.get(command).execute(msg, args);
  }

  // if (command === "show") {
  //   client.commands.get("show").execute(msg, args);
  // }
});

client.login(process.env.TOKEN);
