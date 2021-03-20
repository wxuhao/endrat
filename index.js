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
    const channel = bot.channels.cache.get('569320697873039379')
    // Run every 10 seconds, when the time is past 7pm PST, send message to chat
    //cron.schedule('* */5 * * * *', () => {
        time = getTime();
        //if (time.minutes > 15) {
        channel.send(config.rat_end_message);
        //}
    //});
});

bot.on('message', message => {

    let command = message.content.substring(config.prefix);

	switch(command) {
        case config.rat_end_message:
            // Find all the channels, filter out the voice ones, and recreate the channels again
            const fetchedChannel = message.guild.channels.cache.get('822725706738827284');
            console.log(fetchedChannel);
            fetchedChannel.delete();
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