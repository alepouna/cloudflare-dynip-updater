import 'dotenv/config'
import { setup as webserverSetup } from "./webserver/index.mjs";    
import { readConfig } from "./modules/configReader.mjs";
import { Logger } from './modules/logger.mjs';
import updateChecker from './modules/updateChecker.mjs';
const logger = new Logger('Loader');    

logger.info('Starting Cloudflare DynIP Worker');
logger.info('Booting in environment: ' + process.env.NODE_ENV || 'production');

logger.info('Loading config file...');
await readConfig();

logger.info('Starting WebServer Service');
await webserverSetup();

logger.info('Starting Update Checker Service');
await updateChecker();
//Run the update checker every 2 hours
setInterval(updateChecker, 7200000);
