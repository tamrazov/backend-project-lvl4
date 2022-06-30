export default (app) => {
  app
    .get('/statuses', { name: 'allStatuses' }, async (req, reply) => {
      const statuses = await app.objection.models.status.query();

      reply.render('statuses/index', { statuses });
      return reply;
    })
    .get('/statuses/new', { name: 'createStatus' }, async (req, reply) => {
      const statuses = await app.objection.models.status.query();

      reply.render('statuses/index', { statuses });
      return reply;
    })
    .get('/statuses/:id/edit', { name: 'editStatus' }, async (req, reply) => {
      // const { id } = req.params;
      const statuses = await app.objection.models.status.query();

      reply.render('statuses/index', { statuses });
      return reply;
    });
};
