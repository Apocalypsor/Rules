// URL = ^https?:\/\/subs\.platforms\.team\/apple\/verifyTransaction

body = $response.body;
let obj = JSON.parse(body);
obj["data"]["in_app"] = {
    "com.apalonapps.radarfree.07d_07dt_TRL00002": {
        "is_valid": true,
        "purchase_date_ms": "1601871464000",
        "transaction_id": "330000705227028",
        "expired": false,
        "cancelled": false,
        "is_intro": false,
        "may_expire": true,
        "was_trial": true,
        "subscription_group_identifier": "20481342",
        "remaining_time_ms": "800604786000",
        "was_intro": false,
        "is_trial": true,
        "expires_date_ms": "9602476264000"
    }
};
body = JSON.stringify(obj); 
$done({body});