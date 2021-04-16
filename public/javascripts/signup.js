let head = document.head;
let link = document.createElement("link");

link.type = "text/css";
link.rel = "stylesheet";
link.href = "../public/stylesheets/sign-in.css";

head.appendChild(link);

let submitElement = document.querySelector("#submit");

submitElement.addEventListener("click", verifyLabelsFilled);


function authenticateLogin(body) {
    fetch("http://localhost:3000/user/sign-up", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
			"Accept": "application/json"
        },
        body: body,
    })
    .then(res => {
        return res.json();
    })
    .then(result => {
        return result;
    })
    .catch(error => {
        console.log(error);
    })
}

function verifyLabelsFilled(e) {
    let formBody = new FormData();
    e.preventDefault();
    let inputs = [];
    let form = document.querySelector("#inputs");
    let formElements = form.children;
    for (let i = 0; i < formElements.length; i++) {
        if (formElements[i].tagName == "INPUT") {
            inputs.push(formElements[i]);
        }
    }
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == null || inputs[i].value == "") {
            console.log("EMPTY");
            return;
        }
        formBody.append(inputs[i].id, inputs[i].value);
        body += `${inputs[i].id}: ${inputs[i].value},`
    }
    let plainFormData = await Object.fromEntries(formBody.entries());
    console.log(plainFormData);
    let formDataJSON = await JSON.stringify(plainFormData);
    console.log(formDataJSON);
    // if (authenticateLogin(formDataJSON).registration = "success") {
    //     console.log("Hello");
    // };
}