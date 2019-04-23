// Include the adapter
var nativeFhir = require('fhir.js/src/adapters/native');

// Create fhir instance
var fhir = nativeFhir({
    baseUrl: 'https://ci-api.fhir.me',
    auth: {user: 'client', pass: 'secret'}
});

// Execute the search
fhir.search({type: 'Patient', query: {name: 'maud'}}).then(function(response){
    //manipulate your data here.
});
