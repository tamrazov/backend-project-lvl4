// @ts-check

const BaseModel = require('./BaseModel.cjs');
const objectionUnique = require('objection-unique');

const unique = objectionUnique({ fields: ['name'] });

module.exports = class Label extends unique(BaseModel) {
  static get tableName() {
    return 'labels';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1 },
      },
    };
  }

//   static relationMappings = {
//     movies: {
//       relation: BaseModel.ManyToManyRelation,
//       modelClass: BaseModel,
//       join: {
//         from: 'persons.id',
//         through: {
//           from: 'persons_movies.personId',
//           to: 'persons_movies.movieId'
//         },
//         to: 'movies.id'
//       }
//     }
//   };

};
