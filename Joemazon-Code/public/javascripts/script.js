
(function() {
document.addEventListener("DOMContentLoaded", function(event) { 
  var checkAboutClicked = function() {
    targetElement = document.getElementById("joemazon-about").onclick;
    if (targetElement === true) {
      console.log("Hello there");
      return true;
    }
    else {
      return false;
    }
  }
  
  var insertError = function() {
    var selectedElement = document.querySelector("#joemazon-login-error");
    selectedElement.innerHTML = "<p id=joemazon-login-error>Login details incorrect</p>";
  }
  
});
})();





  

