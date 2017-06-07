$(document).ready(function() {

    var configBSPN = {
        "profile": {"screenName": "BerkeleySPN"},
        "domId": 'Twitter1',
        "maxTweets": 20,
        "enableLinks": true,
        "showUser": true,
        "showTime": true,
        "showImages": true,
        "lang": 'en'
    };
    twitterFetcher.fetch(configBSPN);
    console.log(allTweetText);


    var configBHSJacketSports = {
        "profile": {"screenName": "BHSjacketSports"},
        "domId": 'Twitter2',
        "maxTweets": 20,
        "enableLinks": true,
        "showUser": true,
        "showTime": true,
        "showImages": true,
        "lang": 'en'
    };
    twitterFetcher.fetch(configBHSJacketSports);


    console.log(allTweetText);

});