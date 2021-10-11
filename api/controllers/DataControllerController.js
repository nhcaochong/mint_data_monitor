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
  getAccData: async function(req, res){
    var limit = req.query.limit;
    console.log("limit:"+limit);
    if(limit==null || 0!=limit-limit){
        limit=1
    }
    limit = Number(limit);
    var list = await Price.find({sort:'id desc',limit:limit+1});
    console.log("list.length:"+list.length);
    var p;
    var jsonData = new Array();
    var temdata;
    var price;
    var day1;
    var day7;
    var day30;
    var day60;
    var day90;
    var date;
    var symbol;
    var arrayNum = 0;
    var pdate;
    for (var i = 0; i < list.length; i++) {
      if(i == limit){
        break;
      }
      price = list[i].price;
      symbol = list[i].symbol;
      date = list[i].date;
      day1 = (price - list[i+1].price) / list[i+1].price *100;

      








      //7天
      pdate = date - 24*60*60*6;//不包括今天的7天前
      var p = await Price.find({date:pdate});
      if(p.length>0){
        day7 = (price - p[0].price) / p[0].price *100;
        console.log("today price:"+price);
        console.log("today date:"+date);
        console.log("pdate day7:"+pdate);
        console.log("pdate day7 price:"+p[0].price);
      }
      //30天
      pdate = date - 24*60*60*30;
      var p = await Price.find({date:pdate});
      if(p.length>0){
        day30 = (price - p[0].price) / p[0].price *100;
      }
      //60天
      pdate = date - 24*60*60*60;
      var p = await Price.find({date:pdate});
      if(p.length>0){
        day60 = (price - p[0].price) / p[0].price *100;
      }
      //90天
      pdate = date - 24*60*60*90;
      var p = await Price.find({date:pdate});
      if(p.length>0){
        day90 = (price - p[0].price) / p[0].price *100;
      }
      temdata = {
        price:price,
        day1:day1,
        day7:day7,
        day30:day30,
        day60:day60,
        day90:day90,
        date:date,
        symbol:symbol
      };
      jsonData[arrayNum] = temdata;
      arrayNum++;
    }


    return res.json(jsonData);
  },

}