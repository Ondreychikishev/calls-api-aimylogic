'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var request = require('sync-request');
const http = require('http');
const app = express();


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('<p>calls-api-webhook</a>');
});

app.post('/', (req, res) => {
    try {
        if (req.body.event == "ONCRMDEALUPDATE") {
            var dealId = req.body.data.FIELDS.ID;

            var deal = request('GET', '<URL bitrix webhook>/crm.deal.get?id=' + dealId);
            var deal = JSON.parse(deal.getBody('utf8'));
            console.log(deal);


            if (deal.result.STAGE_ID == '<Your stageId>'){
                let userId = deal.result.CONTACT_ID;

                var contact = request('GET', '<URL bitrix webhook>/crm.contact.get?id=' + userId);
                var contact = JSON.parse(contact.getBody('utf8'));

                /*example fields*/
                let name = contact.result.NAME;
                let phone = contact.result.PHONE ? contact.result.PHONE[0].VALUE : null;
                let datetime = deal.result.UF_CRM_5E3C3F51578BA;
                console.log("Call: ", name, phone, datetime);
                call(name, phone, dealId);
            }
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal Server Error"});
    }
});

function call(name, phone, dealId) {
    var call = request('POST', 'https://app.aimylogic.com/api/calls/campaign/<token Calls API Aimylogic>/addPhones', {
        json: 
            [
                {
                "phone": phone,
                "payload": {
                    "name": name,
                    "dealId": dealId
                }
                }
            ]
    });
    var callResult = JSON.parse(call.getBody('utf8'));
    console.log(callResult);
}

app.listen(process.env.PORT || 3000, () => {
    console.log('Ready');
});
