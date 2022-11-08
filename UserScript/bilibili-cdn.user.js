// ==UserScript==
// @name         BiliBili CDN Optimizer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Optimize BiliBili CDN
// @author       Apocalypsor
// @match        https://*.bilibili.com/*
// @icon         https://www.bilibili.com/favicon.ico
// @run-at       document-start
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';

    // 去 P2P CDN
    if (location.href.startsWith('https://www.bilibili.com/video/') || location.href.startsWith('https://www.bilibili.com/bangumi/play/')) {
        let cdnDomain;

        [ cdnDomain ] = document.head.innerHTML.match(/up[\w-]+\.akamaized\.net/);
        if (!cdnDomain) {
            [ cdnDomain ] = document.head.innerHTML.match(/up[\w-]+\.bilivideo\.com/);
        }

        (function(open) {
            unsafeWindow.XMLHttpRequest.prototype.open = function() {
                try {
                    const urlObj = new URL(arguments[1]);
                    if (urlObj.hostname.endsWith(".mcdn.bilivideo.cn")) {
                        urlObj.host = cdnDomain || 'upos-hz-mirrorakam.akamaized.net'
                        urlObj.port = 443
                        console.warn(`更换视频源: ${urlObj.host}`);
                        arguments[1] = urlObj.toString()
                    } else if (urlObj.hostname.endsWith(".szbdyd.com")) {
                        urlObj.host = urlObj.searchParams.get('xy_usource');
                        urlObj.port = 443;
                        console.warn(`更换视频源: ${urlObj.host}`);
                        arguments[1] = urlObj.toString();
                    }
                } finally {
                    return open.apply(this, arguments)
                }
            };
        })(unsafeWindow.XMLHttpRequest.prototype.open);
    }
})();
