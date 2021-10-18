

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
    if (config.discord.auth.webhook === "") return;
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

//Grab IP from ipify function
async function grabIP() {

    const ipRequest = await fetch('https://api.ipify.org?format=json');
    const ipResponse = await ipRequest.json();
    return ipResponse.ip;

};

//Update records to CloudFlare
async function saveToCf() {

    let successes = 0;

    for (let i = 0; i < config.records.length; i++) {
        let record = config.records[i];

        //Sanity checks
        if (record.zone_identifier === "") return;
        if (record.dns_identifier === "") return;
        if (record.type === "") return;
        if (record.name === "") return;
        if (record.ttl === "") return;
        if (record.proxied === "") return;   
        
        //Type check
        if (record.type !== "A" && record.type !== "AAAA" && record.type !== "CNAME") {
            console.log(`[WORKER]: Type ${record.type} is not supported. Skipping.`);
            if (config.discord.notifications.other_errors) sendDiscordWebHook(`[ERROR] Type ${record.type} is not supported for record **${record.name}**. Skipping.`);
            continue;
        };

        const url = `https://api.cloudflare.com/client/v4/zones/${record.zone_identifier}/dns_records/${record.dns_identifier}`;

        const cfRequest = await fetch(url, {
            method: 'PUT',
            headers: cloudflareHeader,
            body: JSON.stringify({
                type: record.type,
                name: record.name,
                content: ip,
                ttl: record.ttl,
                proxied: record.proxied
            })
        });

        const response = await cfRequest.json();

        if (!response.success) {
            console.log(response);
            if (config.discord.notifications.dns_record_update_failure) sendDiscordWebHook(`[ERROR] Failed to update DNS record **${record.name}**`);
        } else successes++;

        if (config.records.length === successes) {
            if (config.discord.notifications.dns_record_update_success) sendDiscordWebHook(`[SUCCESS]: **${successes}/${config.records.length}** records updated.`);
        };

    };

};

//Main function
async function worker() {

    console.log(`[WORKER]: Running worker.`);
    const currentIP = await grabIP();
    if (currentIP !== ip) {
        ip = currentIP;
        console.log(`[WORKER]: IP has changed. Updating CloudFlare DNS record(s).`);
        await saveToCf();
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

//PARSE INFO - ZONE IDS
if (config.parseinfo.show_zone_ids === true) {
    const url = `https://api.cloudflare.com/client/v4/zones`
    const request = await fetch(url, {
        method: 'GET',
        headers: cloudflareHeader
    });

    const response = await request.json();

    console.log(`--------------------- PARSEINFO START ---------------------`)
    console.log(`[PARSEINFO]: Printing Zones`)
    console.log()
    for (let i = 0; i < response.result.length; i++) {
        console.log(`Zone name: ${response.result[i].name} has ID ${response.result[i].id}`)
    };
    console.log(`--------------------- PARSEINFO END ---------------------`)

};

//PARSE INFO - DNS RECORDS
if (config.parseinfo.show_dns_records_for_zone === true) {
    const url = `https://api.cloudflare.com/client/v4/zones/${config.parseinfo.zone_for_dns_records}/dns_records/`
    const request = await fetch(url, {
        method: 'GET',
        headers: cloudflareHeader
    });

    const response = await request.json();

    console.log(`--------------------- PARSEINFO START ---------------------`)
    console.log(`[PARSEINFO]: Printing A/AAAA/CNAME DNS records of zone ${config.parseinfo.zone_for_dns_records}`)
    console.log()
    for (let i = 0; i < response.result.length; i++) {
        if (response.result[i].type !== "A" && response.result[i].type !== "AAAA" && response.result[i].type !== "CNAME") continue; //Skip records that are not A, AAAA or CNAME
        console.log(`DNS record name: ${response.result[i].name} type '${response.result[i].type}' has ID ${response.result[i].id}`)
    };
    console.log(`--------------------- PARSEINFO END ---------------------`)

};

//Worker
if (config.parseinfo.show_zone_ids === false && config.parseinfo.show_dns_records_for_zone === false) {
    console.log(`[WORKER]: Starting worker for ${config.records.length} records.`);
    await worker();
    sendDiscordWebHook(`[INFO] Worker has started.`);
    setInterval(worker, config.interval * 1000);
};
