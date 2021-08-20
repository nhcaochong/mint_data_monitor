module.exports.cron = {
    job1: {
      schedule: '1 * * * * *',
      // in May 17 15:47:30 GMT-0300 (BRT)
      onTick: function() {
        console.log("开始采集MCD数据");
        var request = require('request');
        const axios = require('axios');
        const cheerio = require('cheerio') 
        const targetUrl = "https://www.coingecko.com/en/coins/bitcoin";
        var mcd = "";
        var price = "";
      axios.get(targetUrl).then(async function (request) {
        // handle success
        //console.log(res.data);
        let $ = cheerio.load(request.data, {
          decodeEntities: false,
        });
        $("[itemtype='https://schema.org/Table']  span:eq(7)").each(function () {
          let text = $(this).html();
          mcd = String(text).replace(/(^\s*)|(\s*$)/g, "");
        });
        $("[itemtype='https://schema.org/Table']  span:eq(2)").each(function () {
          let text = $(this).html();
          price = String(text);
        });
         console.log("MCD准备数据入库");
        let coin = await Coin.find({sort: "id desc",limit:1});
        if(coin.length<=0){
          await Coin.create({name:"Bitcoin" , symbol:"BTC" , mcd:mcd , price:price});
        }else{
          await Coin.update(coin[0].id).set({name:"Bitcoin" , symbol:"BTC" , mcd:mcd , price:price});
        }
        console.log("MCD数据入库成功 mcd:"+mcd);
      })
      .catch(function (error) {
          // handle error
          console.log(error);
      })
      .finally( function () {
        return 0;
      }); 
        },
        start: true, // Start task immediately
        timezone: 'Asia/Taipei',
        runOnInit: true
        // timezone Brazil example
      },

      job2: {
      schedule: '* 1 * * * *',
      // in May 17 15:47:30 GMT-0300 (BRT)
      onTick: function() {
      var res = require('request');
      const axios = require('axios');
      const cheerio = require('cheerio') 
      const targetUrl = "https://www.qkl123.com/data/s2f/btc";
      var mcd = "";
      var price = "";
      axios.get(targetUrl).then(async function (res) {
        // handle success
        //console.log(res.data);
        console.log("开始采集S2F数据");
        let $ = cheerio.load(res.data, {
          decodeEntities: false,
        });
        var lastdate = $(".week-data__item:eq(7) ").find(".week-data__header").text();
        lastdate = String(lastdate).replace(/(^\s*)|(\s*$)/g, "");
        var tmpstr="";
        var tempprice;
        var tempchange="";
        var index=0;
        var index2=0;
        var index3=0;
        var num = 0;
        var price;
        var s2fMonth;
        var s2fMonthChange;
        var s2fYear;
        var s2fYearChange;
        var predictMonth;
        var predictMonthChange;
        var predictYear;
        var predictYearChange;
        var symbol = "BTC";
        $(".week-data__item:eq(7) ").find(".week-data__value").each(function () { 
            tmpstr = $(this).text().replace(/(^\s*)|(\s*$)/g, "");
            tmpstr = tmpstr.replace("$","");
            index = tmpstr.indexOf("万");
            index2 = tmpstr.indexOf("(");
            index3 = tmpstr.indexOf(")");
            tempchange = tmpstr.substring(index2+1,index3);
            if(index>0){
              tmpstr = tmpstr.substring(0,index);
              tempprice= Number(tmpstr) * 10000;
            }else{
              if(index2>0){
                 tmpstr = tmpstr.substring(0,index2);
                 tempprice= Number(tmpstr);
              }else{
                 tempprice= Number(tmpstr);
              }
            }
            switch (num) {
              case 0:
                  price  = tempprice;
                  change = tempchange;
                  break;
              case 1:
                  s2fMonth  = tempprice;
                  s2fMonthChange = tempchange;
                  break;
              case 2:
                  s2fYear  = tempprice;
                  s2fYearChange = tempchange;
                  break;
              case 3:
                  predictMonth  = tempprice;
                  predictMonthChange = tempchange;
                  break;
              case 4:
                  predictYear  = tempprice;
                  predictYearChange = tempchange;
                  break;
              default:
                  
            }
            num++;
        });

        console.log("S2F准备数据入库 lastdate:"+lastdate);
        let s2f = await S2fBtc.find({date:lastdate});
        if(s2f.length>0){
          console.log("S2F数据入库 lastdate:"+lastdate+"的记录已存在，跳过。");
        }else{
          await S2fBtc.create({
            price:price, 
            change:change, 
            s2fMonth:s2fMonth , 
            s2fMonthChange:s2fMonthChange,
            s2fYear:s2fYear, 
            s2fYearChange:s2fYearChange, 
            predictMonth:predictMonth , 
            predictMonthChange:predictMonthChange,
            predictYear:predictYear, 
            predictYearChange:predictYearChange, 
            date:lastdate , 
            symbol:symbol
          });
           console.log("S2F数据入库成功 lastdate:"+lastdate);
        }
      })
      .catch(function (error) {
          // handle error
          console.log(error);
      })
      .finally( function () {
        return 0;
      }); 
        },
        start: true, // Start task immediately
        timezone: 'Asia/Taipei',
        runOnInit: true
        // timezone Brazil example
      },

      job3: {
      schedule: '* 1 * * * *',
      // in May 17 15:47:30 GMT-0300 (BRT)
      onTick: function() {
      var res = require('request');
      const axios = require('axios');
      const cheerio = require('cheerio') 
      const targetUrl = "https://www.qkl123.com/data/acc_increase/btc";
      var mcd = "";
      var price = "";
      axios.get(targetUrl).then(async function (res) {
        // handle success
        //console.log(res.data);
        console.log("开始采集ACC-INCREASE数据");
        let $ = cheerio.load(res.data, {
          decodeEntities: false,
        });
        var lastdate = $(".week-data__item:eq(7) ").find(".week-data__header").text();
        lastdate = String(lastdate).replace(/(^\s*)|(\s*$)/g, "");
        
        var tmpstr="";
        var tempprice;
        var tempchange="";
        var index=0;
        var index2=0;
        var index3=0;
        var num = 0;
        var price;
        var day1;
        var day7;
        var day30;
        var day60;
        var day90;
        var symbol = "BTC";
        $(".week-data__item:eq(7) ").find(".week-data__value").each(function () { 
            tmpstr = $(this).text().replace(/(^\s*)|(\s*$)/g, "");
            console.log(" tmpstr = "+tmpstr);
            switch (num) {
              case 0:
                  tmpstr = tmpstr.replace("$","");
                  index = tmpstr.indexOf("万");
                  index2 = tmpstr.indexOf("(");
                  index3 = tmpstr.indexOf(")");
                  tempchange = tmpstr.substring(index2+1,index3);
                  if(index>0){
                    tmpstr = tmpstr.substring(0,index);
                    tempprice= Number(tmpstr) * 10000;
                  }else{
                    if(index2>0){
                       tmpstr = tmpstr.substring(0,index2);
                       tempprice= Number(tmpstr);
                    }else{
                       tempprice= Number(tmpstr);
                    }
                  }
                  price  = tempprice;
                  day1 = tempchange;
                  break;
              case 1:
                  day7  = tmpstr;
                  break;
              case 2:
                  day30  = tmpstr;
                  break;
              case 3:
                  day60  = tmpstr;
                  break;
              case 4:
                  day90  = tmpstr;
                  break;
              default:
                  
            }
            num++;
        });

        console.log("ACC准备数据入库 lastdate:"+lastdate);
        let acc = await AccIncreaseBtc.find({date:lastdate});
        if(acc.length>0){
          console.log("ACC数据入库 lastdate:"+lastdate+"的记录已存在，跳过。");
        }else{
          await AccIncreaseBtc.create({
            price:price, 
            day1:day1, 
            day7:day7, 
            day30:day30, 
            day60:day60, 
            day90:day90, 
            date:lastdate , 
            symbol:symbol
          });
           console.log("ACC数据入库成功 lastdate:"+lastdate);
        }
     })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(async function () {
      return 0;
    });  
      },
      start: true, // Start task immediately
      timezone: 'Asia/Taipei',
      runOnInit: true
      // timezone Brazil example
    },
    job3: {
      schedule: '* 1 * * * *',
      // in May 17 15:47:30 GMT-0300 (BRT)
      onTick: function() {
      var res = require('request');
      const axios = require('axios');
      const cheerio = require('cheerio') 
      const targetUrl = "https://www.qkl123.com/data/acc_increase/btc";
      var mcd = "";
      var price = "";
      axios.get(targetUrl).then(async function (res) {
        // handle success
        //console.log(res.data);
        console.log("开始采集ACC-INCREASE数据");
        let $ = cheerio.load(res.data, {
          decodeEntities: false,
        });
        var lastdate = $(".week-data__item:eq(7) ").find(".week-data__header").text();
        lastdate = String(lastdate).replace(/(^\s*)|(\s*$)/g, "");
        
        var tmpstr="";
        var tempprice;
        var tempchange="";
        var index=0;
        var index2=0;
        var index3=0;
        var num = 0;
        var price;
        var day1;
        var day7;
        var day30;
        var day60;
        var day90;
        var symbol = "BTC";
        $(".week-data__item:eq(7) ").find(".week-data__value").each(function () { 
            tmpstr = $(this).text().replace(/(^\s*)|(\s*$)/g, "");
            console.log(" tmpstr = "+tmpstr);
            switch (num) {
              case 0:
                  tmpstr = tmpstr.replace("$","");
                  index = tmpstr.indexOf("万");
                  index2 = tmpstr.indexOf("(");
                  index3 = tmpstr.indexOf(")");
                  tempchange = tmpstr.substring(index2+1,index3);
                  if(index>0){
                    tmpstr = tmpstr.substring(0,index);
                    tempprice= Number(tmpstr) * 10000;
                  }else{
                    if(index2>0){
                       tmpstr = tmpstr.substring(0,index2);
                       tempprice= Number(tmpstr);
                    }else{
                       tempprice= Number(tmpstr);
                    }
                  }
                  price  = tempprice;
                  day1 = tempchange;
                  break;
              case 1:
                  day7  = tmpstr;
                  break;
              case 2:
                  day30  = tmpstr;
                  break;
              case 3:
                  day60  = tmpstr;
                  break;
              case 4:
                  day90  = tmpstr;
                  break;
              default:
                  
            }
            num++;
        });

        console.log("ACC准备数据入库 lastdate:"+lastdate);
        let acc = await AccIncreaseBtc.find({date:lastdate});
        if(acc.length>0){
          console.log("ACC数据入库 lastdate:"+lastdate+"的记录已存在，跳过。");
        }else{
          await AccIncreaseBtc.create({
            price:price, 
            day1:day1, 
            day7:day7, 
            day30:day30, 
            day60:day60, 
            day90:day90, 
            date:lastdate , 
            symbol:symbol
          });
           console.log("ACC数据入库成功 lastdate:"+lastdate);
        }
     })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(async function () {
      return 0;
    });  
      },
      start: true, // Start task immediately
      timezone: 'Asia/Taipei',
      runOnInit: true
      // timezone Brazil example
    },

    job4: {
      schedule: '1 * * * * *',
      // in May 17 15:47:30 GMT-0300 (BRT)
      onTick: function() {
      var res = require('request');
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
      return 0;
    });  
      },
      start: true, // Start task immediately
      timezone: 'Asia/Taipei',
      runOnInit: true
      // timezone Brazil example
    },

    job5: {
      schedule: '1 * * * * *',
      // in May 17 15:47:30 GMT-0300 (BRT)
      onTick: function() {
      var res = require('request');
      var apikey = "1wkyQc3skIy0jj3N37i73GNuZWT";
      var targetUrl = "https://api.glassnode.com/v1/metrics/distribution/balance_exchanges?a=BTC&c=native&e=binance&i=24h";
      const axios = require('axios');
      axios.get(targetUrl,{
        params:{
          api_key:apikey
        }
      }).then(async function (res) {
        console.log("开始请求币安交易所的比特币数据");
        var exchange="Binance";
        var balance;
        var date;
        var lastday_balance;
        var lastdate;
        var symbol="BTC";
        var change;
        var jsonData = res.data;
        Balance.jsonData_Binance = jsonData;
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
        console.log("币安比特币余额准备数据入库 lastdate:"+date);
        let b1 = await Balance.find({date:date,exchange:exchange});
        if(b1.length>0){
          console.log("币安比特币余额数据入库 date:"+date+"的记录已存在，跳过。");
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
           console.log("币安比特币余额数据入库成功 lastdate:"+lastdate);
        }
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(async function () {
      return 0;
    });  
      },
      start: true, // Start task immediately
      timezone: 'Asia/Taipei',
      runOnInit: true
      // timezone Brazil example
    },

    job6: {
      schedule: '1 * * * * *',
      // in May 17 15:47:30 GMT-0300 (BRT)
      onTick: function() {
      var res = require('request');
      var apikey = "1wkyQc3skIy0jj3N37i73GNuZWT";
      var targetUrl = "https://api.glassnode.com/v1/metrics/distribution/balance_exchanges?a=BTC&c=native&e=coinbase&i=24h";
      const axios = require('axios');
      axios.get(targetUrl,{
        params:{
          api_key:apikey
        }
      }).then(async function (res) {
        console.log("开始请求Coinbase交易所的比特币数据");
        var exchange="Coinbase";
        var balance;
        var date;
        var lastday_balance;
        var lastdate;
        var symbol="BTC";
        var change;
        var jsonData = res.data;
        Balance.jsonData_Coinbase = jsonData;
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
        console.log("Coinbase比特币余额准备数据入库 lastdate:"+date);
        let b1 = await Balance.find({date:date,exchange:exchange});
        if(b1.length>0){
          console.log("Coinbase比特币余额数据入库 date:"+date+"的记录已存在，跳过。");
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
           console.log("Coinbase比特币余额数据入库成功 lastdate:"+lastdate);
        }
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(async function () {
      return 0;
    });  
      },
      start: true, // Start task immediately
      timezone: 'Asia/Taipei',
      runOnInit: true
      // timezone Brazil example
    },
  };


