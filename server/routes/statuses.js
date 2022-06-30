export default async (app) => {
  app
    .get('/statuses', { name: 'allStatuses' }, async (req, reply) => {
      const statuses = await app.objection.models.status.query();

      reply.render('statuses/index', { statuses });
      return reply;
    })
    .get('/statuses/new', { name: 'newStatus' }, async (req, reply) => {
      // const status = new app.objection.models.status();

      reply.redirect(app.reverse('allStatuses'));
    })
    .get('/statuses/:id/edit', { name: 'editStatus' }, async (req, reply) => {
      // const { id } = req.params;
      const statuses = await app.objection.models.status.query();

      reply.render('statuses/index', { statuses });
      return reply;
    })
    .post('/statuses', { name: 'createStatus' }, async (req, reply) => {
      const status = new app.objection.models.status();
      status.$set(req.body.data);

      // try {
      //   const validStatus = await app.objection.models.status.fromJson(req.body.data);
      //   await app.objection.models.status.query().insert(validStatus);
      //   req.flash('info', i18next.t('flash.users.create.success'));
      //   reply.redirect(app.reverse('root'));
      // } catch ({ data }) {
      //   req.flash('error', i18next.t('flash.users.create.error'));
      //   reply.render('status/new', { status, errors: data });
      // }

      return reply;
    });
};
