import fastifyView from '@fastify/view';
import ejs from 'ejs';

export default async function (fastify) {

    await fastify.register(fastifyView, {

        engine: {
            ejs: ejs,
        },
        propertyName: 'render'

    });

};
