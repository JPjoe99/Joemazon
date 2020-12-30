function signUpCheck () {
    var nameFirst = document.getElementById("inputFirstName").value;
    var nameLast = document.getElementById("inputLastName").value;
    var nameUser = document.getElementById("inputUsername").value;
    var addressEmail = document.getElementById("inputEmail").value;
    var wordPass = document.getElementById("inputPassword").value;
    if (nameFirst == "" || nameLast == "" || nameUser == "" || addressEmail == "" || wordPass == "") {
        var popup = "<p>All details have not been entered</p>";
        document.getElementById("detailsPopup").innerHTML = popup;
    }
    else {
        console.log("We are here");
        var url = "http://localhost:3000/user/sign-up";
        var data = {
            firstName: nameFirst,
            lastName: nameLast,
            username: nameUser,
            emailAddress: addressEmail,
            password: wordPass
        };
        console.log(data);
        const optionalParam = {
            body: JSON.stringify(data),
            method: "POST"
        };
        fetch(url, optionalParam)
        .then(data => {
            return data.json();
        })
        .then(res => {
            console.log(res);
        })
        .catch(error => {
            console.log(error);
        })
    }
}