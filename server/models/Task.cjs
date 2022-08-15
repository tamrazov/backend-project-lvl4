// @ts-check

const BaseModel = require('./BaseModel.cjs');
const objectionUnique = require('objection-unique');

// import { Model } from 'objection'
// import Status from './Status.cjs'

const unique = objectionUnique({ fields: ['name'] });

module.exports = class Task extends unique(BaseModel) {
  static get tableName() {
    return 'tasks';
  }

  // static relationMappings = {
  //   status: {
  //     relation: Model.BelongsToOneRelation,
  //     modelClass: Status,
  //     join: {
  //       from: 'tasks.statusId',
  //       to: 'statuses.id'
  //     }
  //   },
  // };
  
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'statusId', 'creatorId'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1 },
        description: { type: 'string' },
        statusId: { type: 'integer' },
        creatorId: { type: 'integer' },
        executorId: { type: 'integer' },
      },
    };
  }
}