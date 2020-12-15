// URL =  ^https?:\/\/api\.revenuecat\.com\/v1\/subscribers\/\$RCAnonymousID%\w+$

body = $response.body;
let obj = JSON.parse(body);

obj["subscriber"]["subscriptions"] = {
    "com.offcoast.weatherline.iap.yearly": {
        "is_sandbox": false,
        "period_type": "trial",
        "billing_issues_detected_at": null,
        "unsubscribe_detected_at": null,
        "expires_date": "2999-10-12T09:07:38Z",
        "original_purchase_date": "2020-10-05T09:07:39Z",
        "purchase_date": "2020-10-05T09:07:38Z",
        "store": "app_store"
    }
};

obj["subscriber"]["entitlements"] = {
    "com.offcoast.weatherline.revenuecat.supercharge": {
        "expires_date": "2999-10-12T09:07:38Z",
        "product_identifier": "com.offcoast.weatherline.iap.yearly",
        "purchase_date": "2020-10-05T09:07:38Z"
      }
};
    
body = JSON.stringify(obj); 
$done({body});