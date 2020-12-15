// URL =  ^https?:\/\/app-subscription-proxy\.accuweather\.com\/subscriptions\/v1\/apple\/validate

body = $response.body;
let obj = JSON.parse(body);

obj = {
    "expirationDate": "2999-10-06T05:41:51+00:00",
    "isTrial": true,
    "status": 0,
    "expiryDateEpoch": 1601358111000,
    "isIntro": false,
    "usedTrial": [
        "com.accuweather.annual.subscription"
    ],
    "usedIntro": null,
    "isValid": true
}

body = JSON.stringify(obj); 
$done({body});