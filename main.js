const Fhir = require('./fhir.js/src/adapters/node');
const ResourceValidation = require('json-schema-resource-validation');

const resourceValidation = new ResourceValidation();

var client = Fhir({
    baseUrl: process.env.SERVER_URL || 'http://localhost:8888',
    debug: process.env.DEBUG || false,
    auth: {user: 'zorkijofficial@gmail.com', pass: 'secret'},
    validation: resourceValidation,
});

var args = {
    //    category: [{term: 'TAG term', schema: 'TAG schema', label: 'TAG label'}, ...]
    //type: 'Patient',
    //headers: {
        //'If-None-Exist': 'gender=2'
        //'If-None-Match': '253'
    //},
    resource: {
        resourceType: "Patient",
        name: [{family: 'xxx'}],
        obosralsa: true,
    },
    //query: {
    //    gender: '1'
    //}
};

const getPatients = function (page = 1, limit = 5) {
    client.search(
        //{
        //resource: entry.resource,
        //query: entry.query
        //}
        //{
        //    type: 'Patient',
        //    query: {gender: '0'}
        //} //весь ресурс идет в параметры, игнорирует квери
        {resource: {resourceType: 'Patient'}, query: {name: 'pat'}}
    ).then(function(res) {
            const bundle = res.data;
            //var count = (bundle.entry && bundle.entry.length) || 0;
            //console.log(`---Page #${page}---`);
            console.log(JSON.stringify(bundle.entry, null, 1));
            console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
        }).catch(function(err) {
            // Error responses
            if (err.status) {
                console.log(err);
                console.log('Error', err.status);
            }
            // Errors
            if (err.data && err.data) {
                console.log('Error', err.data);
            }
        });
};

const condup = function () {
    client.conditionalUpdate(args).catch(function(err) {
            // Error responses
            if (err.status) {
                console.log(err);
                console.log('Error', err.status);
            }
            // Errors
            if (err.data && err.data) {
                console.log('Error', err.data);
            }
        });
};

const make = function () {
    client.create(args);
};

const update = function() {
    client.update(args).catch(function(err) {
        // Error responses
        if (err.status) {
            console.log(err);
            console.log('Error', err.status);
        }
        // Errors
        if (err.data && err.data) {
            console.log('Error', err.data);
        }
    });
};

const del = function() {
    client.delete(args);
};

const condel = function() {
    const res = client.conditionalDelete(args).then(function(res) {
        //console.log(res.data);
    }).catch(function(err) {
        if (err.status) {
            console.log(err);
            console.log('Error', err.status);
        }
        // Errors
        if (err.data && err.data) {
            console.log('Error', err.data);
        }
    });
};

/*POST /Patient
If-None-Exist: gender=1

{
    "resourceType": "Patient",
    "id": "222",
    "gender": "1",
    "name": [{"family": "xxex"}]
}*/

const reader = function() {
    const res = client.read(args).then(function(res) {
        const bundle = res.data;
        var count = (bundle.entry && bundle.entry.length) || 0;
        console.log(`---Page #${page}---`);
        console.log(JSON.stringify(bundle.entry, null, 1));
        console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
    }).catch(function(err) {
        // Error responses
        if (err.status) {
            console.log(err);
            console.log('Error', err.status);
        }
        // Errors
        if (err.data && err.data) {
            console.log('Error', err.data);
        }
    });
};

const conpatch = function() {
    client.cPatch(
        //resource: {
        //    resourceType: "Patient",
            //id: "1337",
        //    gender: "gavna"
        //},
        //query: {
        //    gender: "kal"
        //}
        args
    );
};

//console.log(resourceValidation.validateResource(args));
//conpatch();
//reader();
make();
//getPatients();
//condup();
//update();
//del();
//condel();

