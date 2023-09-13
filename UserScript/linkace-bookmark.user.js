// ==UserScript==
// @name         LinkAce Bookmark
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Bookmark button for linkace.org
// @author       Apocalypsor
// @match        *://*/*
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @downloadURL  https://github.com/Apocalypsor/Rules/raw/master/UserScript/linkace-bookmark.user.js
// @updateURL    https://github.com/Apocalypsor/Rules/raw/master/UserScript/linkace-bookmark.user.js
// ==/UserScript==

'use strict';

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
    button.innerHTML = '+';
    button.style.position = 'fixed';
    button.style.bottom = '10px';
    button.style.right = '10px';
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

    // Attach event to button
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

    // Append button to body
    document.body.appendChild(button);
})();
