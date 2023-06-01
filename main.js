
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

cartIcon.onclick = () => {
    cart.style.display = 'block'; // Display the cart when the icon is clicked
    displayCartItems(); // Call a function to display the cart items
  };

closeCart.onclick = () => {
    cart.style.display =' none';
};

document.addEventListener('DOMContentLoaded', ready);

function ready() {
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }



    var buyButtons = document.getElementsByClassName('btn-buy');
    for (var i = 0; i < buyButtons.length; i++) {
        var button = buyButtons[i];
        button.addEventListener("click", addCartClicked);
    }
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }

    updateTotal();
}

function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("Product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("Product-img")[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

function addProductToCart(title, price, productImg) {
    var cartContent = document.querySelector('.cart-content');
    var cartItems = cartContent.getElementsByClassName('cart-box');
    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
        var cartItemTitle = cartItem.getElementsByClassName('cart-product-title')[0].innerText;
        if (cartItemTitle === title) {
            alert("Already Added");
            return;
        }
    }

    var cartBox = document.createElement('div');
    cartBox.classList.add('cart-box');
    var cartBoxHTML = `
                <img src="${productImg}" class="cart-img">
                <div class="detail-box">
                    <div class="cart-product-title">${title}</div>
                    <div class="cart-price">${price}</div>
                    <input type="number" value="1" class="cart-quantity">
                </div>
                <i class='bx bxs-trash-alt cart-remove delete-item-cart' onclick="removeCartItem(event)"></i>
            `;
    cartBox.innerHTML = cartBoxHTML;
    cartContent.appendChild(cartBox);

    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    
    var removeCartButtons = cartBox.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    updateTotal();
}

function updateTotal() {
    var cartBoxContainer = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartBoxContainer.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total += price * quantity;
    }
    document.getElementsByClassName('total-price')[0].innerText = '$' + total;
} 