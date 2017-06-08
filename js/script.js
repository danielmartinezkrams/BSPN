/**
 * Created by h205p2 on 5/18/17.
 */



//berkeleyspn@gmail.com
//GoJackets!


function createSportWidget(location){
    var sportsArray = ["boysBase", "boysBask","boysXX", "boysFoot", "boysGolf", "boysLax", "boysSoc","boysTen", "boysTNF", "boysVol", "boysWP", "boysWre", "girlsBask", "girlsFH", "girlsGolf", "girlsLax", "girlsSoc", "girlsSoft", "girlsTen", "girlsVol", "girlsWP"];
    var sportsArrayB = ["boys,baseball", "boys,basketball", "boys,crosscountry", "boys,football", "boys,golf", "boys,lacrosse", "boys,soccer", "boys,tennis", "boys,trackfield", "boys,volleyball", "boys,waterpolo", "boys,wrestling", "girls,basketball", "girls,fieldhockey", "girls,golf", "girls,lacrosse", "girls,soccer", "girls,softball", "girls,tennis", "girls,volleyball", "girls,waterpolo"];
    var $widget = $("#widget");
    var i=0;
    var continueVar = true;
    while(continueVar) {
        if(location == sportsArray[i]) {
            continueVar = false;
            $widget.empty();
            $widget.prepend("<script type='text/javascript' >(function(d){var mp = d.createElement('script'),h=d.getElementsByTagName('head')[0];mp.type='text/javascript';mp.async=true;mp.src='http://www.maxpreps.com/includes/js/widget/widget.compressed.js';h.appendChild(mp);})(document);</script> <a class='maxpreps-widget-link' data-width='900' data-height='1400' data-item-count='10' data-type='wall' data-include-header='false' data-member-id='3680d111-54e5-495d-b7c2-53aecd7a6d41' data-allow-scrollbar='true' href='http://www.maxpreps.com/local/school/home.aspx?gendersport=" + sportsArrayB[i] + "&schoolid=6c68b5d2-1cab-449d-9140-bd7c8adb2791'></a>");

        }
        i++
    }
}
