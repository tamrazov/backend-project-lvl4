// @ts-check

import i18next from 'i18next';

export default async (app) => {
  app
    .get('/labels', { name: 'labels' }, async (req, reply) => {
      const labels = await app.objection.models.label.query();
      console.log(labels, 'labels')

      reply.render('labels/index', { labels });
      return reply;
    })
    .get('/labels/new', { name: 'newLabel' }, async (req, reply) => {

      reply.render('labels/new');
      return reply;
    })
    .post('/users', async (req, reply) => {
      const label = new app.objection.models.label();
      label.$set(req.body.data);

      try {
        const validLabel = await app.objection.models.label.fromJson(req.body.data);
        await app.objection.models.label.query().insert(validLabel);
        req.flash('info', i18next.t('flash.label.create.success'));
        reply.redirect(app.reverse('root'));
      } catch (err) {
        req.flash('error', i18next.t('flash.label.create.error'));
        reply.render('label/new', { label, errors: err.data });
      }

      return reply;
    })
};
