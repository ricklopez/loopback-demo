module.exports = function(app) {
  app.dataSources.mysqlDs.automigrate('Company', function(err) {
    if (err) throw err;

    app.models.Company.create([{
      name: 'ACME Company',
      city: 'Vancouver'
    }, {
      name: 'PiedPiper',
      city: 'San Francisco'
    }, {
      name: 'Hooli',
      city: 'Palo Alto'
    }, ], function(err, companies) {
      if (err) throw err;

      console.log('Models created: \n', companies);
    });
  });
};