/**
 * Created by h205p2 on 5/18/17.
 */
/*
function widget(){
    var mp = document.createElement('script'),h=document.getElementsByTagName('head')[0];
    mp.type='text/javascript';
    mp.async=true;
    mp.src='http://www.maxpreps.com/includes/js/widget/widget.compressed.js';
    h.appendChild(mp);
}
*/


//berkeleyspn@gmail.com
//GoJackets!


//<a class="twitter-timeline" href="https://twitter.com/BHSjacketSports">Tweets by BHSjacketSports</a> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>



$(document).ready(function(){
    var boysBase = $("#boysBase");
    var boysBask = $("#boysBask");
    var boysXX = $("#boysXX");
    var boysFoot = $("#boysFoot");
    var boysGolf = $("#boysGolf");
    var boysLax = $("#boysLax");
    var boysSoc = $("#boysSoc");
    var boysTen = $("#boysTen");
    var boysTNF = $("#boysTNF");
    var boysVol = $("#boysVol");
    var boysWP = $("#boysWP");
    var boysWre = $("#boysWre");
    var girlsBask = $("#girlsBask");
    var girlsFH = $("#girlsFH");
    var girlsGolf = $("#girlsGolf");
    var girlsLax = $("#girlsLax");
    var girlsSoc = $("#girlsSoc");
    var girlsSoft = $("#girlsSoft");
    var girlsTen = $("#girlsTen");
    var girlsVol = $("#girlsVol");
    var girlsWP = $("#girlsWP");
    var sportsArray = [boysBase, boysBask, boysXX, boysFoot, boysGolf, boysLax, boysSoc, boysTen, boysTNF, boysVol, boysWP, boysWre, girlsBask, girlsFH, girlsGolf, girlsLax, girlsSoc, girlsSoft, girlsTen, girlsVol, girlsWP];
    var sportsArrayB = ["boys,baseball", "boys,basketball", "boys,crosscountry", "boys,football", "boys,golf", "boys,lacrosse", "boys,soccer", "boys,tennis", "boys,trackfield", "boys,volleyball", "boys,waterpolo", "boys,wrestling", "girls,basketball", "girls,fieldhockey", "girls,golf", "girls,lacrosse", "girls,soccer", "girls,softball", "girls,tennis", "girls,volleyball", "girls,waterpolo"];
    for(var i=0; i < sportsArray.length; i++){
        sportsArray[i].click(function(){
            document.getElementById("widget").href = "'http://www.maxpreps.com/local/school/home.aspx?gendersport='" + sportsArrayB[i] + "'&schoolid=6c68b5d2-1cab-449d-9140-bd7c8adb2791'";
        })
    }




    document.getElementById("widget").href = "'http://www.maxpreps.com/local/school/home.aspx?'" + ketanFunc() + "'schoolid=6c68b5d2-1cab-449d-9140-bd7c8adb2791'";



});

function ketanFunc() {



}

function pageChanger(to){
    $("body").pagecontainer("change", "#" + to, {});
}