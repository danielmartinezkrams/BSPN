$(document).ready(function() {


        var configProfile = {
            "profile": {"screenName": "BHSjacketSports"},
            "domId": 'example1',
            /*
             this is the number of tweets that it'll get
             */
            "maxTweets": 10,
            "enableLinks": true,
            "showUser": true,
            "showTime": true,
            "showImages": true,
            "lang": 'en'
        };
        twitterFetcher.fetch(configProfile);
        console.log(allTweetText);


});