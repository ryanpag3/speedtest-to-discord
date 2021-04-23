require('dotenv').config();
import cron from 'node-cron';
import speedTest from 'speedtest-net';

console.log(`Running speedtest every ${process.env.INTERVAL}`);

// @ts-ignore
const task = cron.schedule(process.env.INTERVAL, async () => {
    console.log('starting speed test');
    try {
        const res = await speedTest({
            acceptLicense: true
        });
        console.log(res);
    } catch (e) {
        console.log(e);
    }
});

task.start();