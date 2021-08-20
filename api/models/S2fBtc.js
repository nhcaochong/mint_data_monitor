/**
 * S2fBtc.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {


    attributes: {
      price: {type: 'number', required: true},
      change: {type: 'string', required: true},
      s2fMonth: {type: 'string', required: true},
      s2fMonthChange: {type: 'string', required: true},
      s2fYear: {type: 'string', required: true},
      s2fYearChange: {type: 'string', required: true},
      predictMonth:{type:'string', required: true},
      predictMonthChange:{type:'string'},
      predictYear:{type:'string', required: true},
      predictYearChange:{type:'string', required: true},
      date:{type:'string', required: true},
      symbol:{type:'string'}
    },

    tableName:'s2f_btc',

};

