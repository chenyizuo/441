/*Student Details: Beck*/





var users = [];
//Define a function to display the page with the specified ID and hide all other pages
        function showPage(pageId) {
                //Get all elements with class name 'page'
            var pages = document.querySelectorAll('.page');
            for (var i = 0; i < pages.length; i++) {
                    //Set the display attribute of each page to 'none', which means hiding them
                pages[i].style.display = 'none';
            }
            document.getElementById(pageId).style.display = 'block';
        }
//Define a function to create a new user
        function createUser() {
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            users.push({ username: username, password: password });
            alert("User created successfully!");
            showPage('loginPage');
        }

        function login() {
            var loginUsername = document.getElementById("loginUsername").value;
            var loginPassword = document.getElementById("loginPassword").value;
            var found = false;
            for (var i = 0; i < users.length; i++) {
                if (users[i].username === loginUsername && users[i].password === loginPassword) {
                    found = true;
                    break;
                }
            }
            if (found) {
                window.location.href = "index.html";
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






function setCookie(name, value, days) {  
    var date = new Date();  
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));  
    var expires = "; expires=" + date.toUTCString();  
    document.cookie = name + "=" + (value || "") + expires + "; path=/";  
}  
  
//Assuming you have a login form and have verified your username and password

var username = "exampleUser";  
var password = "insecurePassword";   
  

setCookie('username_for_demo', username, 1);  //Expires in 1 day
setCookie('password_for_demo', password, 1); 
function getCookie(name) {  
    var nameEQ = name + "=";  
    var ca = document.cookie.split(';');  
    for (var i = 0; i < ca.length; i++) {  
        var c = ca[i];  
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);  
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);  
    }  
    return null;  
}  
  

var usernameFromCookie = getCookie('username_for_demo');  
var passwordFromCookie = getCookie('password_for_demo');  
  
console.log('Username from cookie:', usernameFromCookie);  
console.log('Password from cookie:', passwordFromCookie); 






function showPage(pageId) {
    var pages = document.querySelectorAll('.page');
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }
    document.getElementById(pageId).style.display = 'block';
}
document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const products = document.querySelectorAll('.product');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout');
    const clearCartButton = document.getElementById('clear-cart');

    products.forEach(product => {
        const increaseButton = product.querySelector('.increase-quantity');
        const decreaseButton = product.querySelector('.decrease-quantity');
        const quantityElement = product.querySelector('.quantity');

        increaseButton.addEventListener('click', () => {
            const id = product.getAttribute('data-id');
            const name = product.getAttribute('data-name');
            const price = parseFloat(product.getAttribute('data-price'));

            addToCart(id, name, price);
            quantityElement.textContent = getQuantity(id);
        });

        decreaseButton.addEventListener('click', () => {
            const id = product.getAttribute('data-id');

            updateCartItem(id, getQuantity(id) - 1);
            quantityElement.textContent = getQuantity(id);
        });
    });

    checkoutButton.addEventListener('click', () => {
        alert(`总价: $${totalPriceElement.textContent}`);
    });

    clearCartButton.addEventListener('click', () => {
        cart.length = 0;
        renderCart();
        products.forEach(product => {
            const quantityElement = product.querySelector('.quantity');
            quantityElement.textContent = 0;
        });
    });

    function addToCart(id, name, price) {
        const existingProduct = cart.find(item => item.id === id);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        renderCart();
    }

    function updateCartItem(id, quantity) {
        const product = cart.find(item => item.id === id);
        if (product) {
            product.quantity = quantity;
            if (product.quantity <= 0) {
                removeFromCart(id);
            }
        }
        renderCart();
    }

    function removeFromCart(id) {
        const index = cart.findIndex(item => item.id === id);
        if (index !== -1) {
            cart.splice(index, 1);
        }
        renderCart();
    }

    function getQuantity(id) {
        const product = cart.find(item => item.id === id);
        return product ? product.quantity : 0;
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name} - $${item.price} x ${item.quantity}</span>
                <div>
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                    <button class="remove-item" data-id="${item.id}">delete</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);

            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);

        //Using event proxies to avoid duplicate binding of event listeners
        cartItemsContainer.addEventListener('click', event => {
            if (event.target.classList.contains('increase-quantity')) {
                const id = event.target.getAttribute('data-id');
                const product = cart.find(item => item.id === id);
                if (product) {
                    updateCartItem(id, product.quantity + 1);
                }
            }

            if (event.target.classList.contains('decrease-quantity')) {
                const id = event.target.getAttribute('data-id');
                const product = cart.find(item => item.id === id);
                if (product) {
                    updateCartItem(id, product.quantity - 1);
                }
            }

            if (event.target.classList.contains('remove-item')) {
                const id = event.target.getAttribute('data-id');
                removeFromCart(id);
            }
        });
    }
});
