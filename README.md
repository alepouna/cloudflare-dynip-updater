# cloudflare-dynip-updater
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
Clone the confing.example.json and rename to 'config.json' and edit it as you like. If you'd like to find your Identifiers, uncomment the functions at the end of the script. 
After you have setup a configuration, run the script using pm2 or another daemonizer so the script runs 24/7. 

### Video Tutorial
Coming Soon

# Issues and Contributors

Feel free to submit issues, ideas and others as well as contribute to the project! 
 
[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/eramsorgr)