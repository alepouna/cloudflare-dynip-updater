import FastifyStatic from '@fastify/static';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

export default async function (fastify) {

    const assetsPath = path.join(__filename,  '../../assets')

    await fastify.register(FastifyStatic, {

        root: assetsPath,
        prefix: '/assets/', 
        decorateReply: false

    });

}