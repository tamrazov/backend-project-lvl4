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
      } catch (err) {
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/new', { user, errors: err.data });
      }

      return reply;
    })
    .get('/users/:id', { name: 'editUserPage' }, async (req, reply) => {
      const { id } = req.params;
      const user = await app.objection.models.user.query().findById(id);

      if (!req.isAuthenticated()) {
        const users = await app.objection.models.user.query();

        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/index', { users });
        return reply;
      }
      
      console.log(user, 'user user')

      reply.render('users/user', { user });
    })
    .post('/users/:id', { name: 'editUser' }, async (req, reply) => {
      const { id } = req.params;
      const { name, email, password } = req.body.data;
      const user = await app.objection.models.user.query().findById(id);

      await user.$query().patch({
        name,
        email,
        password,
      });

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
