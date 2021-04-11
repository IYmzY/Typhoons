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

const cartNumbers = (item, event) => {
    let itemNumbers = localStorage.getItem('cartNumbers');

    itemNumbers = parseInt(itemNumbers)
    let cartItems = localStorage.getItem('itemsInCart');
    cartItems = JSON.parse(cartItems)

    if (event == "decrease") {
        localStorage.setItem('cartNumbers', itemNumbers - 1)
        document.querySelector('.itemNumbers span').textContent = itemNumbers - 1;
    } else if (itemNumbers) {
        localStorage.setItem("cartNumbers", itemNumbers + 1)
        document.querySelector('.itemNumbers span').textContent = itemNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.itemNumbers span').textContent = 1
    }


    /*if (itemNumbers) {
        localStorage.setItem('cartNumbers', itemNumbers + 1);
        document.querySelector('.itemNumbers span').textContent = itemNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.itemNumbers span').textContent = 1;
    }*/
    setItems(item)

}

const setItems = (item) => {
    let cartItems = localStorage.getItem('itemsInCart');
    cartItems = JSON.parse(cartItems)
    if (cartItems != null) {
        if (cartItems[item.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [item.tag]: item
            }
        }
        cartItems[item.tag].inCart += 1;
    } else {
        item.inCart = 1;
        cartItems = {
            [item.tag]: item
        }
    }
    localStorage.setItem("itemsInCart", JSON.stringify(cartItems));
}

const totalCost = (item, event) => {
    console.log("the product price is", item.price)

    let itemsCost = localStorage.getItem("totalCost");
    if (event == "decrease") {
        itemsCost = parseInt(itemsCost);
        localStorage.setItem('totalCost', itemsCost - item.price)
    } else if (itemsCost != null) {
        itemsCost = parseInt(itemsCost);
        itemsCost += item.price;
        localStorage.setItem("totalCost", itemsCost);
    } else {
        localStorage.setItem("totalCost", item.price);
        itemsCost = item.price

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
                  <ion-icon name="caret-back-outline" class="decreaseNumberOfItemInCart"></ion-icon>
                  <span>${item.inCart}</span>
                  <ion-icon name="caret-forward-outline" class="increaseNumberOfItemInCart"></ion-icon>
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
    handleQuantity();
}

const deleteItems = () => {
    let deleteItem = document.querySelectorAll(".itemDisplayedTitle ion-icon");
    let itemName;
    let itemNumbers = localStorage.getItem('cartNumbers');
    let cartItems = localStorage.getItem('itemsInCart')
    cartItems = JSON.parse(cartItems)
    let cartCost = localStorage.getItem('totalCost')


    for (let y = 0; y < deleteItem.length; y++) {
        deleteItem[y].addEventListener('click', () => {
            itemName = deleteItem[y].parentElement.textContent.trim().toUpperCase().replace(/ /g, '');
            localStorage.setItem('cartNumbers', itemNumbers - cartItems[itemName].inCart);
            localStorage.setItem('totalCost', cartCost - (cartItems[itemName].price * cartItems[itemName].inCart));
            items[y].inCart = 0
            delete cartItems[itemName];
            localStorage.setItem('itemsInCart', JSON.stringify(cartItems))
            displayCart();
            onLoadItemNumbers();
        })
    }

}

const handleQuantity = () => {

    let decreaseButtons = document.querySelectorAll('.decreaseNumberOfItemInCart')
    let increaseButtons = document.querySelectorAll('.increaseNumberOfItemInCart')
    let cartItems = localStorage.getItem('itemsInCart')
    let currentQuantity = 0
    let currentItem = ''
    cartItems = JSON.parse(cartItems);

    for (let y = 0; y < decreaseButtons.length; y++) {
        decreaseButtons[y].addEventListener('click', () => {
            currentQuantity = decreaseButtons[y].parentElement.querySelector('span').textContent;
            //console.log(currentQuantity)
            currentItem = decreaseButtons[y].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toUpperCase().replace(/ /g, '');
            console.log(currentItem)
            if (cartItems[currentItem].inCart > 1) {
                cartItems[currentItem].inCart -= 1;
                cartNumbers(cartItems[currentItem], "decrease");
                totalCost(cartItems[currentItem], "decrease");
                localStorage.setItem('itemsInCart', JSON.stringify(cartItems))
                displayCart();
            }
        })

    }
    for (let y = 0; y < increaseButtons.length; y++) {
        increaseButtons[y].addEventListener('click', () => {
            currentQuantity = increaseButtons[y].parentElement.querySelector('span').textContent;
            console.log(currentQuantity)
            currentItem = increaseButtons[y].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toUpperCase().replace(/ /g, '');
            console.log(currentItem)
            cartItems[currentItem].inCart += 1;
            cartNumbers(cartItems[currentItem]);
            totalCost(cartItems[currentItem]);
            localStorage.setItem('itemsInCart', JSON.stringify(cartItems))
            displayCart();
        })
    }
}

onLoadItemNumbers();
displayCart();



