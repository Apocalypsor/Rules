// URL = ^https?:\/\/baoear4\.baoear\.com\/version2\/customer\/profile

body = $response.body;
let obj = JSON.parse(body);
obj["hifi_vip_remaindays"] = 999;
obj["vip_remaindays"] = 999;
obj["is_exprience"] = 1;
body = JSON.stringify(obj); 
$done({body});