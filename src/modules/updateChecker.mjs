import { Logger } from "./logger.mjs";
const logger = new Logger('UpdateChecker');

export default async function() {

    try {

        logger.info('Checking for updates...');
        logger.debug('Fetching AIL versioning server...');

        const response = await fetch('https://versions.aurorais.me/cloudflare-dynip-worker/release');

        logger.debug('Data fetched. Parsing...');

        const data = await response.json();

        logger.debug('Data parsed.');
        logger.trace('AIL VS Data:', data);

        //TODO check if differences

    } catch (err) {

        logger.warn('Could not check for updates for unknown reason. You may not be notified of updates.');
        logger.trace('Update failure', err);

    }

}