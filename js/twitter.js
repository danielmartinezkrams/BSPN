$(document).ready(function() {

        var word = "BHSjacketSports";
        var configProfile = {
            "profile": {"screenName": word},
            "domId": 'example1',
            /*
             this is the number of tweets that it'll get
             */
            "maxTweets": 10,



            "enableLinks": true,
            "showUser": true,
            "showTime": true,
            "showImages": false,
            "lang": 'en'
        };
        twitterFetcher.fetch(configProfile);
        console.log(allTweetText);
    /*var $twitterList = $("#twitterList")
    for(var i = 0; i  < allTweetText.length; i++){
        $($twitterList).append("<li>" + allTweetText[i] + "</li>")
    }
    */

});