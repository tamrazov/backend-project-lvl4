// @ts-check

import _ from 'lodash';
import fastify from 'fastify';

import init from '../server/plugin.js';
import encrypt from '../server/lib/secure.cjs';
import { getTestData, prepareData } from './helpers/index.js';

// @ts-ignore

describe('test users CRUD', () => {
  let app;
  let knex;
  let models;
  const testData = getTestData();

  beforeAll(async () => {
    app = fastify({ logger: { prettyPrint: true } });
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
      url: app.reverse('users'),
    });

    expect(response.statusCode).toBe(200);
  });

  test('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newUser'),
    });

    expect(response.statusCode).toBe(200);
  });

  test('create', async () => {
    const params = testData.users.new;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('users'),
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);
    const expected = {
      ..._.omit(params, 'password'),
      passwordDigest: encrypt(params.password),
    };
    const user = await models.user.query().findOne({ email: params.email });
    const currentUser = {
      ..._.omit(user, 'id', 'createdAt', 'updatedAt')
    }
    expect(currentUser).toStrictEqual(expected);
  });

  test('delete', async () => {
    const { email } = testData.users.deleting;
    const { id } = await models.user.query().findOne({ email });

    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('deleteUser', { id }),
    });

    expect(response.statusCode).toBe(302);

    const user = await models.user.query().findById(id);

    expect(user).toBeUndefined();
  });

  test('edit', async () => {
    const params = testData.users.editing;
    const { email } = testData.users.existing2;
    const { id } = await models.user.query().findOne({ email });

    const response = await app.inject({
      method: 'POST',
      url: app.reverse('editUser', { id }),
      payload: {
        data: params,
      },
    });

    const editingUser = await models.user.query().findById(id);

    expect(response.statusCode).toBe(200);
    expect(params.email).toBe(editingUser.email);
  });

  afterEach(async () => {
    // Пока Segmentation fault: 11
    // после каждого теста откатываем миграции
    // await knex.migrate.rollback();
  });

  afterAll(async () => {
    await app.close();
  });
});
