import { config } from '../modules/configReader.mjs';
import Fastify from 'fastify';
import { loadRoutes } from 'fastifyrouter.js';
import middleware_404handler from './middleware/404handler.mjs';
import middleware_viewEngine from './middleware/viewEngine.mjs';
import middleware_static from './middleware/staticFiles.mjs';
import middleware_error from './middleware/errorHandler.mjs';
import { Logger } from '../modules/logger.mjs';
const logger = new Logger('WebServer');

export async function setup() {

    logger.info('Starting WebServer Service');

    const fastify = Fastify({
        trustProxy: true,
        trailingSlash: true
    });

    logger.debug('Fastify instance created.');

    logger.debug('Registering middleware...');
    logger.debug('Registering 404 handler...');
    await middleware_404handler(fastify);
    logger.debug('Registering view engine...');
    await middleware_viewEngine(fastify);
    logger.debug('Registering static file handler...');
    await middleware_static(fastify);
    logger.debug('Registering error handler...');
    await middleware_error(fastify);
    logger.debug('Middleware registered.');

    logger.debug('Loading routes...');
    await loadRoutes(fastify, { dir: './src/webserver/routes/', log: false, method: 'GET', prefix: '/' });
    logger.debug('Routes loaded.');

    logger.debug('Starting fastify...');

    fastify.listen({port: config.app.webserver.port}, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        logger.info(`Server listening at ${address} || http://localhost:${config.app.webserver.port}`);
    });

    logger.info('WebServer Service started.');

};