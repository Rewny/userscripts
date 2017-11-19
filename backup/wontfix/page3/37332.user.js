// ==UserScript==
// @name           SnowTigers : Registration Alerter
// @namespace      http://gm.wesley.eti.br/snowtigers
// @description    Opens the Account Signup page when registration is open
// @include        *
// @grant          GM_log
// @grant          GM.log
// @grant          GM_getValue
// @grant          GM.getValue
// @grant          GM_setValue
// @grant          GM.setValue
// @grant          GM_openInTab
// @grant          GM.openInTab
// @grant          GM_deleteValue
// @grant          GM.deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM.xmlHttpRequest
// @icon           http://gm.wesley.eti.br/icon.php?desc=37332
// @require        https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// ==/UserScript==

(function recursive()
{    // script scope

    var user = {
        'interval':15 * 60 * 1000    // every 15 minutes
    };

    var script = {
        'lastCheck':parseInt(GM.getValue('lastCheck', '0'), 10),
        'currentDate':parseInt(new Date().valueOf(), 10)
    };

    if (script.lastCheck + user.interval < script.currentDate)
    {
        GM.log('Requesting http://www.snowtigers.net/account-signup.php ...');
        GM.setValue('lastCheck', "" + (script.lastCheck = script.currentDate));
        GM.xmlHttpRequest({
            'url':'http://www.snowtigers.net/account-signup.php',
            'method':'get',
            'onload':function(e)
            {
                if (/^2/.test(e.status))
                {
                    if (!/Le nombre maximum de membres est atteint/i.test(e.responseText))
                        GM.openInTab(e.finalUrl);
                }
                else
                    GM.log('An error has occurred while requesting '+e.finalUrl);
            },
            'onerror':function(e)
            {
                GM.log('An error has occurred while requesting '+e.finalUrl);
            }
        });
    }

    setTimeout( recursive, script.lastCheck + user.interval - script.currentDate + 1000 * Math.random());
})();