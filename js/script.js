/**
 * Created by h205p2 on 5/18/17.
 */



//berkeleyspn@gmail.com
//GoJackets!



$(document).ready(function() {


    //Twitter Parsers
    String.prototype.parseURL = function () {
        return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function (url) {
            return url.link(url);
        });
    };
    String.prototype.parseUsername = function () {
        return this.replace(/[@]+[A-Za-z0-9-_]+/g, function (u) {
            var username = u.replace("@", "")
            return u.link("http://twitter.com/BHSJacketSports");
        });
    };
    String.prototype.parseHashtag = function () {
        return this.replace(/[#]+[A-Za-z0-9-_]+/g, function (t) {
            var tag = t.replace("#", "%23")
            return t.link("http://search.twitter.com/search?q=" + tag);
        });
    };
    function parseDate(str) {
        var v = str.split(' ');
        return new Date(Date.parse(v[1] + " " + v[2] + ", " + v[5] + " " + v[3] + " UTC"));
    }

    $.getJSON('https://api.twitter.com/1/statuses/user_timeline/BHSJacketSports.json?callback=?&count=25&include_rts=1', function (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            var tweet = data[i].text;
            var created = parseDate(data[i].created_at);
            var createdDate = created.getDate() + '-' + (created.getMonth() + 1) + '-' + created.getFullYear() + ' at ' + created.getHours() + ':' + created.getMinutes();
            tweet = tweet.parseURL().parseUsername().parseHashtag();
            tweet += '<div class="tweeter-info"><div class="uppercase bold"><a href="https://twitter.com/#!/BHSJacketSports" target="_blank" class="black">@BHSJacketSports</a></div><div class="right"><a href="https://twitter.com/#!/BHSJacketSports/status/' + data[i].id_str + '">' + createdDate + '</a></div></div>';
            $("#twitter-feed").append('<p>' + tweet + '</p>');
        }
    });


});


function createSportWidget(location){
    console.log(location);
    var sportsArray = ["boysBase", "boysBask","boysXX", "boysFoot", "boysGolf", "boysLax", "boysSoc","boysTen", "boysTNF", "boysVol", "boysWP", "boysWre", "girlsBask", "girlsFH", "girlsGolf", "girlsLax", "girlsSoc", "girlsSoft", "girlsTen", "girlsVol", "girlsWP"];
    var sportsArrayB = ["boys,baseball", "boys,basketball", "boys,crosscountry", "boys,football", "boys,golf", "boys,lacrosse", "boys,soccer", "boys,tennis", "boys,trackfield", "boys,volleyball", "boys,waterpolo", "boys,wrestling", "girls,basketball", "girls,fieldhockey", "girls,golf", "girls,lacrosse", "girls,soccer", "girls,softball", "girls,tennis", "girls,volleyball", "girls,waterpolo"];
    var $widget = $("#widget");
    var i=0;
    var continueVar = true;
    while(continueVar) {
        console.log(i);
        if(location == sportsArray[i]) {
            continueVar = false;
            console.log(sportsArrayB[i]);
            $widget.empty();
            $widget.prepend("<script type='text/javascript' >(function(d){var mp = d.createElement('script'),h=d.getElementsByTagName('head')[0];mp.type='text/javascript';mp.async=true;mp.src='http://www.maxpreps.com/includes/js/widget/widget.compressed.js';h.appendChild(mp);})(document);</script> <a class='maxpreps-widget-link' data-width='900' data-height='1400' data-item-count='10' data-type='wall' data-include-header='false' data-member-id='3680d111-54e5-495d-b7c2-53aecd7a6d41' data-allow-scrollbar='true' href='http://www.maxpreps.com/local/school/home.aspx?gendersport=" + sportsArrayB[i] + "&schoolid=6c68b5d2-1cab-449d-9140-bd7c8adb2791'></a>");

        }
        i++
    }
}






/*


    var $boysBase = $("#boysBase");
    var $boysBask = $("#boysBask");
    var $boysXX = $("#boysXX");
    var $boysFoot = $("#boysFoot");
    var $boysGolf = $("#boysGolf");
    var $boysLax = $("#boysLax");
    var $boysSoc = $("#boysSoc");
    var $boysTen = $("#boysTen");
    var $boysTNF = $("#boysTNF");
    var $boysVol = $("#boysVol");
    var $boysWP = $("#boysWP");
    var $boysWre = $("#boysWre");
    var $girlsBask = $("#girlsBask");
    var $girlsFH = $("#girlsFH");
    var $girlsGolf = $("#girlsGolf");
    var $girlsLax = $("#girlsLax");
    var $girlsSoc = $("#girlsSoc");
    var $girlsSoft = $("#girlsSoft");
    var $girlsTen = $("#girlsTen");
    var $girlsVol = $("#girlsVol");
    var $girlsWP = $("#girlsWP");
    var $sportsList = $("#sportsList");
    var sportsArray = [$boysBase, $boysBask, $boysXX, $boysFoot, $boysGolf, $boysLax, $boysSoc, $boysTen, $boysTNF, $boysVol, $boysWP, $boysWre, $girlsBask, $girlsFH, $girlsGolf, $girlsLax, $girlsSoc, $girlsSoft, $girlsTen, $girlsVol, $girlsWP];
    var sportsArrayB = ["boys,baseball", "boys,basketball", "boys,crosscountry", "boys,football", "boys,golf", "boys,lacrosse", "boys,soccer", "boys,tennis", "boys,trackfield", "boys,volleyball", "boys,waterpolo", "boys,wrestling", "girls,basketball", "girls,fieldhockey", "girls,golf", "girls,lacrosse", "girls,soccer", "girls,softball", "girls,tennis", "girls,volleyball", "girls,waterpolo"];
    $sportsList.click(function(){
        console.log("hi");
        var i = 0;
        while(i < sportsArray.length){
            console.log(i);
            sportsArray[i].click(function(){
                $("body").pagecontainer("change", "#sports2", {});
                console.log(i);
                console.log(sportsArrayB[i]);
                document.getElementById("widget").href = "http://www.maxpreps.com/local/school/home.aspx?gendersport=" + sportsArrayB[i] + "&schoolid=6c68b5d2-1cab-449d-9140-bd7c8adb2791";
            });
            i++
        }
    });


*/





function pageChanger(to){
    $("body").pagecontainer("change", "#" + to, {});
}