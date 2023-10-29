import PageBuilder from "fastify-ejs-page-builder";

export default async function (request, reply) {

    const page = new PageBuilder(`./src/webserver/pages/common/!.ejs`);
    page.setPageTitle('Z');
    page.setPageDescription('Z');
    page.setPageNav(true);
    page.setTheme('dark');
    page.setPagePath('dash');

    return reply.render(page.getBuilderPath(), {

        page: page.getPage(),
        user: {
            username: 'pog',

        }

    });

};
