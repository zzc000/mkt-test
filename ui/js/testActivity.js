define([
    'postmonger'
], function (
    Postmonger
) {
        'use strict';

        var connection = new Postmonger.Session();
        var payload = {};

        $(function () {
            // JB will respond the first time 'ready' is called with 'initActivity'
            connection.trigger('ready');
        });

        connection.on('initActivity', function (data) {
            if (data) {
                payload = data;

                console.log('initActivity ---');
                console.log(data);
                console.log();

                connection.trigger('requestTriggerEventDefinition');
            }
        });

        connection.on('requestedTriggerEventDefinition', function (eventDefinitionModel) {

            console.log('requestedTriggerEventDefinition ---');
            console.log(eventDefinitionModel);
            console.log();

            var dataExtensionId = eventDefinitionModel.dataExtensionId;
            var eventDefinitionKey = eventDefinitionModel.eventDefinitionKey;

            // 'payload' is initialized on 'initActivity' above.
            // Journey Builder sends an initial payload with defaults
            // set by this activity's config.json file.  Any property
            // may be overridden as desired.

            payload['arguments'].execute.inArguments = [
                {
                    "dataExtensionId": dataExtensionId,
                    "eventDefinitionKey": eventDefinitionKey,
                    "mobile": "{{Event." + eventDefinitionKey + ".\"电话号码\"}}"
                }
            ];

            payload['metaData'].isConfigured = true;

            connection.trigger('updateActivity', payload);
        });

    });