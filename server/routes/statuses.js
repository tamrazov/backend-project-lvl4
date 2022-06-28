export default (app) => {
  app
    .get('/statuses', (response, reply) => {
      // const statuses = await app.objection.models.status.query();
      // console.log(statuses, 'statuses');

      reply.render('statuses/index', { });
      return reply;
    });
};
