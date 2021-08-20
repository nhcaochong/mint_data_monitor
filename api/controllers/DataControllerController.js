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
      var apikey = "1wkyQc3skIy0jj3N37i73GNuZWT";
      var targetUrl = "https://api.glassnode.com/v1/metrics/distribution/balance_exchanges?a=BTC&c=native&e=aggregated&i=24h";
      const axios = require('axios');
      axios.get(targetUrl,{
        params:{
          api_key:apikey
        }
      }).then(async function (res) {
        console.log("开始请求所有交易所的比特币数据");
        var exchange="ALL";
        var balance;
        var date;
        var lastday_balance;
        var lastdate;
        var symbol="BTC";
        var change;
        var jsonData = res.data;
        Balance.jsonData_All = jsonData;
        //业务代码
        if(jsonData.length>0){
          balance = jsonData[jsonData.length-1].v;
          date =  jsonData[jsonData.length-1].t;
          if(jsonData.length>=2){
            lastday_balance = jsonData[jsonData.length-2].v;
            lastdate =  jsonData[jsonData.length-2].t;
          }
          change = Number(balance)-Number(lastday_balance);
        }
        console.log("balance:"+balance+" lastday_balance:"+lastday_balance+" change:"+change);
        console.log("所有交易所比特币余额准备数据入库 lastdate:"+date);
        let b1 = await Balance.find({date:date});
        if(b1.length>0){
          console.log("所有交易所比特币余额数据入库 date:"+date+"的记录已存在，跳过。");
        }else{
          await Balance.create({
            exchange:exchange, 
            balance:balance, 
            date:date , 
            lastday_balance:lastday_balance,
            lastdate:lastdate, 
            symbol:symbol, 
            change:change , 
          });
           console.log("所有交易所比特币余额数据入库成功 lastdate:"+lastdate);
        }
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(async function () {
      return res.ok();
    })
},

}