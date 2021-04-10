let shop = document.querySelector('.cartShopCart')
let shopWindow = document.querySelector('.shopWindow')
let closeShop = document.querySelector('.closeShopWindow')
let cart = document.querySelectorAll('.cartSelector')

shop.addEventListener("click", () => {
    shopWindow.style.display = "block"
    console.log('i am triggered ahahaha');

})

closeShop.addEventListener("click", () => {
    shopWindow.style.display = "none";
})


let items = [
    {
        name: "CD ALBUM",
        price: 10,
        tag: "CDALBUM",
        inCart: 0,
    },
    {
        name: "CD ALBUM & Tshirt",
        tag: "CDALBUM&TSHIRT",
        price: 30,
        inCart: 0,
    },
    {
        name: "Typhoons Tshirt",
        tag: "TYPHOONSTSHIRT",
        price: 25,
        inCart: 0,
    },
    {
        name: "Typhoons CAP",
        tag: "TYPHOONSCAP",
        price: 15,
        inCart: 0,
    },
    {
        name: "Royal blood Tshirt",
        tag: "ROYALBLOODTSHIRT",
        price: 20,
        inCart: 0,
    }
]

for (let y = 0; y < cart.length; y++) {
    cart[y].addEventListener('click', () => {
        cartNumbers(items[y])
        totalCost(items[y])
        displayCart()
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
    let itemsCost = localStorage.getItem("totalCost");
    if (cartItems && shopWindow) {
        itemContainerShopWindow.innerHTML = ``
        Object.values(cartItems).map(item => {
            itemContainerShopWindow.innerHTML += `
            <div class="itemDisplayed">
             <div class="itemDisplayedTitle">
                <ion-icon name="trash-outline"></ion-icon>
                <img src="./images/shop/${item.tag}.png">
                <span>${item.name}</span>
              </div>
              <div class="itemPriceShopWindowDisplayed">€${item.price}</div>
              <div class="quantityShopWindowDisplayed">
                  <ion-icon name="caret-back-outline"></ion-icon>
                  <span>${item.inCart}</span>
                  <ion-icon name="caret-forward-outline"></ion-icon>
              </div>
              <div class="totalPriceShopWindowDisplayed"> €${item.inCart * item.price},00</div>       
            </div>
            `;
        })
        itemContainerShopWindow.innerHTML += `
        <div class="TotalPriceDisplayedContainer">
        <h2>  TOTAL :<h2> 
        <h2> €${itemsCost},00 <h2>
        </div>
        `
    }
    deleteItems()
}

const deleteItems = () => {
    let deleteItem = document.querySelectorAll(".itemDisplayed ion-icon");
    let itemName;
    let itemNumbers = localStorage.getItem('cartNumbers');
    let cartItems = localStorage.getItem('itemsInCart')
    let cartCost = localStorage.getItem('totalCost')
    cartItems = JSON.parse(cartItems)
    console.log(cartItems)


    for (let y = 0; y < deleteItem.length; y++) {
        deleteItem[y].addEventListener('click', () => {
            itemName = deleteItem[y].parentElement.textContent.trim().toUpperCase().replace(/ /g, '');
            localStorage.setItem('cartNumbers', itemNumbers - cartItems[itemName].inCart);
            localStorage.setItem('totalCost', cartCost - (cartItems[itemName].price * cartItems[itemName].inCart));
            delete cartItems[itemName];
            localStorage.setItem('itemsInCart', JSON.stringify(cartItems))
            displayCart();
            onLoadItemNumbers();
        })
    }

}

onLoadItemNumbers()
displayCart()



