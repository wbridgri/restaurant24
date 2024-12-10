class Store {
    constructor() {

        //track how many items are in the cart and the subtotal of the items
        this.itemsInCart = {
            itemCount: 0,
            subtotal: 0,
            subTimesQty: 0,
            tax: 0,
            deliveryFee: 6,
            total: 0,
            price: 0
        }


        this.menu = {

            item1: {
                id: 1,
                dish: 'steak',
                imgUrl: 'images/steak.jpg',
                alt: 'beefsteak',
                desc: 'cooked to order',
                price: 9.99,
                qty: 0
            },
            item2: {
                id: 2,
                dish: 'chicken',
                imgUrl: 'images/friedchicken.jpg',
                alt: 'fried chicken',
                desc: 'fried chicken',
                price: 9.99,
                qty: 0
            },
            item3: {
                id: 3,
                dish: 'cheeseburger',
                imgUrl: 'images/cheeseburger.jpg',
                alt: 'cheeseburger',
                desc: 'two smashed patties on a potato bun',
                price: 9.99,
                qty: 0
            },
            item4: {
                id: 4,
                dish: 'red beans and rice',
                imgUrl: 'images/rbr.jpg',
                alt: 'rice with red beans and sausage',
                desc: 'with andouille and green onion',
                price: 9.99,
                qty: 0
            },
            item5: {
                id: 5,
                dish: 'eggs and spam',
                imgUrl: 'images/es.jpg',
                alt: 'fried egg with spam and rice',
                desc: 'pinoy style with garlic rice',
                price: 9.99,
                qty: 0
            },
            item6: {
                id: 6,
                dish: 'the satchel',
                imgUrl: 'images/grilledcheese.jpg',
                alt: 'grilled cheese with bacon',
                desc: 'grilled cheese with bacon and pickles, gouda and pepperjack',
                price: 9.99,
                qty: 0
            },
            item7: {
                id: 7,
                dish: 'gumbo',
                imgUrl: 'images/gumbo.jpg',
                alt: 'soup with meat',
                desc: 'chicken and andouille sausage',
                price: 9.99,
                qty: 0
            },
            item8: {
                id: 8,
                dish: 'jambalaya',
                imgUrl: 'images/jambalaya.jpg',
                alt: 'rice with chicken and sausage',
                desc: 'creole style chicken and sausge with tomato base',
                price: 9.99,
                qty: 0
            }
        }
    }

    init() {
        this.loadItems()
        this.addToCart()
        this.checkout()
        this.homeSwitch()
        this.confirmOrder()
        
    }



    loadItems() {
        const itemDiv = document.getElementById('itemDiv')
        
        /**
         * for in loop 
         * 
         *  loops through properties of an object
         */
        for(const key in this.menu) {
            const item = this.menu[key]
            
            const product = document.createElement('div');
            product.className = 'col'
            product.setAttribute('id', `item-${item.id}`)
            product.innerHTML = `
                    <figure class="figure item-figure">
                        <img src="${item.imgUrl}" alt="${item.alt}"class="img-fluid image item-image figure-img" />
                        <figcaption class="figure-caption item-caption">${item.dish}
                            <span class="item-price" id="itemPrice">${item.price}</span>
                        </figcaption>
                        <p class="item-desc" id="itemDesc">${item.desc}</p>
                        <button class="btn menu-btn text-capitalize" id="menuBtn" data-id="${item.id}">add to cart</button>
                    </figure>`
                    itemDiv.appendChild(product)
        }
    }

    addToCart() {
        const menuButtons = document.querySelectorAll('.menu-btn');
        const cartItems = document.getElementById('cartItems');
        const cartSubtotal = document.getElementById('cartSubtotal');
        let price = 0;

        let subTimesQty = 0;
        const subtotalValue = document.getElementById('subtotalValue');
        const taxValue = document.getElementById('taxValue');
        
        const deliveryValue = document.getElementById('deliveryValue');
        const checkoutItemCount = document.getElementById('checkoutItemCount');

        let taxRate = 0.07
        const totalValue = document.getElementById('totalValue');

        //loop through this.menu

        for(const key in this.menu) {
            const item = this.menu[key];

            //loop through buttons
            menuButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // console.log('click')
                    if(button.dataset['id'] == item.id) {
                        this.itemsInCart.itemCount++
                        this.itemsInCart.price += item.price
                        this.itemsInCart.subtotal = this.itemsInCart.price
                        item.qty++

                        this.itemsInCart.subTimesQty = (item.price * item.qty).toFixed(2)
                        this.itemsInCart.tax = this.itemsInCart.subtotal * taxRate
                        this.itemsInCart.total = (this.itemsInCart.subtotal + this.itemsInCart.tax + this.itemsInCart.deliveryFee).toFixed(2)
                        
                    }
                    // sending data to the dom
                    cartItems.innerText = this.itemsInCart.itemCount;
                    cartSubtotal.innerText = this.itemsInCart.price.toFixed(2);
                    subtotalValue.innerText = this.itemsInCart.subtotal.toFixed(2);
                    deliveryValue.innerText = this.itemsInCart.deliveryFee.toFixed(2);
                    taxValue.innerText = this.itemsInCart.tax.toFixed(2);
                    totalValue.innerText = this.itemsInCart.total;
                    console.log(subtotalValue)

                    // if(this.itemsInCart.itemCount == 1) {
                    //     checkoutItemCount.innerText = `${this.itemsInCart.itemCount} item`
                    // }else {
                    //     checkoutItemCount.innerText = `${this.itemsInCart.itemCount} items`
                    // }

                    checkoutItemCount.innerText = this.itemsInCart == 1 ? `${this.itemsInCart.itemCount} item` : `${this.itemsInCart.itemCount}`
                })
                
            })
        }

    }

    checkout() {
        const cartBtn = document.getElementById('cartBtn');
        const checkoutPage = document.getElementById('checkoutPage');
        const menuSection = document.getElementById('menuSection');
        const tableBody = document.getElementById('tbody');

        let subTimesQty = 0;

        cartBtn.addEventListener('click', ()=>{
            if(menuSection.classList.contains('d-none')) return;

            checkoutPage.classList.remove('d-none');
            menuSection.classList.add('d-none');

            for(const key in this.menu) {
                const item = this.menu[key];

                if(item.qty > 0) {
                    subTimesQty = (item.qty * item.price).toFixed(2);

                    const tableRow = document.createElement('tr');
                    tableRow.className = 'item-checkout'

                    tableRow.innerHTML += `
                    <td id="itemImg">
                        <img src="${item.imgUrl}" alt ="${item.alt}" class="img-fluid item-img"
                    </td>
                    <td class="unit-price">${item.price.toFixed(2)}</td>
                    <td class="item-quantity">${item.qty}</td>
                    <td class="item-subtotal">${subTimesQty}</td>
                    `

                    tableBody.appendChild(tableRow)
                }
            }
        })
    }

    homeSwitch() {
        const homeSwitch = document.querySelector('.home-switch')
        const checkoutPage = document.getElementById('checkoutPage')
        const menuSection = document.getElementById('menuSection')

        homeSwitch.style.cursor = 'pointer'

        homeSwitch.addEventListener('click', ()=> {
            menuSection.classList.remove('d-none');
            checkoutPage.classList.add('d-none');

            const tableBody =  document.getElementById('tbody');
            tableBody.innerHTML = '';
        })

    }

    confirmOrder() {
        const confirmBtn = document.getElementById('confirmBtn');
        const tableBody = document.getElementById('tbody');
        const cartItems = document.getElementById('cartItems');
        const cartSubtotal = document.getElementById('cartSubtotal');
        const subtotalValue = document.getElementById('subtotalValue')
        const  taxValue = document.getElementById('taxValue');

        confirmBtn.addEventListener('click', ()=>{
            // this.itemsInCart.itemCount = 0;
            // this.itemsInCart.subtotal = 0;

            console.log(this.itemsInCart)
            
            for(const key in this.itemsInCart) {
                if(key != 'deliveryFee'){
                    this.itemsInCart[key] = 0
                    
                }
            }

            tableBody.innerHTML = '<h2>Your order is confirmed</h2>'

            cartItems.innerText = this.itemsInCart.itemCount
            cartSubtotal.innerText = this.itemsInCart.subtotal.toFixed(2);
            console.loge(cartItems.innerText)

            for(const key in this.menu) {
                const item = this.menu[key]

                item.qty = 0;
                
                
            }
        })
    }
}

const restaurant = new Store();

restaurant.init()