/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const url = require('url');
const https = require('https');

function postMessage(message, callback) {
    'use strict';
    const body = JSON.stringify(message);
    const webHookUrl = process.env.notification_api_token;
    const options = url.parse(webHookUrl);
    options.method = 'POST';
    options.headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
    };

    const postReq = https.request(options, (res) => {
        const chunks = [];
        res.setEncoding('utf8');
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
            if (callback) {
                callback({
                    body: chunks.join(''),
                    statusCode: res.statusCode,
                    statusMessage: res.statusMessage,
                });
            }
        });
        return res;
    });

    postReq.write(body);
    postReq.end();
}

function processEvent(event, callback) {
    'use strict';    
    const message = JSON.parse(event);
    const category = message.finding.category;    
    const findingClass = message.finding.findingClass;    
    const state = message.finding.state;
    const severity = message.finding.severity;    
    const description = message.finding.description;
    const createTime = message.finding.createTime;
    const createTimeObj = new Date(createTime);
    const origin = createTimeObj.toUTCString();    
    const eventTime = message.finding.eventTime;
    const eventTimeObj = new Date(eventTime);
    const when = eventTimeObj.toUTCString();
      
    const googleMessage = {
        cards: [{
            "header": {
                "title": `Google Cloud SCC Alert!`,
                "imageUrl": "https://avatars.githubusercontent.com/u/2810941?s=200&v=4"
            },
            "sections": [{
                "widgets": [{
                        "keyValue": {
                            "topLabel": "Severity",
                            "content": `${severity}`
                        }
                    },
                    {
                        "keyValue": {
                            "topLabel": "Alert Name",
                            "content": `${category}`,
                            "contentMultiline": true
                        }
                    },
                    {
                        "keyValue": {
                            "topLabel": "Finding Class",
                            "content": `${findingClass}`,
                            "contentMultiline": true
                        }
                    },
                    {
                        "keyValue": {
                            "topLabel": "State",
                            "content": `${state}`,
                            "contentMultiline": true
                        }
                    },
                    {
                        "keyValue": {
                            "topLabel": "Event Time",
                            "content": `${when}`,
                            "contentMultiline": true
                        }
                    },
                    {
                        "keyValue": {
                            "topLabel": "Create Time",
                            "content": `${origin}`,
                            "contentMultiline": true
                        }
                    },                    
                    {
                        "keyValue": {
                            "topLabel": "Description",
                            "content": `${description}`,
                            "contentMultiline": true
                        }
                    },
                    {
                        "keyValue": {
                            "topLabel": "Link to SCC",
                            "content": 'https://console.cloud.google.com/security/command-center/overview?organizationId=',
                            "contentMultiline": true,
                            "onClick": {
                                "openLink": {
                                    "url": 'https://console.cloud.google.com/security/command-center/overview?organizationId='
                                }                            
                            }
                        }
                    }
                ]
            }]
        }]
    };

    postMessage(googleMessage, (response) => {
        if (response.statusCode < 400) {
            console.info('Message posted successfully');
            callback(null);
        } else if (response.statusCode < 500) {
            console.error(`Error posting message to Google API: ${response.statusCode} - ${response.statusMessage}`);
            callback(null);
        } else {
            callback(`Server error when processing message: ${response.statusCode} - ${response.statusMessage}`);
        }
    });
}
exports.SCCPubSub = (pubsubMessage, _context, callback) => {
    'use strict';
    const event = Buffer.from(pubsubMessage.data, 'base64').toString();
    processEvent(event, callback);
};
