import fastify from 'fastify';
import init from '../server/plugin.js';
import { getTestData, prepareData } from './helpers/index.js';

// @ts-ignore

describe('test statuses CRUD', () => {
  let app;
  let knex;
  const testData = getTestData();

  beforeAll(async () => {
    app = fastify();
    await init(app);
    knex = app.objection.knex;

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

  test('create page', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newStatus'),
    });

    expect(response.statusCode).toBe(302);
  });

  test('edit', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('editStatus', { id: 1 }),
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

    expect(response.statusCode).toBe(302);
    // const expected = {
    //   ..._.omit(params, 'password'),
    //   passwordDigest: encrypt(params.password),
    // };
    // const user = await models.user.query().findOne({ email: params.email });
    // expect(user).toMatchObject(expected);
  });
});
