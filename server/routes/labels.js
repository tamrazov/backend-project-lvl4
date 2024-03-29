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
    .post('/labels', { name: 'createLabel' }, async (req, reply) => {
      const label = new app.objection.models.label();
      label.$set(req.body.data);

      try {
        const validLabel = await app.objection.models.label.fromJson(req.body.data);
        await app.objection.models.label.query().insert(validLabel);
        req.flash('info', i18next.t('flash.label.create.success'));
        reply.redirect(app.reverse('labels'));
      } catch (err) {
        console.log(JSON.stringify(err.data))
        req.flash('error', i18next.t('flash.label.create.error'));
        reply.render('labels/new', { label, errors: err.data });
      }

      return reply;
    })
    .get('/labels/:id/edit', { name: 'editPage' }, async (req, reply) => {
      const { id } = req.params;
      const label = await app.objection.models.label.query().findById(id);

      reply.render('labels/edit', { label });
    })
    .post('/labels/:id', { name: 'editLabel' }, async (req, reply) => {
      const { id } = req.params;
      const { name } = req.body.data;
      const label = await app.objection.models.label.query().findById(id);

      await label.$query().patch({ name });

      const labels = await app.objection.models.label.query();
      return reply.render('labels/index', { labels });
    })
    .delete('/labels/:id', { name: 'deleteLabel' }, async (req, reply) => {
      const { id } = req.params;

      try {
        await app.objection.models.label.query().findById(id).delete();
        req.flash('success', i18next.t('flash.label.delete.success'));
      } catch (error) {
        req.flash('info', i18next.t('flash.label.delete.error'));
      }

      const labels = await app.objection.models.label.query();

      reply.render('labels/index', { labels });
      return reply;
    });
}
