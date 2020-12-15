// URL = ^https?:\/\/biz\.caiyunapp\.com\/v2/user\?app_name=weather

body = $response.body;
let obj = JSON.parse(body);
obj["result"]["vip_type"] = "s";
obj["result"]["xy_svip_expire"] = 0;
obj["result"]["svip_expired_at"] = 32489806659.230700016;
obj["result"]["wt"]["vip"]["enabled"] = true;
obj["result"]["wt"]["vip"]["svip_expired_at"] = 32489806659.230700016;
obj["result"]["is_vip"] = true;
body = JSON.stringify(obj); 
$done({body});