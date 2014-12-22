// ==UserScript==
// @name         Travis-CI Informational HTML Titles
// @namespace    https://github.com/rhyolight/travis-ci-userscripts/blob/master/travis-ci-title.user.js
// @version      0.2
// @description  Replaces generic HTML titles for Travis-CI build pages with one that depicts the repo slug and build number.
// @author       Matthew Taylor
// @grant        none
// ==/UserScript==

var lastUrl = undefined
  , titleElement = document.getElementsByTagName('title')[0]
  , originalTitle = titleElement.innerHTML;

function updateTitle(href) {
    var url = href.split('/')
      , domain = url[2]
      , slug = ''
      , title = undefined
      ;
    if (domain == 'travis-ci.org') {
        if (url.length > 3 && url[3] != '') {
            slug = url[3] + '/' + url[4];
            title = slug;
            if (url.length == 6) {
                title = title + ': ' + url[5];
            } else if (url.length > 5) {
                if (url[5] == 'builds') {
                    title = title + ': build ' + url[6];
                } else if (url[5] == 'jobs') {
                    title = title + ': job ' + url[6];
                }
            }
        }
    }
    if (title) {
        titleElement.innerHTML = title;
    } else {
        titleElement.innerHTML = originalTitle;
    }
}

function checkForUrlChange() {
    var currentUrl = location.href;
    if (currentUrl != lastUrl) {
        updateTitle(currentUrl);
    }
    lastUrl = currentUrl;
}

setInterval(checkForUrlChange, 1000);
checkForUrlChange;
