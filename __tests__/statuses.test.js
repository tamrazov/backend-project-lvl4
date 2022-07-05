import fastify from 'fastify';
import init from '../server/plugin.js';
import { getTestData, prepareData } from './helpers/index.js';

// @ts-ignore

describe('test statuses CRUD', () => {
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
      url: app.reverse('statuses'),
    });

    expect(response.statusCode).toBe(200);
  });

  test('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newStatus'),
    });

    expect(response.statusCode).toBe(200);
  });

  test('edit page', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('statuses/edit', { id: 1 }),
    });

    expect(response.statusCode).toBe(200);
  });

  test('create', async () => {
    const params = testData.statuses.new;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('createStatus'),
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(200);
    const status = await models.status.query().findOne({ name: params.name });
    expect(status).toMatchObject(params);
  });

  test('delete', async () => {
    const { id } = testData.statuses.deleting;
    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('deleteStatus', { id }),
    });

    expect(response.statusCode).toBe(200);

    const status = await models.status.query().findById(id);
    expect(status).toBeUndefined();
  });

  test('edit', async () => {
    const params = testData.statuses.editing;
    const { id } = testData.statuses.existing2;

    const response = await app.inject({
      method: 'POST',
      url: app.reverse('editStatus', { id }),
      payload: {
        data: params,
      },
    });

    const status = await models.status.query().findById(id);

    expect(response.statusCode).toBe(200);
    expect(status.name).toBe(params.name);
  });
});
