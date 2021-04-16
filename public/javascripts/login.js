let submitElement = document.querySelector("#submit");
console.log("Hello");

//submitElement.addEventListener("click", verifyLabelsFilled);
function checkSubmit() {
    let inputs = document.querySelectorAll("#input");
    console.log(inputs);
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == null || inputs[i].value == "") {
            return false;
        }
    }
    return true;
}
// function authenticateLogin(body) {
//     fetch("http://localhost:3000/user/login ", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
// 			"Accept": "application/json"
//         },
//         body: body,
//     })
//     .then(res => {
//         console.log(res);
//         return res.json();
//     })
//     .then(result => {
//         console.log(result);
//     })
//     .catch(error => {
//         console.log(error);
//     })
// }

// function verifyLabelsFilled(e) {
//     e.preventDefault();
//     let formBody = new FormData();
//     let inputs = [];
//     let form = document.querySelector("#inputs");
//     let formElements = form.children;
//     for (let i = 0; i < formElements.length; i++) {
//         if (formElements[i].tagName == "INPUT") {
//             inputs.push(formElements[i]);
//         }
//     }
//     for (let i = 0; i < inputs.length; i++) {
//         if (inputs[i].value == null || inputs[i].value == "") {
//             return;
//         }
//         formBody.append(inputs[i].id, inputs[i].value);
//     }
//     let plainFormData = Object.fromEntries(formBody.entries());
//     let formDataJSON = JSON.stringify(plainFormData);
//     authenticateLogin(formDataJSON);
// }