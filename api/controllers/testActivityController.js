/*
https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd
*/

'use strict';

var baseUrl = 'https://640eec02.ngrok.io/activity/test';
var baseDomain = 'https://640eec02.ngrok.io';

exports.config = function(req, res) {

    console.log('config --------');
    logRequest(req);

    res.json(config);
};

exports.execute = function(req, res) {

    console.log('execute --------');
    logRequest(req);

    res.send();
};

exports.publish = function(req, res) {

    console.log('publish --------');
    logRequest(req);

    res.send();
};

exports.validate = function(req, res) {

    console.log('validate --------');
    logRequest(req);

    res.send();
};

var logRequest = function(req){

    console.log('req.headers: ' + JSON.stringify(req.headers));
    console.log('req.url: ' + req.url);
    console.log('req.method: ' + req.method);
    console.log('req.baseUrl: ' + req.baseUrl);
    console.log('req.originalUrl: ' + req.originalUrl);
    console.log('req.params: ' + JSON.stringify(req.params));
    console.log('req.query: ' + JSON.stringify(req.query));
    console.log('req.body: ' + JSON.stringify(req.body));
    console.log();
};

var config = {
	"workflowApiVersion": "1.1",
	"metaData": {
		"icon": "https://huaweicloud--cbuuat6--c.cs58.visual.force.com/resource/MKT_CustomActivities_Logo",
		"expressionBuilderPrefix": "HW",
		"isConfigured": false, //true,
		"configurationDisabled": false, //true,
		"configOnDrop": true //false
	},
	"type": "REST",
	"lang": {
		"en-US": {
			"name": "T-Local test activity-v1",
			"description": "local test activity, forward by ngrok."
		},
		"zh-CN": {
			"name": "T本地测试活动v1",
			"description": "本地测试活动，通过ngrok转发。"
		}
	},
	"arguments": {
		"execute": {
			"inArguments": [
				{
					"contactKey": "{{Contact.Key}}"
				}
			],
			"outArguments": [],
			"url": baseUrl + "/execute?state=state"
		}
	},
	"configurationArguments": {
		"publish": {
			"url": baseUrl + "/publish",
			"verb": "POST"
		},
		"validate": {
			"url": baseUrl + "/validate",
			"verb": "POST"
		}
	},
	"userInterfaces": {
        "configModal": {
            "url": baseDomain + "/mkt/activities/test/index.html",
            "height": 200,
			"width": 300,
			"fullscreen": true
        },
		"runningModal": {
			"url": "runningModal.html"
		},
		"runningHover": {
			"url": "runningHover.html"
		}
	}
};