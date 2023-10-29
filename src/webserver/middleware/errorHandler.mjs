import PageBuilder from 'fastify-ejs-page-builder';

export default async function (fastify) {

    fastify.setErrorHandler((error, request, reply) => {
        console.log(error, 'error', 'WEBSERVER');
        const page = new PageBuilder();
        page.setPageTitle('Error');
        page.setPageDescription('An error occured.');
        page.setPagePath('error');
        page.setPageNav(false);
        return reply.render('./src/webserver/pages/common/!.ejs', {
            page: page.getPage(),
            error: 500,
            error_desc: 'Internal Server Error.<br>Your request could not be processed.'
        });
    });

};