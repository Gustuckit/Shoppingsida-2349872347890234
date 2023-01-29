let shoppingCart = document.getElementById("shopping-cart")

let basket = JSON.parse(localStorage.getItem("data1")) || []

// ny array för att räkna antalet av varje produkt
let arr = JSON.parse(localStorage.getItem("data2")) || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

// localStorage.clear()

// sortera basket för att undvika dubletter i cart
let uniqueSet = [...new Map(basket.map((m) => [m.id, m])).values()];
console.log(uniqueSet);

console.log(arr)
console.log(basket)

// Produktdatat finns i variabeln shopData (se data.js)


const generateCartItems = () => {
    // Generera alla produkter med dynamisk HTML och Array.protype.map() samt join()
    //
    // Använd denna markup för varje produktkort - den korresponderar mot CSS:en
    //
    // <div class="cart-item">
    // <img width="100" src={--image--} alt="" />
    // <div class="details">
    //     <div class="title-price-x">
    //     <h4 class="title-price">
    //         <p>{--title--}</p>
    //         <p class="cart-item-price"> {--price--}</p>
    //     </h4>
    //     <i onclick="removeItem({--id--})" class="bi bi-x-lg"></i>
    //     </div>
    //     <div class="cart-buttons">
    //     <div class="buttons">
    //         <i onclick="decrement({--id--})" class="bi bi-dash-lg"></i>
    //         <div id={--id--} class="quantity">{--total--}</div>
    //         <i onclick="increment({--id--})" class="bi bi-plus-lg"></i>
    //     </div>
    //     </div>
    //     <h3> {--total * price--}</h3>
    // </div>
    // </div>

    const getHTMLString = (dataElement) => `
    <div class="cart-item">
        <img width="100" src=${dataElement.image} alt="" />
        <div class="details">
            <div class="title-price-x">
                <h4 class="title-price">
                    <p>${dataElement.title}</p>
                    <p class="cart-item-price">${dataElement.price}</p>
                </h4>
                <i onclick="removeItem(${dataElement.id})" class="bi bi-x-lg"></i>
            </div>
            <div class="cart-buttons">
                <div class="buttons">
                    <i onclick="decrement(${dataElement.id})" class="bi bi-dash-lg"></i>
                    <div id=${dataElement.id} class="quantity"></div>
                    <i onclick="increment(${dataElement.id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
            <h3 class="totalCost"></h3>
        </div>
    </div>
    `

    /* const cartHTMLStrings = shopData.map(getHTMLString);
    shoppingCart.innerHTML += cartHTMLStrings.join(""); */

    let cartHTMLStrings = uniqueSet.map(getHTMLString);
    shoppingCart.innerHTML += cartHTMLStrings.join("");

    for (let i = 0; i < uniqueSet.length; ++i) {
        document.querySelectorAll('.quantity')[i].innerText = arr[uniqueSet[i].id - 1];
        document.querySelectorAll('.totalCost')[i].innerText = uniqueSet[i].price * arr[uniqueSet[i].id - 1];
    }
}

generateCartItems();

// antal produkter i basket
document.querySelector('#cartAmount').innerHTML = basket.length


const increment = (id) => {
    // Om användaren klickar på + på produkten 

    // addera 1 på den produkt i arr som har detta id
    ++arr[id-1];

    console.log(id);

    // uppdatera innerHTML för .quantity och .totalcost enligt uppdatera arr
    for(let i = 0; i < uniqueSet.length; i++) {
        if (uniqueSet[i].id == id) {
            document.querySelectorAll(`.quantity`)[i].innerHTML = arr[id - 1];
            document.querySelectorAll(`.totalCost`)[i].innerHTML = uniqueSet[i].price * arr[uniqueSet[i].id - 1];
        }
    }

    // pusha den produkt från shopData som har det registrerade id:t till basket
    basket.push(shopData[id - 1]);

    console.log(arr)
    console.log(basket)

    localStorage.setItem('data1', JSON.stringify(basket))
    localStorage.setItem('data2', JSON.stringify(arr))

    // visa uppdaterade antalet produkter i basket
    document.querySelector('#cartAmount').innerHTML = basket.length;
}

const decrement = (id) => {
    // Om användaren klickar på - på produkten 

    // ignorera koden ifall .quantity blir negativt
    if (arr[id - 1] > 0) {
        --arr[id - 1];

        // uppdatera innerHTML för .quantity och .totalCost enligt uppdaterade arr
        for (let i = 0; i < uniqueSet.length; i++) {
            if (uniqueSet[i].id == id) {
                document.querySelectorAll(`.quantity`)[i].innerHTML = arr[id - 1];
                document.querySelectorAll(`.totalCost`)[i].innerHTML = uniqueSet[i].price * arr[uniqueSet[i].id - 1];
            }
        }
    }

    // ta bort elem från array

    let index = -1;
    for (let i = 0; i < basket.length; i++) {
        if (basket[i].id == shopData[id - 1].id) {
            index = i;
            console.log(index);
            break;
        }
    }
    if (index > -1) { // bara om item hittats
        basket.splice(index, 1); // ta bort 1 item
    }

    console.log(arr)
    console.log(basket)
    localStorage.setItem('data1', JSON.stringify(basket))
    localStorage.setItem('data2', JSON.stringify(arr))

    // visa uppdaterade antalet produkter i basket
    document.querySelector('#cartAmount').innerHTML = basket.length;
}