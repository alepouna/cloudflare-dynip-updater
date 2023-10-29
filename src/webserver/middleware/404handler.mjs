import PageBuilder from 'fastify-ejs-page-builder';

export default async function (fastify) {

    fastify.setNotFoundHandler((request, reply) => {

        //if api route 
        if (request.url.startsWith('/api/')) {
            return reply.code(404).send({ dev: process.env === 'development' ? true : false, error: true, code: 404, message: 'Not Found' });
        };

        const page = new PageBuilder();
        page.setPageTitle('Not Found');
        page.setPageDescription('The page you are looking for does not exist.');
        page.setPagePath('error');
        page.setPageNav(false);
        page.setTheme('dark');

        return reply.render('./src/webserver/pages/common/!.ejs', {
            page: page.getPage(),
            error: 404,
            error_desc: 'Page requested does not exist or has been removed :(',
            nobutton: false,
            
        });

    });

};