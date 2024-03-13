// ==UserScript==
// @name         BiliBili CDN Optimizer
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Optimize BiliBili CDN
// @author       Apocalypsor
// @match        https://*.bilibili.com/*
// @icon         https://www.bilibili.com/favicon.ico
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    // 预定义CDN列表
    const cdnOptions = [
        'upos-sz-mirrorali.bilivideo.com(推荐)',
        'upos-sz-mirroralib.bilivideo.com(推荐)',
        'upos-sz-mirrorhw.bilivideo.com(推荐)',
        'upos-sz-mirrorhwb.bilivideo.com(推荐)',
        'upos-sz-upcdnbda2.bilivideo.com(推荐)',
        'upos-sz-mirrorcos.bilivideo.com',
        'upos-sz-mirrorcosb.bilivideo.com',
        'upos-sz-mirrorbos.bilivideo.com',
        'upos-sz-upcdnws.bilivideo.com',
        'upos-sz-mirroraliov.bilivideo.com',
        'upos-hz-mirrorakam.akamaized.net'
    ];

    // 为每个CDN注册一个菜单命令
    cdnOptions.forEach(cdn => {
        GM_registerMenuCommand(`切换CDN为${cdn}`, () => {
            GM_setValue('selectedCDN', cdn.split("(")[0]);
            alert(`CDN切换为${cdn}(不会在视频信息中显示)，请刷新界面`);
            location.reload();
        });
    });

    if (location.href.startsWith('https://www.bilibili.com/video/') || location.href.startsWith('https://www.bilibili.com/bangumi/play/')) {
        // 获取用户选择的CDN，如果没有则使用第一个
        const cdnDomain = GM_getValue('selectedCDN', cdnOptions[0]);

        (function(open) {
            unsafeWindow.XMLHttpRequest.prototype.open = function() {
                try {
                    const urlObj = new URL(arguments[1]);
                    if (urlObj.hostname.endsWith('.mcdn.bilivideo.cn') || urlObj.hostname.endsWith(".bilivideo.com") || urlObj.hostname === "upos-hz-mirrorakam.akamaized.net") {
                        urlObj.host = cdnDomain;
                        urlObj.port = 443;
                        console.warn(`更换源: ${urlObj.host}`);
                        arguments[1] = urlObj.toString();
                    }
                } finally {
                    return open.apply(this, arguments);
                }
            };
        })(unsafeWindow.XMLHttpRequest.prototype.open);
    }
})();
