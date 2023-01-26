const { Client, GatewayIntentBits } = require("discord.js");
const config = require('./config.json');
const secrets = require('./secrets.json');


const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

bot.login(secrets.token);

bot.once('ready', () => {
  console.log('Ready!');
  const allChannels = bot.channels.cache;
  const checkRole = (member) => {
    const member_role_names = member.roles.cache.map((role) => role['name']);
    return member_role_names.includes(config.role);
  };
  voice_channels = Array.from(allChannels.values())
    .filter(channel => channel.isVoiceBased);
  voice_channels.forEach(channel =>
    channel.members.filter(member => checkRole(member))
      .forEach(member_with_role => member_with_role.voice.disconnect()));
  process.exit()
});
