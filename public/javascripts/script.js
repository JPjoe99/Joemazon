let header = document.querySelector("#header");
let main = document.querySelector("#joemazon-container");
let script = document.createElement("script");
let cookie = document.cookie;
script.id = "script";
document.head.appendChild(script);
insertHome();

if (checkJWTCookiePresent()) {
    insertNavbar("userNavbar");
}
else {
    insertNavbar("navbar");
}

function fetchSearchData() {
    fetch("http://localhost:3000/")
}

// function addEventListenerstoNavbar() {
//     let navbarItems = document.querySelector("#navbar-list").children;
//     for (let i = 0; i < navbarItems.length; i++) {
//         navbarItems[i].addEventListener("click", changeSnippet);
//     }
// }
// async function addEventListenerstoNavbar() {
//     console.log(document.querySelector("#navbar-list"))
//     let navbarItems = document.querySelector("#navbar-list").children;
//     for (let i = 0; i < navbarItems.length; i++) {
//         navbarItems[i].addEventListener("click", insertJS);
//     }
//     console.log(navbarItems);
// }

//addEventListenerstoNavbar();



function insertHome() {
    fetch(`views/snippets/home.html`)
    .then(res => {
        return res.text();
    })
    .then(html => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, "text/html");
        docBody = doc.querySelector("#home");
        main.innerHTML = "";
        main.appendChild(docBody);
        document.querySelector("#script").src = `javascripts/home.js`
        return;

        
    })
    .catch(error => {
        console.log("Failed to fetch page");
    })
}



// function changeSnippet(e) {
//     let tabID = e.target.id;
//     if (tabID == "login" || tabID == "signup") {
//         return changeEntirePage(tabID);
//     }
//     if (header.innerHTML == "") {
//         insertNavbar();
//     }
//     fetch(`snippets/${tabID}.html`)
//     .then(res => {
//         return res.text();
//     })
//     .then(html => {
//         let parser = new DOMParser();
//         let doc = parser.parseFromString(html, "text/html");
//         let docBody = doc.querySelector(`#${tabID}`);
//         main.innerHTML = "";
//         main.appendChild(docBody);
//     })
//     .catch(error => {
//         console.log(error);
//     })
// }

function insertJS(e) {
    let tabID = e.target.id;
    main.removeChild(script);
    let newScript = main.createElement("script");
    newScript.src = `javascript/${tabID}.js`;
    main.appendChild(newScript);

}

function checkJWTCookiePresent() {
    if (cookie.length > 0) {
        console.log("Cookie");
        return true;
    }
    console.log("No Cookie");
    return false;
}

function insertNavbar(navbarIn) {
    fetch(`views/snippets/${navbarIn}.html`)
    .then(res => {
        return res.text();
    })
    .then(html => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, "text/html");
        let docBody = doc.querySelector(`#navbar`);
        header.innerHTML = "";
        header.appendChild(docBody);
        addEventListenerstoNavbar();
    })
    .catch(error => {
        console.log(error);
    })
}