const config = require('./config.json');
const secrets = require('./secrets.json');
const {
    Client,
    Attachment
} = require('discord.js');
var cron = require('node-cron');

const bot = new Client();

bot.login(secrets.token);

bot.once('ready', () => {
	console.log('Ready!');
    //Run every 10 seconds, when the time is past 7pm PST, send message to chat
    cron.schedule(config.cron_job, () => {
        time = getTime();
        console.log(time);
        const allChannels = bot.channels.cache;
        for (const key of allChannels.keys()) {
            if (allChannels.get(key).type === "text" && allChannels.get(key).name === "general")
            {
                allChannels.get(key).send(config.rat_end_message);
            }
        }
    });
});

bot.on('message', message => {

    let command = message.content.substring(config.prefix);

	switch(command) {
        case config.rat_end_message:
            // Find all the channels, filter out the voice ones, and recreate the channels again
            const allChannels = message.guild.channels.cache;
            var voiceChannelIds = [];
            for (const key of allChannels.keys()) {
                if (allChannels.get(key).type === "voice" && config.weekday_rat_channels.includes(allChannels.get(key).name))
                {
                    voiceChannelIds.push(key);
                }
            }
            for (const voiceChannelId of voiceChannelIds)
            {
                const fetchedChannel = message.guild.channels.cache.get(voiceChannelId);
                fetchedChannel.delete();
            }
            for (const weekdayRatChannel of config.weekday_rat_channels)
            {
                message.guild.channels.create(weekdayRatChannel, {type: "voice"});
            }
    }
});

function getTime(input) {
    var date = input ? new Date(input) : new Date();
    return {
        hours : date.getHours(),
        minutes : date.getMinutes(),
        seconds : date.getSeconds(),
        milliseconds : date.getMilliseconds()
    }
}