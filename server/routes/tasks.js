// @ts-check

export default (app) => {
  app
    .get('/tasks', { name: 'tasks' }, async (req, reply) => {
      const tasks = await app.objection.models.task.query();

      reply.render('tasks/index', { tasks });
      return reply;
    });
};
