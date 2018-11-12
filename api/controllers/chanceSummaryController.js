'use strict';

// https://github.com/salesforce-marketingcloud/FuelSDK-Node-SOAP
// http://salesforce-marketingcloud.github.io/FuelSDK-Node-SOAP/
// https://gist.github.com/vernak2539/8babcdd13b80d632dd12#file-1_setup-js
// https://github.com/salesforce-marketingcloud/FuelSDK-Node-REST

// soap client
var FuelSoap = require('fuel-soap');
var options = {
    auth: {
        clientId: '2wtur1mro5yy7x5rw3pcyh5e',
        clientSecret: 'pDc1K6OCHApUOPurPO1XfqB5'
    }
    , soapEndpoint: 'https://webservice.s10.exacttarget.com/Service.asmx' // default --> https://webservice.exacttarget.com/Service.asmx
};

var SoapClient = new FuelSoap(options);

// rest client
const FuelRest = require('fuel-rest');
const options1 = {
    auth: {
        // options you want passed when Fuel Auth is initialized
        clientId: '2wtur1mro5yy7x5rw3pcyh5e',
        clientSecret: 'pDc1K6OCHApUOPurPO1XfqB5'
    },
    origin: 'https://alternate.rest.endpoint.com' // default --> https://www.exacttargetapis.com
};

const RestClient = new FuelRest(options1);

// business logic
exports.retrieveMultiple = function (req, res) {

    console.log('retrieveMultiple --------');

    var options2 = {
        filter: {
            leftOperand: 'Name',
            operator: 'equals',
            rightOperand: 'Test Email'
        }
    };

    SoapClient.retrieve(
        'DataExtensionObject[FBBBBBDB-6AC6-4B4B-8234-7B04882E8BFB]',
        ["chanceId", "chanceName", "ddate", "amount"],
        {}, //options2,
        function (err, response) {
            if (err) {
                // error here
                console.log(err);

                res.json({});
            }
            // response.body === parsed soap response (JSON)
            // response.res === full response from request client
            else if (response.body.Results) {
                var resultDEOs = [];
                console.log('---start parsing result---');
                for (var i = 0; i < response.body.Results.length; i++) {
                    var deObject = response.body.Results[i];
                    //console.log(deObject.Properties.Property);
                    var resultDEO = {};
                    for (var j = 0; j < deObject.Properties.Property.length; j++) {
                        var deProperty = deObject.Properties.Property[j];
                        if (deProperty.Name == 'chanceId') {
                            resultDEO.chanceId = deProperty.Value;
                        }
                        if (deProperty.Name == 'chanceName') {
                            resultDEO.chanceName = deProperty.Value;
                        }
                        if (deProperty.Name == 'ddate') {
                            resultDEO.date = deProperty.Value;
                        }
                        if (deProperty.Name == 'amount') {
                            resultDEO.amount = deProperty.Value;
                        }
                        //console.log(deProperty);
                    }
                    resultDEOs.push(resultDEO);
                }
                console.log('---finish parsing result---');
                res.json(resultDEOs);
            }
            else {
                res.json({});
            }
        }
    );

};