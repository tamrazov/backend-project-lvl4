import fastify from 'fastify';
import init from '../server/plugin.js';
import { prepareData } from './helpers/index.js';

// @ts-ignore

describe('test tasks CRUD', () => {
  let app;
  let knex;
  // let models;
  // const testData = getTestData();

  beforeAll(async () => {
    app = fastify();
    await init(app);
    knex = app.objection.knex;
    // models = app.objection.models;

    // TODO: пока один раз перед тестами
    // тесты не должны зависеть друг от друга
    // перед каждым тестом выполняем миграции
    // и заполняем БД тестовыми данными
    await knex.migrate.latest();
    await prepareData(app);
  });

  beforeEach(async () => {
  });

  test('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('tasks'),
    });

    expect(response.statusCode).toBe(200);
  });

  test('new tasks page', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('tasks/new'),
    });

    expect(response.statusCode).toBe(200);
  });
});
