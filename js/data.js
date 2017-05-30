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
        var l = 0;
        while(l < passwordData.length){
            console.log(l);
            if(email == passwordData[l].email && pass == passwordData[l].password){
                l = passwordData.length + 1;
                authorized = true;
                console.log(authorized);
            }
            else{
                l++
            }
        }
        if(!authorized){
            console.log("fail");
            var dlgInvalidCredentials = $("#dlg-invalid-credentials");
            dlgInvalidCredentials.popup("open");
        }



    });

    var $signUpSubmit = $("#signUpSubmit");
    $signUpSubmit.click(function () {
        console.log("sign Up");
        loadData();

        var passwordData = getData("password");
        console.log(passwordData);

        var firstName = $("#txt-first-name").val();
        var lastName = $("#txt-last-name").val();
        var email = $("#txt-email-signup").val();
        var password = $("#txt-password-signup").val();
        var passwordConfirm = $("#txt-password-confirm").val();

        console.log(firstName);
        console.log(lastName);
        console.log(email);
        console.log(password);
        console.log(passwordConfirm);


        if(password == passwordConfirm){
            passwordData.push({
                "email": email,
                "firstName": firstName,
                "password": password,
                "lastName": lastName
            });
            setData(passwordData, "password");
            var $signUpSent = $("#dlg-sign-up-sent");
            var $congratulationsMessage = $("#congratulationsMessage");
            $congratulationsMessage.html(firstName + ", welcome to BSPN!");
            $signUpSent.popup("open");
            authorized = true;
        }
        else{

        }


    });



});





