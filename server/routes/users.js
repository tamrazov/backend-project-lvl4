// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/users', { name: 'users' }, async (req, reply) => {
      const users = await app.objection.models.user.query();
      reply.render('users/index', { users });
      return reply;
    })
    .get('/users/new', { name: 'newUser' }, (req, reply) => {
      const user = new app.objection.models.user();
      reply.render('users/new', { user });
    })
    .post('/users', async (req, reply) => {
      const user = new app.objection.models.user();
      user.$set(req.body.data);

      try {
        const validUser = await app.objection.models.user.fromJson(req.body.data);
        await app.objection.models.user.query().insert(validUser);
        req.flash('info', i18next.t('flash.users.create.success'));
        reply.redirect(app.reverse('root'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/new', { user, errors: data });
      }

      return reply;
    })
    .get('/users/:id', async (req, reply) => {
      const { id } = req.params;
      const user = await app.objection.models.user.query().findById(id);

      reply.render('users/user', { user });
    })
    .post('/users/:id', { name: 'editUser' }, async (req, reply) => {
      const { id, email, password } = req.params;
      await app.objection.models.user.query()
        .findById(id)
        .patch({ email, password });

      const users = await app.objection.models.user.query();

      return reply.render('users/index', { users });
    })
    .delete('/users/:id', { name: 'deleteUser' }, async (req, reply) => {
      const { id } = req.params;

      try {
        await app.objection.models.user.query().findById(id).delete();
        req.flash('success', i18next.t('flash.users.delete.success'));
      } catch (error) {
        req.flash('info', i18next.t('flash.users.delete.error'));
      }

      return reply.redirect(app.reverse('root'));
    });
};
