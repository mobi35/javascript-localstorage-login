//JAVASCRIPTTTTTTTTT

document.getElementById("registering").addEventListener("click", (e) => {
    e.preventDefault();
    let username = document.getElementById("r_username").value;
    let password = document.getElementById("r_password").value;
    let confirmpassword = document.getElementById("r_confirmpassword").value;
    let email = document.getElementById("email").value;
    let userpass = `${username}&${password}&${email}`;
    var arrNum = "1234567890".split('');
    var containNum = false;
    password.split('').forEach((e) => {

        if (arrNum.indexOf(e) > -1) {
            containNum = true;
        }

    });

    if (username == "") {
        alert("Please enter a your username");
        return false;
    }
    if (username.length < 6) {
        alert("The username length must be greater than 5");
        return false;
    }



    if (password == "") {
        alert("Please enter a your password");
        return false;
    }

    if (password.length < 8) {
        alert("The password length must be greater than 7");
        return false;
    }
    if (!containNum) {
        alert("Password must combined with atleast 1 number");
        return false;
    }
    if (password != confirmpassword) {
        alert("password doesnt match");
        return false;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email");
        return false;
    }


    if (localStorage.getItem("name") != null) {
        var arrs = localStorage.getItem("name").split(",");

        for (let i = 0; i < arrs.length; i++) {

            if (arrs[i].split('&')[0] == username) {
                alert("This username is already taken. Please choose another username");
                return false;
            }

        }

        var addArray = localStorage.getItem("name").split(",");
        addArray.push(userpass);
        localStorage.setItem("name", addArray);
    } else {
        var newArr = [];
        newArr.push(userpass);
        localStorage.setItem("name", newArr);
    }

    alert("Successfully Registered");
    document.getElementById("r_username").value = "";
    document.getElementById("r_password").value = "";
    document.getElementById("r_confirmpassword").value = "";
    document.getElementById("email").value = "";


});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function Login() {

    var arrs = localStorage.getItem("name").split(",");
    let uname = document.getElementById("username").value;
    let pword = document.getElementById("password").value;
    for (var i = 0; i < arrs.length; i++) {
        console.log(arrs[i].split('&'));
        if (arrs[i].split('&')[0] == uname && arrs[i].split('&')[1] == pword) {
            alert("Success");
            sessionStorage.SessionName = uname;
            sessionStorage.Email = arrs[i].split('&')[2];
            location.reload();
            return false;
        } else if (arrs[i].split('&')[0] == uname && i == arrs.length - 1) {
            alert("Wrong Password");
            return false;
        }
    }

    alert("Account Doesn't Exist");
    return false;

}

if (sessionStorage.SessionName != null) {
    document.getElementById("loginpage").style.display = 'none';
    document.getElementById("user").innerHTML = `<div style="color:white;">Hi! Welcome ${sessionStorage.getItem("SessionName")} <br> <a onclick="sessionStorage.clear(); location.reload();" style="font-size:23px;" href = "#" >Logout</a><br>Email Address : ${sessionStorage.getItem("Email")} </div>`;

}

