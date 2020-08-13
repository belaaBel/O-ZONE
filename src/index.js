//CHECKBOX
function toggleCheckbox(){
    let checkbox = document.getElementById('discount-checkbox');

    checkbox.addEventListener('change', function(){
        // console.log(this.nextElementSibling);
        this.nextElementSibling.classList.toggle('checked');
    });
    // checkbox.forEach(element => {
        
    // });
}
//END CHECKBOX


//CARD
function addCard(){
    let btn_cart = document.getElementById('cart');
    let cart = document.querySelector('.cart');
    let btn_close = document.querySelector('.cart-close');

    btn_cart.addEventListener('click', () => {
        cart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    btn_close.addEventListener('click', () => {
        cart.style.display = 'none';
        document.body.style.overflow = '';
    });
}
//END CARD


//WORK IN CART
function workCart(){
    const cards = document.querySelectorAll('.goods .card'),
    cartWrapper = document.querySelector('.cart-wrapper'),
    cartEmpty = document.getElementById('cart-empty'),
    counter = document.querySelector('.counter');
    
    cards.forEach(card => {
        const btn_add_product = card.querySelector('.btn');
    
        btn_add_product.addEventListener('click', () => {
            let clone_product = card.cloneNode(true);
            let btn_clone = clone_product.querySelector('.btn');
    
            btn_clone.textContent = 'Удаление из корзины';
            cartWrapper.appendChild(clone_product);
           
            showNumber();
    
            btn_clone.addEventListener('click', () => {
                clone_product.remove();
                showNumber();
            });
        }); 
    });
    
    function showNumber() {
        const cardsCart = cartWrapper.querySelectorAll('.card');
        const priceCards = cartWrapper.querySelectorAll('.card-price');
        const total = document.querySelector('.cart-total span');
    
        let sum = 0;
    
        priceCards.forEach(priceCard => {
            sum += parseFloat(priceCard.textContent);
        });
    
        counter.textContent = String(cardsCart.length);
        total.textContent = sum;
    
        if (cardsCart.length != 0){
            cartEmpty.remove();
        } else {
            cartWrapper.appendChild(cartEmpty);
        }
    }
}
//END CART


//работа с фильтрами
function filters(){
    const cards = document.querySelectorAll('.goods .card');
    const check = document.getElementById('discount-checkbox');
    const min = document.getElementById('min');
    const max = document.getElementById('max');
    const searchBtn = document.querySelector('.search-btn');


    const filter = () => {
        if(check.checked){
            cards.forEach(card => {
                const price = parseFloat(card.querySelector('.card-price').textContent);
                if(!card.querySelector('.card-sale')){
                    card.parentNode.style.display = 'none';
                }
                else {
                    if((min.value && price < min.value) || (max.value && price > max.value)){
                        card.parentNode.style.display = 'none';
                    } else{
                        card.parentNode.style.display = '';
                    }
                }
            })
        } else{
            cards.forEach(card => {
                const price = parseFloat(card.querySelector('.card-price').textContent);

                if((min.value && price < min.value) || (max.value && price > max.value)){
                    card.parentNode.style.display = 'none';
                } else {
                    card.parentNode.style.display = '';
                }
            });
        }
    }

    check.addEventListener('click', filter);
    min.addEventListener('change', filter);
    max.addEventListener('change', filter);

    searchBtn.addEventListener('click', () => {
        const searchText = new RegExp(document.querySelector('.search-wrapper_input').value.trim().toLowerCase(), 'i');
        cards.forEach(card => {
            const textTitle = (card.querySelector('.card-title').textContent).toLowerCase();
            if(!searchText.test(textTitle)){
                card.parentNode.style.display = 'none';
            } else{
                card.parentNode.style.display = '';
            }
        })
    })
}
//конец работы


toggleCheckbox();
addCard();
workCart();
filters();