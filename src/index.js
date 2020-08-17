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


    const filterPrice = (card) => {
        const price = parseFloat(card.querySelector('.card-price').textContent);
        if((min.value && price < min.value) || (max.value && price > max.value)){
            card.parentNode.style.display = 'none';
        } else{
            card.parentNode.style.display = '';
        }
    }
    
    const filter = () => {
        if(check.checked){
            cards.forEach(card => {
                if(!card.querySelector('.card-sale')){
                    card.parentNode.style.display = 'none';
                }
                else {
                    filterPrice(card);
                }
            })
        } else{
            cards.forEach(card => {
                filterPrice(card);
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


// получение данных с вервера
function getDate(){
    const goodWrapper = document.querySelector('.goods');
    return fetch('../db/db.json')
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.status);
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.warn(error);
            goodWrapper.innerHTML = '<div style = "color: red; font-size: 30px">Упс, что-то пошло не так</div>'
        })
}
// конец получения данных


//вывод карточек на экран
function renderCards(data){
   const goodWrapper = document.querySelector('.goods');
    data.goods.forEach(good => {
        const card = document.createElement('div');
        card.className = "col-12 col-md-6 col-lg-4 col-xl-3";
        
        card.innerHTML = `
        <div class="card" data-category = '${good.category}'>
            ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
            <div class="card-img-wrapper">
                <span class="card-img-top"
                    style="background-image: url('${good.img}')"></span>
            </div>
            <div class="card-body justify-content-between">
                <div class="card-price" style = "${good.sale ? 'color: red' : ''}">${good.price} ₽</div>
                <h5 class="card-title">${good.title}</h5>
                <button class="btn btn-primary">В корзину</button>
            </div>
        </div>
    </div>
    `;
    goodWrapper.appendChild(card);
    });
}
//конец


//Работа с каталог
function renderCatalog(){
    const cards = document.querySelectorAll('.goods .card');
    const catalogBtn = document.querySelector('.catalog-button');
    const catalog = document.querySelector('.catalog');
    const catalogList = document.querySelector('.catalog-list');
    const categories = new Set();

    cards.forEach(card => {
        categories.add(card.dataset.category);
    })

    categories.forEach(caterory => {
        const li = document.createElement('li');
        li.textContent = caterory;
        catalogList.appendChild(li);
    })
    
    catalogBtn.addEventListener('click', (event)=> {
        const list = catalogList.getElementsByTagName('li');

        if(catalog.style.display){
            catalog.style.display = '';
        } else{
            catalog.style.display = 'block';
        }

        if(event.target.tagName === 'LI'){
            const li = event.target;
            cards.forEach(card => {
                if(card.dataset.category === li.textContent){
                    card.parentNode.style.display = '';
                    card.style.display = '';
                } else{
                    card.parentNode.style.display = 'none';
                    card.style.display = 'none';
                }
            })
        }
        filters();
    })  
}
//конец


getDate().then(data => {
    renderCards(data);
    toggleCheckbox();
    addCard();
    workCart();
    filters();
    renderCatalog();
});
