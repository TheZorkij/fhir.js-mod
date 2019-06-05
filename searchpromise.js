var client = Fhir({
    baseUrl: process.env.SERVER_URL || 'http://localhost:8888',
    debug: process.env.DEBUG || false,
    auth: {user: 'zorkijofficial@gmail.com', pass: 'secret'}
});

//SEARCH PARAMS

//*** implemented ***

//_include
const includeSearch = function (page = 1, limit = 5) {
    client.search({
        type: 'MedicationRequest', //get all this
        query: {
            _include: { //where
                MedicationRequest: "patient"  //refers: gets referred (is included)
            }
        }
    }).then(function(res) {
        const bundle = res.data;
        var count = (bundle.entry && bundle.entry.length) || 0;
        console.log(`---Page #${page}---`);
        console.log(JSON.stringify(bundle.entry, null, 1));
        console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
    }).catch (function(err) {
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

//_revinclude
const revincludeSearch = function (page = 1, limit = 5) {
    client.search({
        type: 'MedicationRequest', //get all this
        query: {
            _revinclude: { //where
                Provenance: "target" //refers (is included): gets referred
            }
        }
    }).then(function(res) {
        const bundle = res.data;
        var count = (bundle.entry && bundle.entry.length) || 0;
        console.log(`---Page #${page}---`);
        console.log(JSON.stringify(bundle.entry, null, 1));
        console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
    }).catch(function(err) {
        if (err.status) {
            console.log(err);
            console.log('Error', err.status);
        }
        if (err.data && err.data) {
            console.log('Error', err.data);
        }
    });
};

//_has
const hasSearch = function (page = 1, limit = 5) {
    client.search({
        type: 'Patient', //get all this
        query: {
            _has: { //where
                "Observation:patient:id": '8f364045-873d-40a4-a77d-37fbc1edef3e' //refers (is included): gets referred: and has this
            }
        }
    }).then(function(res) {
        const bundle = res.data;
        var count = (bundle.entry && bundle.entry.length) || 0;
        console.log(`---Page #${page}---`);
        console.log(JSON.stringify(bundle.entry, null, 1));
        console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
    }).catch (function(err) {
        if (err.status) {
            console.log(err);
            console.log('Error', err.status);
        }
        if (err.data && err.data) {
            console.log('Error', err.data);
        }
    });
};



//*** not implemented ***

//_id
const idSearch = function(page = 1, limit = 5) {
    client.search({
        type: 'Patient',
        query: {
            _id: '636ea8a0-3f5b-4fea-a8fe-e977eb07627f' //get resource by id (always unique)
        }
    }).then(function(res) {
        const bundle = res.data;
        var count = (bundle.entry && bundle.entry.length) || 0;
        console.log(`---Page #${page}---`);
        console.log(JSON.stringify(bundle.entry, null, 1));
        console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
    }).catch (function(err) {
        if (err.status) {
            console.log(err);
            console.log('Error', err.status);
        }
        if (err.data && err.data) {
            console.log('Error', err.data);
        }
    });
};

//_lastUpdated
const lastUpdatedSearch = function(page = 1, limit = 5) {
    client.search({
        type: 'Patient',
        query: {
            _lastUpdated: 'gt2010-10-01' //get all modified since
        }
    }).then(function(res) {
        const bundle = res.data;
        var count = (bundle.entry && bundle.entry.length) || 0;
        console.log(`---Page #${page}---`);
        console.log(JSON.stringify(bundle.entry, null, 1));
        console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
    }).catch (function(err) {
        if (err.status) {
            console.log(err);
            console.log('Error', err.status);
        }
        if (err.data && err.data) {
            console.log('Error', err.data);
        }
    });
};

//_tag
const tagSearch = function(page = 1, limit = 5) {
    client.search({
        type: 'Condition',
        query: {
            _tag: 'http://acme.org/codes|needs-review' //get all with tag values {"system":http://acme.org/codes, "code" : "needs-review"}
        }
    }).then(function(res) {
        const bundle = res.data;
        var count = (bundle.entry && bundle.entry.length) || 0;
        console.log(`---Page #${page}---`);
        console.log(JSON.stringify(bundle.entry, null, 1));
        console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
    }).catch (function (err) {
        if (err.status) {
            console.log(err);
            console.log('Error', err.status);
        }
        if (err.data && err.data) {
            console.log('Error', err.data);
        }
    });
};

//_profile
const profileSearch = function(page = 1, limit = 5) {
    client.search({
        type: 'DiagnosticReport',
        query: {
            _profile: 'http://hl7.org/fhir/StructureDefinition/lipid' //get all that is tagged as conforming to profile
        }
    }).then(function(res) {
        const bundle = res.data;
        var count = (bundle.entry && bundle.entry.length) || 0;
        console.log(`---Page #${page}---`);
        console.log(JSON.stringify(bundle.entry, null, 1));
        console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
    }).catch (function (err) {
        if (err.status) {
            console.log(err);
            console.log('Error', err.status);
        }
        if (err.data && err.data) {
            console.log('Error', err.data);
        }
    });
};

//_security
const securitySearch = function(page = 1, limit = 5) {
    client.search({
        type: 'SomeResource',
        query: {
            _security: 'something' //get all with given security label (token)
        }
    }).then(function(res) {
        const bundle = res.data;
        var count = (bundle.entry && bundle.entry.length) || 0;
        console.log(`---Page #${page}---`);
        console.log(JSON.stringify(bundle.entry, null, 1));
        console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
    }).catch (function(err) {
        if (err.status) {
            console.log(err);
            console.log('Error', err.status);
        }
        if (err.data && err.data) {
            console.log('Error', err.data);
        }
    });
};

//_text
const textSearch = function(page = 1, limit = 5) {
    client.search({
        type: 'Condition',
        query: {
            _text: 'bone' //search text field for keywords
        }
    }).then(function(res) {
        const bundle = res.data;
        var count = (bundle.entry && bundle.entry.length) || 0;
        console.log(`---Page #${page}---`);
        console.log(JSON.stringify(bundle.entry, null, 1));
        console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
    }).catch (function (err) {
        if (err.status) {
            console.log(err);
            console.log('Error', err.status);
        }
        if (err.data && err.data) {
            console.log('Error', err.data);
        }
    });
}

//_content
const contentSearch = function(page = 1, limit = 5) {
    client.search({
        type: 'Patient',
        query: {
            _content: 'White' //search entire resource for keywords
        }
    }).then(function(res) {
        const bundle = res.data;
        var count = (bundle.entry && bundle.entry.length) || 0;
        console.log(`---Page #${page}---`);
        console.log(JSON.stringify(bundle.entry, null, 1));
        console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
    }).catch (function(err) {
        if (err.status) {
            console.log(err);
            console.log('Error', err.status);
        }
        if (err.data && err.data) {
            console.log('Error', err.data);
        }
    });
};

//_list
const listSearch = function(page = 1, limit = 5) {
    client.search({
        type: 'Patient',
        query: {
            _list: '42' //retrieve resources from List
        }
    }).then(function (res) {
        const bundle = res.data;
        var count = (bundle.entry && bundle.entry.length) || 0;
        console.log(`---Page #${page}---`);
        console.log(JSON.stringify(bundle.entry, null, 1));
        console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
    }).catch (function (err) {
        if (err.status) {
            console.log(err);
            console.log('Error', err.status);
        }
        if (err.data && err.data) {
            console.log('Error', err.data);
        }
    });
};

//_type
const typeSearch = function(page = 1, limit = 5) {
    client.search({
        query: {
            //other params
            _type: 'patient' //get non-fixed type resources
        }
    }).then(function (res) {
        const bundle = res.data;
        var count = (bundle.entry && bundle.entry.length) || 0;
        console.log(`---Page #${page}---`);
        console.log(JSON.stringify(bundle.entry, null, 1));
        console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
    }).catch (function(err) {
        if (err.status) {
            console.log(err);
            console.log('Error', err.status);
        }
        if (err.data && err.data) {
            console.log('Error', err.data);
        }
    });
};

//_sort
const sortSearch = function(page = 1, limit = 5) {
    client.search({
        type: 'Patient',
        query: {
            _sort: 'status' //sort output (rules from higher to lower priority)
        }
    }).then(function(res) {
        const bundle = res.data;
        var count = (bundle.entry && bundle.entry.length) || 0;
        console.log(`---Page #${page}---`);
        console.log(JSON.stringify(bundle.entry, null, 1));
        console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
    }).catch (function(err) {
        if (err.status) {
            console.log(err);
            console.log('Error', err.status);
        }
        if (err.data && err.data) {
            console.log('Error', err.data);
        }
    });
};

//_summary
const summarySearch = function(page = 1, limit = 5) {
    client.search({
        type: 'Patient',
        query: {
            _summary: 'true' //customized output (true, text, data, count, false)
        }
    }).then(function(res) {
        const bundle = res.data;
        var count = (bundle.entry && bundle.entry.length) || 0;
        console.log(`---Page #${page}---`);
        console.log(JSON.stringify(bundle.entry, null, 1));
        console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
    }).catch (function(err) {
        if (err.status) {
            console.log(err);
            console.log('Error', err.status);
        }
        if (err.data && err.data) {
            console.log('Error', err.data);
        }
    });
};

//_total
const totalSearch = function(page = 1, limit = 5) {
    client.search({
        type: 'Patient',
        query: {
            _total: 'none' //total var preference (none, estimate, accurate)
        }
    }).then(function(res) {
        const bundle = res.data;
        var count = (bundle.entry && bundle.entry.length) || 0;
        console.log(`---Page #${page}---`);
        console.log(JSON.stringify(bundle.entry, null, 1));
        console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
    }).catch (function(err) {
        if (err.status) {
            console.log(err);
            console.log('Error', err.status);
        }
        if (err.data && err.data) {
            console.log('Error', err.data);
        }
    });
};

//_elements
const elementsSearch = function(page = 1, limit = 5) {
    client.search({
        type: 'Patient',
        query: {
            _elements: 'identifier' //return only given base elements
        }
    }).then(function(res) {
        const bundle = res.data;
        var count = (bundle.entry && bundle.entry.length) || 0;
        console.log(`---Page #${page}---`);
        console.log(JSON.stringify(bundle.entry, null, 1));
        console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
    }).catch (function(err) {
        if (err.status) {
            console.log(err);
            console.log('Error', err.status);
        }
        if (err.data && err.data) {
            console.log('Error', err.data);
        }
    });
};

//_contained
const containedSearch = function(page = 1, limit = 5) {
    client.search({
        type: 'Patient',
        query: {
            _contained: 'false' //contained resource output mode (false, true, both)
        }
    }).then(function(res) {
        const bundle = res.data;
        var count = (bundle.entry && bundle.entry.length) || 0;
        console.log(`---Page #${page}---`);
        console.log(JSON.stringify(bundle.entry, null, 1));
        console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
    }).catch (function(err) {
        if (err.status) {
            console.log(err);
            console.log('Error', err.status);
        }
        if (err.data && err.data) {
            console.log('Error', err.data);
        }
    });
};

//_containedType
const containedTypeSearch = function(page = 1, limit = 5) {
    client.search({
        type: 'Patient',
        query: {
            _containedType: 'container' //return container or contained resource (container, contained)
        }
    }).then(function(res) {
        const bundle = res.data;
        var count = (bundle.entry && bundle.entry.length) || 0;
        console.log(`---Page #${page}---`);
        console.log(JSON.stringify(bundle.entry, null, 1));
        console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
    }).catch(function(err) {
        if (err.status) {
            console.log(err);
            console.log('Error', err.status);
        }
        if (err.data && err.data) {
            console.log('Error', err.data);
        }
    });
};
