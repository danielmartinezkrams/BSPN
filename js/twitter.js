$(document).ready(function() {
    var configBHSJacketSports = {
            "profile": {"screenName": "BHSjacketSports"},
            "domId": 'example1',
            "maxTweets": 20,
            "enableLinks": true,
            "showUser": true,
            "showTime": true,
            "showImages": true,
            "lang": 'en'
        };
    var configBSPN = {
        "profile": {"screenName": "BerkeleySPN"},
        "domId": 'example1',
        "maxTweets": 20,
        "enableLinks": true,
        "showUser": true,
        "showTime": true,
        "showImages": true,
        "lang": 'en'
    };
    twitterFetcher.fetch(configBHSJacketSports);
    twitterFetcher.fetch(configBSPN);
    //console.log(allTweetText);
});