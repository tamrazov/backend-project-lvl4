// @ts-check

import i18next from 'i18next';

export default async (app) => {
  app
    .get('/statuses', { name: 'allStatuses' }, async (req, reply) => {
      const statuses = await app.objection.models.status.query();

      reply.render('statuses/index', { statuses });
      return reply;
    })
    .get('/statuses/new', { name: 'newStatus' }, async (req, reply) => {
      // const status = new app.objection.models.status();

      reply.render('statuses/new');
      return reply;
    })
    .get('/statuses/:id/edit', { name: 'editPageStatus' }, async (req, reply) => {
      const { id } = req.params;
      const status = await app.objection.models.status.query().findById(id);

      reply.render('statuses/edit', { status });
      return reply;
    })
    .post('/statuses/:id', { name: 'editStatus' }, async (req, reply) => {
      const { id } = req.params;
      // const { name } = req.body.data;
      const status = await app.objection.models.status.query().findById(id);
      req.flash('info', i18next.t('flash.users.create.success'));

      reply.render('statuses/edit', { status });
      return reply;
    })
    .post('/statuses', { name: 'createStatus' }, async (req, reply) => {
      const status = new app.objection.models.status();
      status.$set(req.body.data);

      try {
        const validStatus = await app.objection.models.status.fromJson(req.body.data);
        await app.objection.models.status.query().insert(validStatus);
        // req.flash('info', i18next.t('flash.users.create.success'));
        reply.redirect(app.reverse('root'));
      } catch ({ data }) {
        // req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('status/new', { status, errors: data });
      }

      return reply;
    })
    // .post('/statuses/:id', { name: 'editStatus' }, async (req, reply) => {
    //   const { id } = req.params;
    //   const { email, password } = req.body.data;
    //   const User = await app.objection.models.user.query().findById(id);

  //   try {
  //     await User.query().insert({ email, password });
  //   } catch (error) {
  //     throw error;
  //   }

  //   const users = await app.objection.models.user.query();

    //   return reply.render('users/index', { users });
    // })
    .delete('/statuses/:id', { name: 'deleteStatus' }, async (req, reply) => {
      const { id } = req.params;

      try {
        await app.objection.models.user.query().findById(id).delete();
        req.flash('success', i18next.t('flash.users.delete.success'));
      } catch (error) {
        req.flash('info', i18next.t('flash.users.delete.error'));
      }

      const statuses = await app.objection.models.status.query();

      reply.render('statuses/index', { statuses });
      return reply;
    });
};
