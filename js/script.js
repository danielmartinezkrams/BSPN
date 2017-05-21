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
    $()
    document.getElementById("widget").href = "'http://www.maxpreps.com/local/school/home.aspx?'" + ketanFunc() + "'schoolid=6c68b5d2-1cab-449d-9140-bd7c8adb2791'";



});

function ketanFunc() {



}

function pageChanger(to){
    $("body").pagecontainer("change", "#" + to, {});
}