//to make drop down menu
$(function menuOne() {

    $("#dropDown").hover(function () { //this function slides down the items in the catalogue part of the nav bar

        $(".item1").slideDown("slow"),
            $(".item2").slideDown("slow"),
            $(".item3").slideDown("slow"),
            $(".item4").slideDown("slow");

    });
});



//cartItems of cats for sale

function catDetails(catName, tag, price, inCart) { //declare each variable that will be used as a value

    this.catName = catName; //use this. property to store each variable to a property
    this.tag = tag;
    this.price = price;
    this.inCart = inCart;

};

let bengal = new catDetails(
    "Bengal Cat",
    "bengal-cat",
    40,
    0

);


let maincoon = new catDetails(
    "Maincoon Cat",
    "Maincoon",
    30,
    0
);

let persian = new catDetails(
    "Persian Cat",
    "persian",
    20,
    0


);

let ragdoll = new catDetails(
    "Ragdoll Cat",
    "ragdoll",
    50,
    0
);


const cartItems = [bengal, maincoon, persian, ragdoll]; //this is the objects that i have created in the above data



let carts = document.querySelectorAll('.catButton'); //here we are declaring the add to cart buttons as a variable


//add to cart function
for (let i = 0; i < carts.length; i++) {

    carts[i].addEventListener('click', function () { //this is the for loop that increasing the amount of times the cart button is clicked on and uses that value in the cartNumbers function

        addingItemToMyCart(cartItems[i]); //this is the function for adding to cart
        totalCost(cartItems[i]) //this is the function for calculating total cost of items in cart


    })
};


function onLoadCart() { //this function checks if there are any stored values in the cat numbers variable upon loading the page
    let amountOfCatsInCart = localStorage.getItem('addingItemToMyCart');
    if (amountOfCatsInCart) { //if there is a value it displays that value in the number value next to the cart icon
        document.querySelector('.cart span').textContent = amountOfCatsInCart; //this linked the value of product numbers to the cart number
    }
}

//this converts the cartItems data in my cartItems product to a string




function addingItemToMyCart(product) {
    let amountOfCatsInCart = localStorage.getItem('addingItemToMyCart'); //this is saving the value of the function addingItemToMyCart to my local storage
    amountOfCatsInCart = parseInt(amountOfCatsInCart); //this converts the string into a number
    if (amountOfCatsInCart) { //this if statement displays an alert if there are any items in the cart already 
        localStorage.setItem('addingItemToMyCart', amountOfCatsInCart + 1);
        alert(`There are ${amountOfCatsInCart + 1} cat(s) in your cart`);
        document.querySelector('.cart span').textContent = amountOfCatsInCart + 1;


    } else {

        localStorage.setItem('addingItemToMyCart', 1);
        alert(`There is 1 cat in your cart`); //this displays an alert if there is only 1 item in the cart
        document.querySelector('.cart span').textContent = 1;

    }
    storeItems(product) //this stores the values into product to be used in the function storeItems

};
//this function stores the items in the cart and converts it to a string
function storeItems(product) {

    let cartObjects = localStorage.getItem('productsInCart');
    cartObjects = JSON.parse(cartObjects);

    if (cartObjects != null) {

        if (cartObjects[product.tag] == undefined) {

            cartObjects = {

                ...cartObjects,
                [product.tag]: product
            }

        }
        cartObjects[product.tag].inCart += 1;
    } else {

        product.inCart = 1;
        cartObjects = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartObjects));

}

//this calculates the total cost of the cart which is all the items in the cart
function totalCost(priceOfCats) {

    let totalPriceOfCart = localStorage.getItem('totalCost');



    if (totalPriceOfCart != null) {
        totalPriceOfCart = parseInt(totalPriceOfCart);

        localStorage.setItem("totalCost", totalPriceOfCart + priceOfCats.price)

    } else {
        totalPriceOfCart = parseInt(totalPriceOfCart);
        localStorage.setItem("totalCost", priceOfCats.price)


    }

  

}
//this then displays the items in the cart along with price
function displayCart() {
    let totalPriceOfCart = localStorage.getItem('totalCost');
    let cartObjects = localStorage.getItem("productsInCart");
    cartObjects = JSON.parse(cartObjects);

    let catContainer = document.querySelector(".products");
    console.log(cartObjects);



    if (cartObjects && catContainer) {



        catContainer.innerHTML = '';

        Object.values(cartObjects).map(item => {
            let totalInCart = ((item.inCart * item.price));
            catContainer.innerHTML += `
            <div class="product">
                <i class="fas fa-cat"></i>
                <span class="product-title">${item.catName} X ${item.inCart}
                </span>
            
            <div class="price">R${item.price},00
            </div>

            <div class="total">
            R${totalInCart},00
            </div>
            </div>
            `



        });
        //this is the final total in the cart
        
        vatAmount = Math.round(totalPriceOfCart*0.14)
        finalTotal = Number(totalPriceOfCart) + Number(vatAmount);
        
        catContainer.innerHTML += `
        
        <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">
            Basket Total = R${finalTotal},00
        `

        localStorage.setItem("totalCost", finalTotal);



    }
};

//this function clears the entire cart and remmoves everything from the local storage
function removeItem() {
    window.localStorage.clear()
    window.location.reload();
}

function calculateDiscount() {

    let minusFrom = localStorage.getItem("totalCost");
    let discountCode = document.getElementById("discountCode").value
    
    if(discountCode === "CATSBEST" || discountCode === "catsbest"){

    let discountAmount = 20;
    
    let finalAmountToPay = (Number(minusFrom) - Number(discountAmount));

    localStorage.setItem("totalCost", finalAmountToPay);


    alert(`Congrats! You qualify for a discount,your new total is ${Number(finalAmountToPay)}`);
    }
    else{

        alert("That is the incorrect discount code, please try again");
    }

    window.location.reload();
};

//this is the function for delivery option 1 which is 2 day delivery
function calculateDelivery_1() {

    let deliveryFee1 = Number(150);
    let finalTotal = localStorage.getItem('totalCost');
    alert("your cost is " + `R${Number(finalTotal) + Number(deliveryFee1)}`);
    localStorage.setItem("totalPriceOfCart", Number(finalTotal) + Number(deliveryFee1))
};

//this is the function for delivery option 2 which is overnight delivery
function calculateDelivery_2() {

    let deliveryFee2 = Number(250);
    let finalTotal = localStorage.getItem('totalCost');
    alert("your cost is " + `R${Number(finalTotal) + Number(deliveryFee2)}`);
    localStorage.setItem("totalPriceOfCart", Number(finalTotal) + Number(deliveryFee2))
};


//this is the function for delivery option 0 which is collection

function calculateDelivery_0() {

    let finalTotal = localStorage.getItem('totalCost');
    alert(` your cost is R${Number(finalTotal)} and delivery is free`);
    localStorage.setItem("totalPriceOfCart", Number(finalTotal))
};

//this is the function for the discount being applied

//this generates a random number which is used as a reference

function generateRef() {

    let ref = Date.now()
    alert(`Your order has been placed, please  write down your unique reference number ${ref}`);
}

onLoadCart();
displayCart();

