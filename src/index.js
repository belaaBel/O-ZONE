//CHECKBOX

let checkbox = document.querySelectorAll('.filter-check_checkbox');

checkbox.forEach(element => {
    element.addEventListener('change', function() {
        // console.log(this.nextElementSibling);
        if(this.checked){
            this.nextElementSibling.classList.add('checked');
        } else{
            this.nextElementSibling.classList.remove('checked');
        }
        // 
    });
});

//END CHECKBOX

//CARD

let btn_cart = document.getElementById('cart');
let cart = document.querySelector('.cart');
let btn_close = document.querySelector('.cart-close');

btn_cart.addEventListener('click', () => {
    cart.style.display = 'flex';
    document.body.style.overflow = 'hidden';
})

btn_close.addEventListener('click', () => {
    cart.style.display = 'none';
    document.body.style.overflow = '';
})

//END CARD

//WORK IN CART

const cards = document.querySelectorAll('.goods .card'),
cartWrapper = document.querySelector('.cart-wrapper'),
cartEmpty = document.getElementById('cart-empty'),
counter = document.querySelector('.counter');

cards.forEach(card => {
    const btn_add_product = card.querySelector('.btn');

    btn_add_product.addEventListener('click', () => {
        let clone_product = card.cloneNode(true);

        cartWrapper.appendChild(clone_product);
        cartEmpty.remove();
        showNumber();
    })

    
})

function showNumber() {
    const cardsCart = cartWrapper.querySelectorAll('.card');
    
    counter.textContent = String(cardsCart.length);
}
//END CART