/*Student Details: Beck*/
function showPage(pageId) {
    var pages = document.querySelectorAll('.page');
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }
    document.getElementById(pageId).style.display = 'block';
}

function createUser() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    alert("User created successfully!");
    showPage('loginPage');
}

function login() {
    var loginUsername = document.getElementById("loginUsername").value;
    var loginPassword = document.getElementById("loginPassword").value;
    if (loginUsername === "user" && loginPassword === "password") {
        showPage('shoppingPage');
    } else {
        alert("Invalid username or password. Please try again.");
    }
}

function checkout() {
    var quantity = parseInt(document.getElementById("quantity").value);
    var product = parseInt(document.getElementById("productSelect").value);
    var total = quantity * product;
    document.getElementById("totalOrder").innerText = "Total Order: $" + total;
}