# ⚠️⚠️ As of 29/02/2024 this repository has been moved to GitLab at https://gitlab.com/alepouna.dev/cloudflare-dynip-updater


# cloudflare-dynip-updater v1.1

[![GitHub issues](https://img.shields.io/github/issues/eramsorgr/cloudflare-dynip-updater)](https://github.com/eramsorgr/cloudflare-dynip-updater/issues)
[![GitHub license](https://img.shields.io/github/license/eramsorgr/cloudflare-dynip-updater)](https://github.com/eramsorgr/cloudflare-dynip-updater/blob/master/LICENSE)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/eramsorgr/cloudflare-dynip-updater.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/eramsorgr/cloudflare-dynip-updater/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/eramsorgr/cloudflare-dynip-updater.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/eramsorgr/cloudflare-dynip-updater/context:javascript)

A tool to use if you have a server with a dynamic IP. The tool will automatically detect your system IP address and update a predefined record on CloudFlare.

# Requirements
- NodeJS v16.8.0 or higher 
- A site running on CloudFlare and a CloudFlare User API Key
- [Optionally] A Discord server for webhook alerts

# Setup

### Text tutorial

Run npm install. 
Clone the confing.example.json and rename to 'config.json' and edit it as you like. 

You can find your zones by changing `parseinfo.show_zone_ids` to **true**, which will print all your zones. Change to **false** after they have been printed.

You can find your DNS records for a zone by adding the zone you want to lookup at `parseinfo.zone_for_dns_records` to a zone ID and then change `parseinfo.show_dns_records_for_zone` to **true**. Make sure to change to **false** after you've got your data.

You can now add zones as you like by copying the template under `records` and pasting it inside the array. Make sure to add commas before each new record.  

```json
{
    "zone_identifier": "ZONE ID", //Zone ID as parsed
    "dns_identifier": "DNS ID", //DNS ID as parsed
    "type": "A/AAAA/CNAME", //Choose either A or AAAA or CNAME
    "name": "", //Record name, INCLUDING the domain (aka as parsed)
    "ttl": "", //TTL time, set to 1 for AUTO
    "proxied": true //Cloudflare orange cloud on/off
}
```

After you have setup a configuration, run the script using pm2 or another daemonizer so the script runs 24/7. 

### Video Tutorial
Coming Soon

# Issues and Contributors

Feel free to submit issues, ideas and others as well as contribute to the project! 
 
[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/eramsorgr)
