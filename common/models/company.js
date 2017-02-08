'use strict';

module.exports = function(Company) {
  Company.status = function(cb) {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const OPEN_HOUR = 6;
    const CLOSE_HOUR = 20;
    console.log('Current hour is %d', currentHour);
    let response;
    if (currentHour > OPEN_HOUR && currentHour < CLOSE_HOUR) {
      response = 'We are open for business.';
    } else {
      response = 'Sorry, we are closed. Open daily from 6am to 8pm.';
    }
    
    cb(null, response);
  };
  
  Company.getName = function(shopId, cb) {
    Company.findById(shopId, function(err, instance){
      const response = "Name of copmany is " + instance.name;
      cb(null, response);
      console.log(response);
    });
  }
  
  Company.remoteMethod(
    'status', {
      http: {
        path: '/status',
        verb: 'get'
      },
      returns: {
        arg: 'status',
        type:'string'
      }
    }
  );
  
  Company.remoteMethod(
    'getName', {
      http: {
        path: '/getname', 
        verb: 'get'
      },
      accepts: {arg: 'id', type: 'number', http: { source: 'query'} },
      returns: {arg: 'name', type: 'string'}
    }
  );
};
