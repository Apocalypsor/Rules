// URL = ^https?:\/\/everest\.castbox\.fm\/auth\/user\/properties\?country=\w+&raw=1

body = $response.body;
let obj = JSON.parse(body);
obj["data"] = {
    "memberships": [
        {
            "product_id": "castbox.premium.pro.p1y",
            "expiry_date_ms": 999991598202753000,
            "source": "paid",
            "name": "castbox.premium.pro"
        }
    ]
};
body = JSON.stringify(obj); 
$done({body});