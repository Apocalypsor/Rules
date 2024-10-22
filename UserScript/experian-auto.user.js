// ==UserScript==
// @name         Experian AutoClicker
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Automatically clicks on the "No, Keep My Current Membership" button on Experian/Equifax.
// @author       dov
// @downloadURL  https://raw.githubusercontent.com/Apocalypsor/Rules/master/UserScript/experian-auto.user.js
// @updateURL    https://raw.githubusercontent.com/Apocalypsor/Rules/master/UserScript/experian-auto.user.js
// @match        https://usa.experian.com/mfe/member/preload
// @match        https://usa.experian.com/mfe/member/loginInterstitial
// @match        https://www.equifax.com/myequifax/loginsplashl/ecc
// @grant        none
// ==/UserScript==

function clickExperianButton() {
    const button = document.querySelector('button[data-ecs-tms="interstitial-login-decline"]');
    if (button) {
        button.click();
    } else {
        setTimeout(clickExperianButton, 500);
    }
}

function clickEquifaxButton() {
    const button = document.querySelector('#no');
    if (button) {
        button.click();
    } else {
        setTimeout(clickEquifaxButton, 500);
    }
}

(function() {
    'use strict';
    const currentUrl = window.location.href;
    console.log(currentUrl);

    function autoclick() {
        if (currentUrl === "https://usa.experian.com/mfe/member/loginInterstitial" || currentUrl === "https://usa.experian.com/mfe/member/preload") {
            clickExperianButton();
        } else if (currentUrl === "https://www.equifax.com/myequifax/loginsplashl/ecc") {
            clickEquifaxButton();
        }
    }

    autoclick();
})();
