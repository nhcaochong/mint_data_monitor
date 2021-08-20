module.exports = {


  friendlyName: 'Home page',


  description: '',


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/homepage'
    },
    fail: {
      responseType: 'view',
      viewTemplatePath: 'pages/homepage'
    },
    err: {
      description: 'Occur error',
      viewTemplatePath: 'pages/homepage'
    }
  },

  fn: async function (inputs,exits) {
    let mcd = "42%";
    let date = "2021-08-17";
    return exits.success({
        errno: 0,
        msg: {
          mcd: mcd,
          update_date:date
        }
      });


  }


};
