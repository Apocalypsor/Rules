// ==UserScript==
// @name         BiliBili CDN Optimizer
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Optimize BiliBili CDN
// @author       Apocalypsor
// @match        https://*.bilibili.com/*
// @icon         https://www.bilibili.com/favicon.ico
// @run-at       document-start
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';

    if (location.href.startsWith('https://www.bilibili.com/video/') || location.href.startsWith('https://www.bilibili.com/bangumi/play/')) {
        const cdnDomain = 'upos-sz-upcdnbda2.bilivideo.com';

        (function(open) {
            unsafeWindow.XMLHttpRequest.prototype.open = function() {
                try {
                    const urlObj = new URL(arguments[1]);
                    if (urlObj.hostname.endsWith('.mcdn.bilivideo.cn') || urlObj.hostname.endsWith(".bilivideo.com") || urlObj.hostname === "upos-hz-mirrorakam.akamaized.net") {
                        urlObj.host = cdnDomain;
                        urlObj.port = 443;
                        console.warn(`更换源: ${urlObj.host}`);
                        arguments[1] = urlObj.toString()
                    }
                } finally {
                    return open.apply(this, arguments);
                }
            };
        })(unsafeWindow.XMLHttpRequest.prototype.open);
    }
})();
