/**
 * Coin.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {  
    name: {type: 'string', required: true},
    price: {type: 'string', required: true},
    //Market Cap Dominance
    mcd:{type:'string', required: true},
    change:{type:'string'},
    logo:{type:'string'}
    },
  tableName:'coin',

};

