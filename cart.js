/*Student Details: Beck*/
function setCookie(name, value, days) {  
    var date = new Date();  
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));  
    var expires = "; expires=" + date.toUTCString();  
    document.cookie = name + "=" + (value || "") + expires + "; path=/";  
}  
  
// 假设你有一个登录表单，并且已经验证了用户名和密码  
// 这只是一个示例，不要在生产环境中使用！  
var username = "exampleUser";  
var password = "insecurePassword"; // 注意：这只是一个示例，不要这样做！  
  
// 警告：不要这样做！这只是一个不安全的示例！  
setCookie('username_for_demo', username, 1); // 1天后过期  
setCookie('password_for_demo', password, 1); // 同样，这很不安全！
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
  
// 读取之前设置的cookie（仅用于演示）  
var usernameFromCookie = getCookie('username_for_demo');  
var passwordFromCookie = getCookie('password_for_demo');  
  
console.log('Username from cookie:', usernameFromCookie);  
console.log('Password from cookie:', passwordFromCookie); // 警告：不要在生产环境中打印密码！






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
                    <button class="remove-item" data-id="${item.id}">删除</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);

            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);

        // 使用事件代理来避免重复绑定事件监听器
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
