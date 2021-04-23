require('dotenv').config();
import cron from 'node-cron';
import speedTest from 'speedtest-net';
import Discord, { MessageEmbed } from 'discord.js';

console.log(`Running speedtest every ${process.env.INTERVAL}`);

let isDiscordReady = false;
const discordClient = new Discord.Client();
discordClient.login(process.env.DISCORD_TOKEN);
discordClient.on('ready', () => isDiscordReady = true);

// @ts-ignore
const task = cron.schedule(process.env.INTERVAL, async () => {
    console.log('starting speed test');
    try {
        const res = await speedTest({
            acceptLicense: true
        });
        console.log(res);

        if (!isDiscordReady)
            return;
        
        const embed = new MessageEmbed();
        embed.setTitle('Speed Test Result');
        embed.setDescription(JSON.stringify(res, null, 4));
        // @ts-ignore
        discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(embed);
    } catch (e) {
        console.log(e);
    }
});

task.start();