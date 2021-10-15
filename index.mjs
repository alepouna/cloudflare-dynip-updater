

//Imports
import fs from 'fs';
import fetch from 'node-fetch';

////// CONFIG //////
const conf = await fs.promises.readFile("./config.json");
const config = await JSON.parse(conf.toString());

let ip = ""; //Store ip

//Headers for CloudFlare API
const cloudflareHeader = {
    'X-Auth-Email': config.cloudflare.auth.email,
    'X-Auth-Key': config.cloudflare.auth.key,
    'Content-Type': 'application/json'
};

//Discord webhook notifications for things
async function sendDiscordWebHook(message) {
    if (!message) return;
    await fetch(`${config.discord.auth.webhook}`,
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: message,
            }),
        }
    );
    return true;
};

//Find your zones
async function grabZonesIdentifiers() {
    const url = `https://api.cloudflare.com/client/v4/zones`
    const request = await fetch(url, {
        method: 'GET',
        headers: cloudflareHeader
    });

    const response = await request.json();

    console.log(response);
};

//Find your DNS identifiers
async function grabDNSIdentifier() {
    const url = `https://api.cloudflare.com/client/v4/zones/${config.cloudflare.zone.identifier}/dns_records/`
    const request = await fetch(url, {
        method: 'GET',
        headers: cloudflareHeader
    });

    const response = await request.json();

    console.log(response);
};

//Grab IP from ipify function
async function grabIP() {

    const ipRequest = await fetch('https://api.ipify.org?format=json');
    const ipResponse = await ipRequest.json();
    return ipResponse.ip;

};

//Update records to CloudFlare
async function saveToCf() {

    //Cloudflare put IP
    const url = `https://api.cloudflare.com/client/v4/zones/${config.cloudflare.zone.identifier}/dns_records/${config.cloudflare.dns.identifier}`
    const cfRequest = await fetch(url, {
        method: 'PUT',
        headers: cloudflareHeader,
        body: JSON.stringify({
            type: config.cloudflare.dns.type,
            name: config.cloudflare.dns.name,
            content: ip,
            ttl: config.cloudflare.dns.ttl,
            proxied: config.cloudflare.dns.proxied
        })
    });

    const response = await cfRequest.json();

    if (!response.success) {
        console.log(response);
        if (config.discord.notifications.dns_record_update_failure) sendDiscordWebHook(`[ERROR] Failed to update DNS record.`);
        return false;
    } else return true;

};

//Main function
async function worker() {

    console.log(`[WORKER]: Running worker.`);
    const currentIP = await grabIP();
    if (currentIP !== ip) {
        ip = currentIP;
        console.log(`[WORKER]: IP has changed. Updating CloudFlare DNS record(s).`);
        const cfRes = await saveToCf();
        if (cfRes) {
            console.log(`[WORKER]: CloudFlare DNS record(s) updated.`);
            if (config.discord.notifications.dns_record_update_success) sendDiscordWebHook(`[SUCCESS] CloudFlare DNS record(s) updated.`);
            console.log(`[WORKER]: Halting for ${config.interval}s.`)
        } else {
            console.log(`[WORKER]: Failed to update CloudFlare DNS record(s).`);
            if (config.discord.notifications.dns_record_update_failure) sendDiscordWebHook(`[ERROR] Failed to update CloudFlare DNS record(s).`);
            console.log(`[WORKER]: Halting for ${config.interval}s.`)
        };
    } else {
        console.log(`[WORKER]: IP has not changed. Continuing.`);
        if (config.discord.notifications.ip_same) sendDiscordWebHook(`[SUCCESS] IP has not changed. Continuing.`);
        console.log(`[WORKER]: Halting for ${config.interval}s.`);
    };

};

console.log()
console.log()
console.log("      _____ _                 _ ______ _                ")
console.log("     / ____| |               | |  ____| |               ")
console.log("    | |    | | ___  _   _  __| | |__  | | __ _ _ __ ___ ")
console.log("    | |    | |/ _ \\| | | |/ _` |  __| | |/ _` | '__/ _ \ ")
console.log("    | |____| | (_) | |_| | (_| | |    | | (_| | | |  __/")
console.log("     \\_____|_|\\___/ \\__,_|\\__,_|_|    |_|\\__,_|_|  \\___|")
console.log("                                                       ")
console.log("                  CloudFlare Dynamic IP Updater")
console.log("                eramsorgr - github.com/eramsorgr")
console.log()

//Uncomment any of the two functions if you need to find your zone identifiers or your DNS identifiers
//await grabZonesIdentifiers();
//await grabDNSIdentifier();
console.log(`[WORKER]: Starting worker.`);
await worker();
setInterval(worker, config.interval * 1000);
