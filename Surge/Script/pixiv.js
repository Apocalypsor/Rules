// URL = ^https?:\/\/oauth\.secure\.pixiv\.net\/auth\/token

body = $response.body;
let obj = JSON.parse(body);
obj["user"]["is_premium"] = true;
obj["response"]["user"]["is_premium"] = true;
body = JSON.stringify(obj); 
$done({body});