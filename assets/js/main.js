
const container = document.querySelector('.container')

let i = 0;
let sum_of_product = 0
my_product = JSON.parse(localStorage.getItem("my_product"))
if (my_product == null) {
    my_product = []

} else {
    my_product = JSON.parse(localStorage.getItem("my_product"))
}

products.forEach(element => {
    element.price = element.price.toFixed(2)

    if (element.discount <= 0) {
        container.innerHTML +=

            `<div class="card">
      
        <img src=${element.image} alt="">
            <p class="description">${element.title}</p>
            <div class="price_container">
                <p>$${element.price}</p>
            
              

            </div>
            <p class="first_add">Added successfully ✅</p>
            <p class="add_before">you added this item before!</p>
            <button onclick="add_product(${element.id})">Add to card</button>
    </div>`

    } else {

        let new_price = element.price - (element.price * element.discount) / 100
        new_price = new_price.toFixed(2)
        container.innerHTML +=
            `<div class="card">
        <div class="discount">$${element.discount} OFF</div>
        <img src=${element.image} alt="">
            <p class="description">${element.title}</p>
            <div class="price_container">
                <p>$${new_price}</p>
                <p>$${element.price}</p>
             
            </div>
            <p class="first_add">Added successfully ✅ </p>
            <p class="add_before">you added this item before!</p>
            <button onclick="add_product(${element.id})">Add to card</button>
    </div>`}
});


const my_cart = document.getElementById('my_cart')
const my_cart_notification = document.querySelector('#my_cart div')
const overlay = document.querySelector('.overlay')
const popup = document.querySelector('.pop_up')
const popup_body = document.querySelector('.pop_up_body')

const add_before = document.querySelectorAll('.add_before')
const first_add = document.querySelectorAll('.first_add')
const total_price = document.getElementById('total_price')



notification_number = localStorage.getItem("notification_number")
if (notification_number == null) {
    notification_number = 0
} else {
    notification_number = parseInt(notification_number)
}
my_cart_notification.innerHTML = `${notification_number}`

const add_product = (id) => {
    product = products.find(p => p.id == id);

    products.forEach(
        p => {
            first_add[p.id].style.display = 'none';
            add_before[p.id].style.display = 'none';
        }
    )

    my_product = JSON.parse(localStorage.getItem("my_product")) ? my_product : []

    if (!my_product.includes(product)) {

        my_product.push(product)

        notification_number++
        my_cart_notification.innerHTML = `${notification_number}`
        localStorage.setItem("notification_number", JSON.stringify(notification_number));
        localStorage.setItem("my_product", JSON.stringify(my_product));
        first_add[product.id].style.display = "block"
        setTimeout(function () {
            first_add[product.id].style.display = 'none';
        }, 3000);

    } else {

        first_add[product.id].style.display = "none"
        add_before[product.id].style.display = " block"
        setTimeout(function () {
            add_before[product.id].style.display = 'none';
        }, 3000);

        // console.log(my_product)
    }




}





my_cart.addEventListener('click', (event) => {


    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const popupHeight = popup.offsetHeight;


    popup.style.top = `${scrollY + (viewportHeight - popupHeight - 180) / 2}px`
    overlay.style.display = "flex"
    show_product_cart()


})


const show_product_cart = () => {
    sum_of_product = 0;

    popup_body.innerHTML = ""
    my_product = JSON.parse(localStorage.getItem("my_product")) ? my_product : []

    my_product.forEach(product => {
        if (product.discount <= 0) {

            sum_of_product += parseInt(product.price)
            total_price.innerHTML = `<span><span>Total : </span>$ ${sum_of_product} </span>`

            popup_body.innerHTML +=

                `<div class="pop_up_con">
                <img src=${product.image} alt="">
                <p>${product.title}</p>
                <p>$${product.price}</p>
                <i onclick="delete_product(${product.id})" class="fa-solid fa-trash"></i>
            </div>`}
        else {

            let new_price = product.price - (product.price * product.discount) / 100
            new_price = new_price.toFixed(2)

            sum_of_product += parseInt(new_price)
            total_price.innerHTML = `<span><span>Total : </span>$ ${sum_of_product} </span>`

            popup_body.innerHTML +=

                `<div class="pop_up_con">
    <img src=${product.image} alt="">
    <p>${product.title}</p>
    <p>$${new_price}</p>
    <i onclick="delete_product(${product.id})" class="fa-solid fa-trash"></i>
    </div>`
        }
    })

}








const delete_button = document.querySelectorAll(".pop_up_con i")


const delete_product = (id) => {
    my_product = JSON.parse(localStorage.getItem("my_product"))
    product = my_product.find(p => p.id == id);
    my_product = my_product.filter(item => item !== product);
    localStorage.setItem("my_product", JSON.stringify(my_product));
    notification_number--;

    my_cart_notification.innerHTML = `${notification_number}`
    localStorage.setItem("notification_number", JSON.stringify(notification_number))


    show_product_cart()

    if (my_product.length == 0) {
        sum_of_product = 0
        total_price.innerHTML = `<span><span>Total : </span>$ ${sum_of_product} </span>`
    }

}
popup.addEventListener('click', (event) => {
    event.stopPropagation();


});
overlay.addEventListener('click', (e) => {
    if (!popup.contains(e.target)) {
        overlay.style.display = 'none'

    }

})

search_input = document.getElementById('search_input')
const cards = document.querySelectorAll('.card')
search_input.addEventListener('input', (e) => {

    products.forEach(product => {
        product.title = product.title.toLowerCase()
        if (product.title.includes(search_input.value.toLowerCase())) {

            cards[product.id].style.display = "flex"
        } else {

            cards[product.id].style.display = "none"
        }

    })
})
filter_button = document.querySelector('.filter_button')

filter_button.innerHTML = "filter discounted products"
let filter = true
filter_button.addEventListener('click', () => {
    if (filter) {
        products.forEach(product => {
            if (product.discount > 0) {
                cards[product.id].style.display = "flex"
            } else {
                cards[product.id].style.display = "none"
            }
        })
        filter_button.innerHTML = "show all products"
        filter = false
    } else {
        cards.forEach(c => {
            c.style.display = "flex"
        })
        filter = true
        filter_button.innerHTML = "filter discounted products"
    }
})
