var client = Fhir({
    baseUrl: process.env.SERVER_URL || 'http://localhost:8888',
    debug: process.env.DEBUG || false,
    auth: {user: 'zorkijofficial@gmail.com', pass: 'secret'}
});

//async function doSearch(page = 1, limit = 5) {

//SEARCH PARAMS

//*** implemented ***

//_include
try {
    const res = await client.search({
        type: 'MedicationRequest', //get all this
        query: {
            $include: { //where
                MedicationRequest: "patient"  //refers: gets referred (is included)
            }
        }
    });
    const bundle = res.data;
    var count = (bundle.entry && bundle.entry.length) || 0;
    console.log(`---Page #${page}---`);
    console.log(JSON.stringify(bundle.entry, null, 1));
    console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
}
catch (err) {
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

//_revinclude
try {
    const res = await client.search({
        type: 'MedicationRequest', //get all this
        query: {
            $revInclude: { //where
                Provenance: "target" //refers (is included): gets referred
            }
        }
    });
    const bundle = res.data;
    var count = (bundle.entry && bundle.entry.length) || 0;
    console.log(`---Page #${page}---`);
    console.log(JSON.stringify(bundle.entry, null, 1));
    console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
}
catch (err) {
    if (err.status) {
        console.log(err);
        console.log('Error', err.status);
    }
    if (err.data && err.data) {
        console.log('Error', err.data);
    }
}

//_has
try {
    const res = await client.search({
        type: 'Patient', //get all this
        query: {
            $has: { //where
                "Observation:patient:id": '8f364045-873d-40a4-a77d-37fbc1edef3e' //refers (is included): gets referred: and has this
            }
        }
    });
    const bundle = res.data;
    var count = (bundle.entry && bundle.entry.length) || 0;
    console.log(`---Page #${page}---`);
    console.log(JSON.stringify(bundle.entry, null, 1));
    console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
}
catch (err) {
    if (err.status) {
        console.log(err);
        console.log('Error', err.status);
    }
    if (err.data && err.data) {
        console.log('Error', err.data);
    }
}



//*** not implemented ***

//_id
try {
    const res = await client.search({
        type: 'Patient',
        query: {
            $id: '636ea8a0-3f5b-4fea-a8fe-e977eb07627f' //get resource by id (always unique)
        }
    });
    const bundle = res.data;
    var count = (bundle.entry && bundle.entry.length) || 0;
    console.log(`---Page #${page}---`);
    console.log(JSON.stringify(bundle.entry, null, 1));
    console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
}
catch (err) {
    if (err.status) {
        console.log(err);
        console.log('Error', err.status);
    }
    if (err.data && err.data) {
        console.log('Error', err.data);
    }
}

//_lastUpdated
try {
    const res = await client.search({
        type: 'Patient',
        query: {
            $lastUpdated: 'gt2010-10-01' //get all modified since
        }
    });
    const bundle = res.data;
    var count = (bundle.entry && bundle.entry.length) || 0;
    console.log(`---Page #${page}---`);
    console.log(JSON.stringify(bundle.entry, null, 1));
    console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
}
catch (err) {
    if (err.status) {
        console.log(err);
        console.log('Error', err.status);
    }
    if (err.data && err.data) {
        console.log('Error', err.data);
    }
}

//_tag
try {
    const res = await client.search({
        type: 'Condition',
        query: {
            $tag: 'http://acme.org/codes|needs-review' //get all with tag values {"system":http://acme.org/codes, "code" : "needs-review"}
        }
    });
    const bundle = res.data;
    var count = (bundle.entry && bundle.entry.length) || 0;
    console.log(`---Page #${page}---`);
    console.log(JSON.stringify(bundle.entry, null, 1));
    console.log(`# Query limit: ${limit} Total: ${bundle.total}`);

}
catch (err) {
    if (err.status) {
        console.log(err);
        console.log('Error', err.status);
    }
    if (err.data && err.data) {
        console.log('Error', err.data);
    }
}

//_profile
try {
    const res = await client.search({
        type: 'DiagnosticReport',
        query: {
            $profile: 'http://hl7.org/fhir/StructureDefinition/lipid' //get all that is tagged as conforming to profile
        }
    });
    const bundle = res.data;
    var count = (bundle.entry && bundle.entry.length) || 0;
    console.log(`---Page #${page}---`);
    console.log(JSON.stringify(bundle.entry, null, 1));
    console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
}
catch (err) {
    if (err.status) {
        console.log(err);
        console.log('Error', err.status);
    }
    if (err.data && err.data) {
        console.log('Error', err.data);
    }
}

//_security
try {
    const res = await client.search({
        type: 'SomeResource',
        query: {
            $security: 'something' //get all with given security label (token)
        }
    });
    const bundle = res.data;
    var count = (bundle.entry && bundle.entry.length) || 0;
    console.log(`---Page #${page}---`);
    console.log(JSON.stringify(bundle.entry, null, 1));
    console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
}
catch (err) {
    if (err.status) {
        console.log(err);
        console.log('Error', err.status);
    }
    if (err.data && err.data) {
        console.log('Error', err.data);
    }
}

//_text
try {
    const res = await client.search({
        type: 'Condition',
        query: {
            $text: 'bone' //search text field for keywords
        }
    });
    const bundle = res.data;
    var count = (bundle.entry && bundle.entry.length) || 0;
    console.log(`---Page #${page}---`);
    console.log(JSON.stringify(bundle.entry, null, 1));
    console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
}
catch (err) {
    if (err.status) {
        console.log(err);
        console.log('Error', err.status);
    }
    if (err.data && err.data) {
        console.log('Error', err.data);
    }
}

//_content
try {
    const res = await client.search({
        type: 'Patient',
        query: {
            $text: 'White' //search entire resource for keywords
        }
    });
    const bundle = res.data;
    var count = (bundle.entry && bundle.entry.length) || 0;
    console.log(`---Page #${page}---`);
    console.log(JSON.stringify(bundle.entry, null, 1));
    console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
}
catch (err) {
    if (err.status) {
        console.log(err);
        console.log('Error', err.status);
    }
    if (err.data && err.data) {
        console.log('Error', err.data);
    }
}

//_list
try {
    const res = await client.search({
        type: 'Patient',
        query: {
            $list: '42' //retrieve resources from List
        }
    });
    const bundle = res.data;
    var count = (bundle.entry && bundle.entry.length) || 0;
    console.log(`---Page #${page}---`);
    console.log(JSON.stringify(bundle.entry, null, 1));
    console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
}
catch (err) {
    if (err.status) {
        console.log(err);
        console.log('Error', err.status);
    }
    if (err.data && err.data) {
        console.log('Error', err.data);
    }
}

//_type
try {
    const res = await client.search({
        query: {
            //other params
            $type: 'patient' //get non-fixed type resources
        }
    });
    const bundle = res.data;
    var count = (bundle.entry && bundle.entry.length) || 0;
    console.log(`---Page #${page}---`);
    console.log(JSON.stringify(bundle.entry, null, 1));
    console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
}
catch (err) {
    if (err.status) {
        console.log(err);
        console.log('Error', err.status);
    }
    if (err.data && err.data) {
        console.log('Error', err.data);
    }
}

//_sort
try {
    const res = await client.search({
        type: 'Patient',
        query: {
            $sort: 'status' //sort output (rules from higher to lower priority)
        }
    });
    const bundle = res.data;
    var count = (bundle.entry && bundle.entry.length) || 0;
    console.log(`---Page #${page}---`);
    console.log(JSON.stringify(bundle.entry, null, 1));
    console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
}
catch (err) {
    if (err.status) {
        console.log(err);
        console.log('Error', err.status);
    }
    if (err.data && err.data) {
        console.log('Error', err.data);
    }
}

//_summary
try {
    const res = await client.search({
        type: 'Patient',
        query: {
            $summary: 'true' //customized output (true, text, data, count, false)
        }
    });
    const bundle = res.data;
    var count = (bundle.entry && bundle.entry.length) || 0;
    console.log(`---Page #${page}---`);
    console.log(JSON.stringify(bundle.entry, null, 1));
    console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
}
catch (err) {
    if (err.status) {
        console.log(err);
        console.log('Error', err.status);
    }
    if (err.data && err.data) {
        console.log('Error', err.data);
    }
}

//_total
try {
    const res = await client.search({
        type: 'Patient',
        query: {
            $total: 'none' //total var preference (none, estimate, accurate)
        }
    });
    const bundle = res.data;
    var count = (bundle.entry && bundle.entry.length) || 0;
    console.log(`---Page #${page}---`);
    console.log(JSON.stringify(bundle.entry, null, 1));
    console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
}
catch (err) {
    if (err.status) {
        console.log(err);
        console.log('Error', err.status);
    }
    if (err.data && err.data) {
        console.log('Error', err.data);
    }
}

//_elements
try {
    const res = await client.search({
        type: 'Patient',
        query: {
            $elements: 'identifier' //return only given base elements
        }
    });
    const bundle = res.data;
    var count = (bundle.entry && bundle.entry.length) || 0;
    console.log(`---Page #${page}---`);
    console.log(JSON.stringify(bundle.entry, null, 1));
    console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
}
catch (err) {
    if (err.status) {
        console.log(err);
        console.log('Error', err.status);
    }
    if (err.data && err.data) {
        console.log('Error', err.data);
    }
}

//_contained
try {
    const res = await client.search({
        type: 'Patient',
        query: {
            $contained: 'false' //contained resource output mode (false, true, both)
        }
    });
    const bundle = res.data;
    var count = (bundle.entry && bundle.entry.length) || 0;
    console.log(`---Page #${page}---`);
    console.log(JSON.stringify(bundle.entry, null, 1));
    console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
}
catch (err) {
    if (err.status) {
        console.log(err);
        console.log('Error', err.status);
    }
    if (err.data && err.data) {
        console.log('Error', err.data);
    }
}

//_containedType
try {
    const res = await client.search({
        type: 'Patient',
        query: {
            $containedType: 'container' //return container or contained resource (container, contained)
        }
    });
    const bundle = res.data;
    var count = (bundle.entry && bundle.entry.length) || 0;
    console.log(`---Page #${page}---`);
    console.log(JSON.stringify(bundle.entry, null, 1));
    console.log(`# Query limit: ${limit} Total: ${bundle.total}`);
}
catch (err) {
    if (err.status) {
        console.log(err);
        console.log('Error', err.status);
    }
    if (err.data && err.data) {
        console.log('Error', err.data);
    }
}
