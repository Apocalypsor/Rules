const ssid = "Verizon_B7MW9P";
const dns_module = "Home";
const http_api = "localhost:6171";
const http_api_key = "Apocalypse";

let request = {
  url: `http://${http_api}/v1/modules`,
  headers: {"X-Key": http_api_key},
  body: {},
}


getModuleStatus(dns_module).then(main)


function main(enable) {
  let home = ($network.wifi.ssid == ssid);
  if (home && !enable) {
    //家里,未开启模块 => 开启
    $notification.post("开启Home模块","","")
    enableModule(true);
  } else if (!home && enable){
    //不是家里,开启了模块 => 关闭
    $notification.post("关闭Home模块","","")
    enableModule(false);
  } else {
    //重复触发 => 结束
    //$notification.post("重复触发","","")
    $done({});
    }
}

function getModuleStatus(dns_module) {
  return new Promise(resolve => {
    $httpClient.get(request, (error, response, data) => {
      let enabled = JSON.parse(data).enabled;
      resolve(enabled.includes(dns_module));
    });
  });
}

function enableModule(enable) {
  request.body[dns_module] = enable;
  $httpClient.post(request, () => $done());
}
