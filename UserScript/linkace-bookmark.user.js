// ==UserScript==
// @name         LinkAce Bookmark
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Bookmark button for linkace.org
// @icon         https://www.linkace.org/favicon.svg
// @author       Apocalypsor
// @match        *://*/*
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @downloadURL  https://github.com/Apocalypsor/Rules/raw/master/UserScript/linkace-bookmark.user.js
// @updateURL    https://github.com/Apocalypsor/Rules/raw/master/UserScript/linkace-bookmark.user.js
// ==/UserScript==

'use strict';
const UNIQUE_ID = 'ea721bc5-51f7-4ce3-8d62-78fd4c7eb7a2';

(function() {
    // Function to handle the configuration
    function configureDomain() {
        const newDomain = prompt('Enter the new domain:', GM_getValue('custom_domain', 'demo.linkace.org'));
        if (newDomain !== null) {
            GM_setValue('custom_domain', newDomain);
        }
    }

    // Register the menu command
    GM_registerMenuCommand('Configure Domain', configureDomain);

    // Create button and style it
    const button = document.createElement('button');
    button.id = UNIQUE_ID;
    button.innerHTML = '+';
    button.style.position = 'fixed';
    button.style.bottom = '10px';
    button.style.left = '10px';
    button.style.zIndex = '9999';
    button.style.borderRadius = '25px';
    button.style.width = '30px';
    button.style.height = '30px';
    button.style.backgroundColor = 'rgb(74, 98, 149)';
    button.style.color = 'white';
    button.style.fontSize = '18px';
    button.style.lineHeight = '1';
    button.style.textAlign = 'center';
    button.style.border = 'none';
    button.style.outline = 'none';
    button.style.cursor = 'pointer';

    button.addEventListener('click', function() {
        const domain = GM_getValue('custom_domain', 'demo.linkace.org');
        const url = location.href;
        const description = document.getSelection() || '';
        const title = document.title || url;
        window.open(
            `https://${domain}/bookmarklet/add?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}&d=${encodeURIComponent(description)}`,
            '_blank',
            'menubar=no,height=720,width=600,toolbar=no,scrollbars=yes,status=no,dialog=1'
        );
    });

    const existingButton = document.getElementById(UNIQUE_ID);
    if (!existingButton && window.opener === null && window === window.top) {
        document.body.appendChild(button);
    }
})();
    // Append button to body
    document.body.appendChild(button);
})();
