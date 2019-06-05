(function() {
    var utils = require("../utils");
    const ResourceValidation = require('json-schema-resource-validation');

    const resourceValidation = new ResourceValidation();

    exports.Http = function(cfg, adapter){
        return function(args){
            if(args.debug){
                console.log("\nDEBUG (request):", args.method, args.url, args);
            }
            var promise = (args.http || adapter.http  || cfg.http)(args);
            if (args.debug && promise && promise.then){
                promise.then(function(x){ console.log("\nDEBUG: (responce)", x);});
            }
            //console.log(promise);
            //console.log(args);
            return promise;
        };
    };

    var toJson = function(x){
        //console.log(JSON.stringify(x)); //input resource
        //console.log(x.data);
        console.log(resourceValidation.validateResource(x));
        return (utils.type(x) == 'object' || utils.type(x) == 'array') ? JSON.stringify(x) : x;
    };

    exports.$JsonData = function(h){
        return function(args){
            var data = args.bundle || args.data || args.resource;
            if(data){
                args.data = toJson(data);
            }
            return h(args);
        };
    };

}).call(this);
