var page = require('webpage').create();

page.settings.userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36";
page.open('https://www.zazzle.de/big_adventure_paragliding_schlusselanhanger-146019324691506541', function() {
    console.log(page.content);
    phantom.exit();
});
