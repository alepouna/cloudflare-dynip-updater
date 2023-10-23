# cloudflare-dynip-updater v2

[![GitHub issues](https://img.shields.io/github/issues/auroraisluna/cloudflare-dynip-updater)](https://github.com/auroraisluna/cloudflare-dynip-updater/issues)
[![GitHub license](https://img.shields.io/github/license/auroraisluna/cloudflare-dynip-updater)](https://github.com/auroraisluna/cloudflare-dynip-updater/blob/master/LICENSE)

A tool that automatically updates your CloudFlare DNS records of your choice with your current IP address. 

# Docker Setup

## Before you start, make sure you have: 
- A site(s) running on CloudFlare and a CloudFlare User API Key with Zone Edit permissions [Create on here](https://dash.cloudflare.com/profile/api-tokens)
- [Optionally] A Discord channel for webhook notifications

## Running the tool

### With Docker Compose
Create a `docker-compose.yml` file with the following content: 
(Update the environment variables with your own values)
```yaml
```

Run `docker-compose up -d` (or `docker compose up -d` if on newer Docker versions) to start the container (add `-d` to run in detached mode)

### With Docker CLI
Run the following command to start the container (add `-d` to run in detached mode)
```bash
```

### Login to the admin panel

By default the container exposes port "11812" for the admin panel of this tool. 
You can login with the following credentials:
Username: `change@changeme.changeme`
Password: `changeme`

!!! You will need to change your password for security purposes. 

If you have forgotten your password, you can reset it by deleting the `users.db` file in the `data` folder. Please note that this will also delete all your other users so you will need to create them again.


# Manual Setup

Clone the repo

Run `npm install` to install all dependencies


# Issues and Contributors

If you have any issues while using the tool, please first check the [issues](https://github.com/auroraisluna/cloudflare-dynip-updater) for similar issues. If you can't find any, please create a new issue with as much information as possible.

If you would like to contribute to the project, please create a pull request with your changes or submit a 'Suggestion' issue with your idea. Contributions are always welcome!

You can also support myself and the project by buying me a coffee: 
[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/auroraisluna)