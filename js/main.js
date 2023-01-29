const shop = document.getElementById('shop');
 
let basket = JSON.parse(localStorage.getItem("data1")) || [];

// ny array för att räkna antalet av varje produkt
let arr = JSON.parse(localStorage.getItem("data2")) || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

// localStorage.clear()

console.log(arr)
console.log(basket)

// Produktdatat finns i variabeln shopData (se data.js)


const generateShop = () => {
    // Generera alla produkter med dynamisk HTML och Array.protype.map() samt join()
    //
    // Använd denna markup för varje produktkort - den korresponderar mot CSS:en
    //
    // <div id=product-id-{--id--} class="item">
    //     <img width="220" src={--url--} alt="">
    //     <div class="details">
    //         <h3>{--title-}</h3>
    //         <p>{--desription--}</p>
    //         <div class="price-quantity">
    //         <h2>{--price-)-</h2>
    //         <div class="buttons">
    //             <i onclick="decrement({--id--})" class="bi bi-dash-lg"></i>
    //             <div id={--id--} class="quantity">
    //             </div>
    //             <div id={--id--} class="quantity">???</div>
    //             <i onclick="increment({--id--})" class="bi bi-plus-lg"></i>
    //         </div>
    //         </div>
    //     </div>
    // </div>
    
    // generera denna html för varje produkt i shopData
    const getHTMLString = (dataElement) => `
    <div id=${dataElement.id} class="item">
        <img width="220" src=${dataElement.image} alt="">
        <div class="details">
            <h3>${dataElement.title}</h3>
            <p>${dataElement.description}</p>
            <div class="price-quantity">
            <h2>${dataElement.price}</h2>
            <div class="buttons">
                <i onclick="decrement(${dataElement.id})" class="bi bi-dash-lg"></i>
                <div id=${dataElement.id} class="quantity"></div>
                <i onclick="increment(${dataElement.id})" class="bi bi-plus-lg"></i>
            </div>
            </div>
        </div>
    </div>
    `

    const shopHTMLStrings = shopData.map(getHTMLString);
    shop.innerHTML += shopHTMLStrings.join("");
}

generateShop()

// antal produkter i basket
document.querySelector('#cartAmount').innerHTML = basket.length

for (let i = 0; i < shopData.length; i++){
    document.querySelector(`.item:nth-child(${i + 1}) .quantity`).innerText = arr[i]
}

const increment = (id) => {
    // Om användaren klickar på + på produkten 

    // addera 1 på den produkt i arr som har detta id
    ++arr[id - 1]

    // uppdatera antalet i .quantity
    document.querySelector(`.item:nth-child(${id}) .quantity`).innerText = arr[id - 1];

    // lägg till 1 av denna produkt i basket
    basket.push(shopData[id - 1])

    console.log(arr)
    console.log(basket)

    localStorage.setItem('data1', JSON.stringify(basket))
    localStorage.setItem('data2', JSON.stringify(arr))

    // visa uppdaterade antalet produkter i basket
    document.querySelector('#cartAmount').innerHTML = basket.length
}

const decrement = (id) => {
    // Om användaren klickar på - på produkten 

    // ignorera koden ifall .quantity blir negativt
    if (arr[id - 1] > 0) {
        --arr[id - 1]

        document.querySelector(`.item:nth-child(${id}) .quantity`).innerText = arr[id - 1];

        // ta bort elem från array

        let index = -1
        for (let i = 0; i < basket.length; i++){
            if (basket[i].id == shopData[id - 1].id) {
                index = i;
                console.log(index);
                break;
            }
        }
        if (index > -1) { // bara om item hittats
            basket.splice(index, 1) // ta bort 1 item
        }

        console.log(arr)
        console.log(basket)

        localStorage.setItem('data1', JSON.stringify(basket))
        localStorage.setItem('data2', JSON.stringify(arr))

        // visa uppdaterade antalet produkter i basket
        document.querySelector('#cartAmount').innerHTML = basket.length
    }
}
