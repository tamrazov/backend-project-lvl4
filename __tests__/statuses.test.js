import _ from 'lodash';
import fastify from 'fastify';

import init from '../server/plugin.js';
import encrypt from '../server/lib/secure.cjs';
import { getTestData, prepareData } from './helpers/index.js';

// @ts-ignore

describe.only('test statuses CRUD', () => {
  let app;
  let knex;
  let models;
  const testData = getTestData();

  beforeAll(async () => {
    app = fastify();
    await init(app);
    knex = app.objection.knex;
    models = app.objection.models;

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
      url: app.reverse('allStatuses'),
    });

    expect(response.statusCode).toBe(200);
  });

  test('create', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('createStatus'),
    });

    expect(response.statusCode).toBe(200);
  });

  test('edit', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('editStatus', { id: 1 }),
    });

    expect(response.statusCode).toBe(200);
  });
});
