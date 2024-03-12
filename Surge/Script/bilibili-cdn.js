// https?:\/\/www\.bilibili\.com\/video\/.+

// url from https://github.com/ipcjs/bilibili-helper/blob/user.js/packages/unblock-area-limit/src/util/converters.ts
const selectedCDN = 'upos-sz-upcdnbda2.bilivideo.com';

const replaceURL = (url) => {
  const pattern = /upos-([\w-]+?).bilivideo.com|upos-hz-mirrorakam.akamaized.net/g;
  return url.replace(pattern, selectedCDN);
};

let body = $response.body;
body = replaceURL(body);
$done({ body })
