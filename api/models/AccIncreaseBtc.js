/**
 * AccIncreaseBtc.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
      price: {type: 'number', required: true},
      day1: {type: 'string', required: true},
      day7: {type: 'string', required: true},
      day30: {type: 'string', required: true},
      day60: {type: 'string', required: true},
      day90: {type: 'string', required: true},
      date:{type:'string', required: true},
      symbol:{type:'string'}
    },

    tableName:'acc_increase_btc',

};

