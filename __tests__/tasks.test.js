import fastify from 'fastify';
import init from '../server/plugin.js';
import { getTestData, prepareData } from './helpers/index.js';

// @ts-ignore

describe('test tasks CRUD', () => {
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
      url: app.reverse('tasks'),
    });

    expect(response.statusCode).toBe(200);
  });

//   test('create page', async () => {
//     const response = await app.inject({
//       method: 'GET',
//       url: app.reverse('newStatus'),
//     });

//     expect(response.statusCode).toBe(302);
//   });

//   test('edit page', async () => {
//     const response = await app.inject({
//       method: 'GET',
//       url: app.reverse('editPageStatus', { id: 1 }),
//     });

//     expect(response.statusCode).toBe(200);
//   });

//   test('create', async () => {
//     const params = testData.statuses.new;
//     const response = await app.inject({
//       method: 'POST',
//       url: app.reverse('createStatus'),
//       payload: {
//         data: params,
//       },
//     });

//     expect(response.statusCode).toBe(302);
//     // const expected = {
//     //   ..._.omit(params, 'password'),
//     //   passwordDigest: encrypt(params.password),
//     // };
//     // const user = await models.user.query().findOne({ email: params.email });
//     // expect(user).toMatchObject(expected);
//   });

//   test('delete', async () => {
//     const name = testData.statuses.deleting;
//     const { id } = await models.status.query().findOne({ name });

//     const response = await app.inject({
//       method: 'DELETE',
//       url: app.reverse('deleteStatus', { id }),
//     });

//     expect(response.statusCode).toBe(302);

//     // const status = await models.status.query().findById(id);

//     // expect(status).toBeUndefined();
//   });

//   test('edit', async () => {
//     const params = testData.statuses.editing;
//     const { name } = testData.statuses.existing2;
//     const { id } = await models.status.query().findOne({ name });

//     const response = await app.inject({
//       method: 'POST',
//       url: app.reverse('editStatus', { id }),
//       payload: {
//         data: params,
//       },
//     });

//     expect(response.statusCode).toBe(200);
//   });
});
