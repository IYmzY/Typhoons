let shop = document.querySelector('.cartShopCart')
let shopWindow = document.querySelector('.shopWindow')
let closeShop = document.querySelector('.closeShopWindow')
let cart = document.querySelectorAll('.cartSelector')

shop.addEventListener("click", () => {
    shopWindow.style.display = "block"
    console.log('i am triggered ahahaha')
})

closeShop.addEventListener("click", () => {
    console.log('i am closed')
})


let items = [
    {
        name: "CD ALBUM",
        price: 10,
        tag: "CDALBUM.png",
        inCart: 0,
    },
    {
        name: "CD ALBUM & Tshirt",
        tag: "CDALBUM&TSHIRT.png",
        price: 30,
        inCart: 0,
    },
    {
        name: "Typhoons Tshirt",
        tag: "TPSHIRT.png",
        price: 25,
        inCart: 0,
    },
    {
        name: "Typhoons CAP",
        tag: "TPCAP.png",
        price: 15,
        inCart: 0,
    },
    {
        name: "Royal blood Tshirt",
        tag: "RBTSHIRTS.png",
        price: 20,
        inCart: 0,
    }
]

for (let y = 0; y < cart.length; y++) {
    cart[y].addEventListener('click', () => {
        cartNumbers(items[y])
        totalCost(items[y])
    })
}

const onLoadItemNumbers = () => {
    let itemNumbers = localStorage.getItem('cartNumbers');

    if (itemNumbers) {
        document.querySelector('.itemNumbers span').textContent = itemNumbers
    }
}

const cartNumbers = (items) => {
    let itemNumbers = localStorage.getItem('cartNumbers');

    itemNumbers = parseInt(itemNumbers)

    if (itemNumbers) {
        localStorage.setItem('cartNumbers', itemNumbers + 1);
        document.querySelector('.itemNumbers span').textContent = itemNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.itemNumbers span').textContent = 1;
    }
    setItems(items)

}

const setItems = (items) => {
    let cartItems = localStorage.getItem('itemsInCart');
    cartItems = JSON.parse(cartItems)
    if (cartItems != null) {
        if (cartItems[items.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [items.tag]: items
            }
        }
        cartItems[items.tag].inCart += 1;
    } else {
        items.inCart = 1;
        cartItems = {
            [items.tag]: items
        }
    }
    localStorage.setItem("itemsInCart", JSON.stringify(cartItems));
}

const totalCost = (items) => {
    console.log("the product price is", items.price)

    let itemsCost = localStorage.getItem("totalCost");

    if (itemsCost != null) {
        itemsCost = parseInt(itemsCost);
        itemsCost += items.price;
        localStorage.setItem("totalCost", itemsCost);
    } else {
        localStorage.setItem("totalCost", items.price);
        itemsCost = items.price

    }
    console.log("My itemsCost is", itemsCost);
    console.log(typeof itemsCost);
}

const displayCart = () => {
    let cartItems = localStorage.getItem("itemsInCart")
    cartItems = JSON.parse(cartItems)
    let itemContainerShopWindow = document.querySelector('.itemsDisplayShopWindow')
    if (cartItems && shopWindow) {
        itemContainerShopWindow.innerHTML = '';
        Object.values(cartItems).map(items => {
            shopWindow.innerHTML += `
            <div class="itemDisplayed">
                <ion-icon name="trash-outline"></ion-icon>
                <img src="./images/shop/${items.tag}">
                <span>${items.name}</span>
            </div>
            
            `
        })
    }
}
displayCart()
onLoadItemNumbers()



