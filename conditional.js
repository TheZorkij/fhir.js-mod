var client = Fhir({
    baseUrl: process.env.SERVER_URL || 'http://localhost:8888',
    debug: process.env.DEBUG || false,
    auth: {user: 'zorkijofficial@gmail.com', pass: 'secret'}
});


//CONDITIONAL OPERATIONS

//conditionalUpdate
const conUpdate = function() {
    client.update({
        resource: {
            //...
        },
        query: {
            //...
        }
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

//conditionalDelete
const conDelete = function() {
    client.delete({
        resource: {
            //...
        },
        query: {
            //...
        }
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

//conditionalCreate
const conCreate = function() {
    client.create({
        resource: {
            //...
        },
        headers: {
            'If-None-Exist': '...'
        }
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

//conditionalRead
const conRead = function() {
    const res = client.read({
        resource: {
            //...
        },
        headers: {
            'If-None-Match': '...',
            'If-Modified-Since': '...'
        }
    }).then(function(res) {
        const bundle = res.data;
        console.log(JSON.stringify(bundle.entry, null, 1));
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

//conditionalPatch - not supported by Aidbox
const conPatch = function() {
    client.patch( {
        resource: {
            //...
        },
        query: {
            //...
        }
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
