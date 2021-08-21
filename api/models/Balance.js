/**
 * Balance.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var jsonData_All = {};
var jsonData_Binance = {};
var jsonData_Coinbase = {};

module.exports = {
  attributes: {
    exchange: {type: 'string', required: true},
    balance: {type: 'number', required: true},
    date:{type:'number', required: true},
    lastday_balance: {type: 'number', required: true},
    lastdate:{type:'number', required: true},
    symbol:{type:'string', required: true},
    change:{type:'number', required: true}
  },
  tableName:'balance',
};

