/**
 * Price.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    price: {type: 'number', required: true},
    date: {type: 'number', required: true},
    symbol: {type: 'string', required: true}
  },
  tableName:'price',

};

