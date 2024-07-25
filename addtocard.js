document.addEventListener("DOMContentLoaded", () => {
    const cartButton = document.getElementById("cart-button");
    const closeButton = document.getElementById("close-button");
    const offCanvasCart = document.getElementById("off-canvas-cart");
    const cartItemContainer = document.getElementById("cartItem");
    const totalElement = document.getElementById("total");
    const countElement = document.getElementById("count");
    const buyButton = document.getElementById("buy-button");
    const orderModal = document.getElementById("orderModal");
    const closeModal = document.querySelector(".close-modal");

    let cart = [];
    let totalPrice = 0;

    function updateCart() {
        cartItemContainer.innerHTML = "";
        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <div class="cart-item-content">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image" style="width: 50px; height: 50px;">
                    <div style="display: inline-block; margin-left: 10px;">
                        <h4>${item.name}</h4>
                        <h5>₹${item.price.toFixed(2)}</h5>
                    </div>
                </div>
                <button class="btn btn-danger remove-item" data-index="${index}">Remove</button>
            `;
            cartItemContainer.appendChild(cartItem);
        });

        totalElement.innerText = `₹${totalPrice.toFixed(2)}`;
        countElement.innerText = cart.length;

        if (cart.length === 0) {
            cartItemContainer.innerHTML = "Your Cart is Empty";
        }

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", () => {
                const index = button.getAttribute("data-index");
                removeFromCart(index);
            });
        });
    }

    function addToCart(product) {
        cart.push(product);
        totalPrice += product.price;
        updateCart();
    }

    function removeFromCart(index) {
        const product = cart[index];
        cart.splice(index, 1);
        totalPrice -= product.price;
        updateCart();
    }

    document.querySelectorAll(".btn.border[style*='background-color:orange']").forEach(button => {
        button.addEventListener("click", () => {
            const cardBody = button.closest(".card-body");
            const productName = cardBody.querySelector("h3").innerText;
            const productPrice = parseFloat(cardBody.querySelector("h5").innerText.replace("₹", "").replace(",", ""));
            const productImage = cardBody.querySelector("img").src;

            const product = {
                name: productName,
                price: productPrice,
                image: productImage
            };

            addToCart(product);
        });
    });

    cartButton.addEventListener("click", function(){
        offCanvasCart.classList.add('show');
    });
    closeButton.addEventListener("click", function(){
        offCanvasCart.classList.remove('show');
    });
    window.addEventListener("click", function(event){
        const canvaCart = document.getElementById('off-canvas-cart');
        if(event.target !== canvaCart && !canvaCart.contains(event.target) && event.target !== cartButton){
            canvaCart.classList.remove('show');
        }
    });

    buyButton.addEventListener("click", () => {
        orderModal.style.display = "block";
    });
    closeModal.addEventListener("click", () => {
        orderModal.style.display = "none";
    });
    window.addEventListener("click", (event) => {
        if (event.target === orderModal) {
            orderModal.style.display = "none";
        }
    });
    
});