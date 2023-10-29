import fs from 'fs/promises';
import { Logger } from './logger.mjs';
const logger = new Logger('Config');

let conf = {
    app: null
}

export async function readConfig() {

    let config;

    try {

        logger.info('Loading config file...');

        //For development purposes, generate a config file in project /dev/config.json
        if (process.env.NODE_ENV === 'development') {

            logger.debug('Using config file from environment variable.');

            config = await fs.readFile('./dev/config.json', 'utf-8');

        } else {

            // Read the config file
            config = await fs.readFile('/config/config.json', 'utf-8');

        }

        logger.debug('Config file read.');

        logger.debug('Parsing config file data...');

        // Parse the config file
        config = JSON.parse(config);

        logger.info('Config file loaded.');

        logger.trace('Config file:', config);

        conf.app = config;


    } catch (err) {

        logger.error('Error reading config file.')

        //If the config file does not exist, generate it
        if (err.code === 'ENOENT') {

            if (process.env.NODE_ENV === 'development') {
                logger.error('Config file not found. Make sure you have created a config file in /dev/config.json');
                process.exit(1);
            }

            await generateConfig();

        } else {
            logger.error(err);
            throw err;
        }
        
    }

}

async function generateConfig() {

    logger.info('Generating config file...');

    logger.debug('Checking if config folder exists...');

    // Ensure folder `/config` exists
    const configFolderExists = await fs.access('/config').catch(() => false);

    if (!configFolderExists) {
        logger.error('Config folder does not exist. Make sure you have mounted `/config` to the container. ');
        process.exit(1);
    }

    // Generate a config file
    const configData = {
        "webserver": {
            "port": 8080
        },
    }



}

export const config = conf;