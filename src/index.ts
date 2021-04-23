require('dotenv').config();
import cron from 'node-cron';
import speedTest from 'speedtest-net';
import Discord, { MessageEmbed } from 'discord.js';
import { formatBytes } from './util/size';

console.log(`Running speedtest every ${process.env.INTERVAL}`);

let isDiscordReady = false;
const discordClient = new Discord.Client();
discordClient.login(process.env.DISCORD_TOKEN);
discordClient.on('ready', () => isDiscordReady = true);

// @ts-ignore
const task = cron.schedule(process.env.INTERVAL, async () => {
    console.log('starting speed test');
    try {
        let options = { acceptLicense: true };
        if (process.env.ACCEPT_SPEEDTEST_LICENSE !== 'true') {
            // @ts-ignore
            delete options.acceptLicense;
            throw new Error(`Please review speedtest license and provide ACCEPT_SPEEDTEST_LICENSE=true when completed.\n\nhttps://www.speedtest.net/about/eula\nhttps://www.speedtest.net/about/terms\nhttps://www.speedtest.net/about/privacy`)
        }
        
        const res = await speedTest(options);
        console.log(res);

        if (!isDiscordReady)
            return;
        
        const embed = new MessageEmbed();
        embed.setTitle('Speed Test Result');
        embed.addField('Download Speed', formatBytes(res.download.bandwidth));
        embed.addField('Upload Speed', formatBytes(res.upload.bandwidth));
        embed.addField('Location', res.server.location);
        embed.addField('Server Host', res.server.host);
        embed.addField('Server IP', res.server.ip);
        embed.addField('Server Port', res.server.port);
        embed.addField('Link', res.result.url);
        // @ts-ignore
        discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(embed);
    } catch (e) {
        console.log(e);
    }
});

task.start();