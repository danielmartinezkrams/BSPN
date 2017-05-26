/**
 * Created by h205admin on 5/26/17.
 */



//this will save an array of objects to a local storage
function setData(array, name) {
    var json = JSON.stringify(array);
    localStorage.setItem(name, json);
}

//this retrieves data from local storage
function getData(name) {
    var text = localStorage.getItem(name);
    return JSON.parse(text);

}

function loadData() {
    var data = [{
        "email": "albinson@thing.com",
        "firstName": "Matt",
        "password": "ppwpwpwp",
        "lastName": "Albinson"
    },
        {
            "email": "email2",
            "password": "password2",
            "firstName": "name2",
            "lastName": "lastName2"
        },
        {
            "email": "email3",
            "password": "password3",
            "firstName": "name3",
            "lastName": "lastName3"
        }];


    setData(data, "password");

    //console.log(getData("password"));

}


$(document).ready(function(){

    var authorized = false;
    var $signInSubmit = $("#signInSubmit");
    $signInSubmit.click(function () {
        loadData();
        var passwordData = getData("password");
        console.log(passwordData);
        //test for correect login
        var email = $("#txt-email-signin").val();
        var pass = $("#txt-password-signin").val();

        for(var i = 0; i < passwordData.length; i++){
            if(email == passwordData[i].email && pass == passwordData[i].password){
                authorized = true
            }
            else{

            }
        }



    });

    var $signUpSubmit = $("#signUpSubmit");
    $signUpSubmit.click(function () {
        loadData();
    })







});





