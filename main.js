const Fhir = require('fhir.js/src/adapters/node');

var client = Fhir({
  baseUrl: process.env.SERVER_URL || 'http://localhost:8888',
    debug: process.env.DEBUG || false,
    auth: {user: 'zorkijofficial@gmail.com', pass: 'secret'}
});

async function getPatients(page = 1, limit = 5) {
  try {
    const res = await client.search({
      type: 'Patient',
      query: {
          //_count: limit,
          //_page: page,
          //$has:
          //"Observation:patient:code": "1234-5",
          //},
        //$revInclude: {
        //  RelatedPerson: "patient"
          //}
          //name: 'maud'
      }
    });
      const bundle = res.data;
      var count = (bundle.entry && bundle.entry.length) || 0;
      console.log(`---Page #${page}---`);
      console.log(JSON.stringify(bundle.entry));
      //console.log("# Patients born in 1974: ", count);
      console.log(`# Query limit: ${limit} / Total: ${bundle.total}`);
  } catch (err) {
    // Error responses
    if (err.status) {
      console.log(err);
      console.log('Error', err.status);
    }
    // Errors
    if (err.data && err.data) {
      console.log('Error', err.data);
    }
  }
}

getPatients();
