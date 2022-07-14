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
};
