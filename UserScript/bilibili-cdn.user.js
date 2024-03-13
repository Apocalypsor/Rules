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
    const cdnOptions = {
        'ali(推荐)': 'upos-sz-mirrorali.bilivideo.com',
        'alib(推荐)': 'upos-sz-mirroralib.bilivideo.com',
        'hw(推荐)': 'upos-sz-mirrorhw.bilivideo.com',
        'hwb(推荐)': 'upos-sz-mirrorhwb.bilivideo.com',
        'bda2(推荐)': 'upos-sz-upcdnbda2.bilivideo.com',
        'cos': 'upos-sz-mirrorcos.bilivideo.com',
        'cosb': 'upos-sz-mirrorcosb.bilivideo.com',
        'bos': 'upos-sz-mirrorbos.bilivideo.com',
        'ws': 'upos-sz-upcdnws.bilivideo.com',
        'aliov': 'upos-sz-mirroraliov.bilivideo.com',
        'akamai': 'upos-hz-mirrorakam.akamaized.net',
    };

    // 为每个CDN注册一个菜单命令
    Object.keys(cdnOptions).forEach(cdn => {
        GM_registerMenuCommand(`切换CDN为${cdn}`, () => {
            GM_setValue('selectedCDN', cdnOptions[cdn]);
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
