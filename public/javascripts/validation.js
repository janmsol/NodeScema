var first = document.getElementById("firstname");
var last = document.getElementById("lastname");
var email = document.getElementById("email");
var addr = document.getElementById("address");
var post = document.getElementById("postalcode");
var city = document.getElementById("city");
var submitbtn = document.getElementById("submit");

function validateFirst() {
    if(first.value === ""){
        first.placeholder="";
    }
    else {
        if (first.value.match(/^[a-å\s\-]+$/i)){
            first.placeholder = "valid";
        }
        else {
            first.placeholder = "invalid";
        }

    }
}

function validateLast() {
    if(last.value === ""){
        last.placeholder="";
    }
    else {
        if (last.value.match(/^[a-å\s\-]+$/i)){
            last.placeholder = "valid";
        }
        else {
            last.placeholder = "invalid";
        }

    }
}

function validateEmail(){
    if(email.value === ""){
        email.placeholder="";
    }
    else {
        if (email.value.match(/^[a-z\d]+@{1}[a-z\d]{1}[a-z.\-\d]+\.{1}[a-z]+$/i)){
            email.placeholder = "valid";
        }
        else {
            email.placeholder = "invalid";
        }
    }
}

function validateAddr(){
    if(addr.value === ""){
        addr.placeholder="";
    }
    else{
        if(addr.value.match(/^[a-å\s]+[0-9]*[a-å]*$/i)){
            addr.placeholder = "valid";
        }
        else {
            addr.placeholder = "invalid";
        }
    }
}

function validatePost() {
    if(post.value === ""){
        post.placeholder="";
    }
    else {
        if (post.value.length === 4) {
            if(post.value.match(/^[0-9]+$/)){
                post.placeholder = "valid";
                setCity();
            }
            else {
                post.placeholder = "invalid";
                city.value = "";
            }
        }
        else {
            post.placeholder = "invalid";
            city.value = "";
        }
    }
}

//function setCity() {
//    var file = "public/Postnummerregister.json";
//}

function setCity() {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {

                var allTextLines = xmlhttp.responseText.split(/\r\n|\n/);
                var headers = allTextLines[0].split(',');

                for (var i = 1; i < allTextLines.length; i++) {
                    var data = allTextLines[i].split(',');
                    if (data.length === headers.length) {
                        for (var j = 0; j < headers.length; j++) {
                            if(headers[j] === "Postnummer"){
                                if(data[j] === post.value){
                                    var obj = data[j+1].toString();
                                    city.value = obj;
                                }
                            }
                        }
                    }
                }

                /**
                var jsonObj;
                var postfound = false;

                for(var i in xmlhttp.responseText){
                    if(postfound){
                        var obj = i.toString();
                        jsonObj = JSON.parse(obj);
                        city.value = jsonObj;
                        postfound = false;
                    }
                    else {
                        if (i = post.value) {
                            postfound = true;
                        }
                    }
                }
                 **/
            }

            else {
                alert("status: "+xmlhttp.status);
            }
        }
    };

    xmlhttp.open("GET", '/postnr', true);
    xmlhttp.send();
}

function submit(){
    var correct = true;
    var full = true;
    if(first.placeholder === "invalid" || last.placeholder === "invalid" || email.placeholder === "invalid" ||
        addr.placeholder === "invalid" || post.placeholder === "invalid"){
        correct = false;
        alert("Venligst korriger input")
    }
    if(first.value === "" || last.value === "" || email.value === "" || addr.value === "" || post.value === ""){
        full = false;
        alert("Venligst fyll inn alle felt")
    }
    if(correct && full){
        alert("Utfyllingen er godkjent. Synd denne knappen ikke har noen funksjon.")
    }

}

first.oninput=validateFirst;
last.oninput=validateLast;
email.oninput=validateEmail;
addr.oninput=validateAddr;
post.oninput=validatePost;
submitbtn.onclick=submit;