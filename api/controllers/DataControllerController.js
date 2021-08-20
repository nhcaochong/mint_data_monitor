/**
 * DataControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


  getExchangeBalanceJson: async function(req, res){
  		// var balance = require ('../models/Balance') ;
    //     balance.create({exchange:"okex" , balance:'123123' , date: 1628956800 , coinType:'BTC' , change:'14.5' });
      var exchange = req.query.exchange;
      var data;
      if("Binance" == (exchange)){
        data = Balance.jsonData_Binance;
      }else if("Coinbase" == (exchange)){
        data = Balance.jsonData_Coinbase;
      }else{
        data = Balance.jsonData_All;
      }
      return res.json(data);
        
   },

   setCoinData: async function(req, res){
      
  },

}