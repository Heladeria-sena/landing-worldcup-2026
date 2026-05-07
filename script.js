const cartBadge = document.querySelector('#cart-count');
const cartItemsWrapper = document.querySelector('#cart-items');
const cartTotalDisplay = document.querySelector('#cart-total');
const btnEmptyCart = document.querySelector('#btn-empty');
const btnBuy = document.querySelector('#btn-buy');
const addMotoForm = document.querySelector('#add-moto-form');
const productGrid = document.querySelector('#product-list');
const cartTrigger = document.querySelector('.cart-trigger');
const cartSidebar = document.querySelector('.cart-sidebar');

let carrito = [];

cartTrigger.addEventListener('click', () => {
    cartSidebar.classList.toggle('cart-visible');
    cartTrigger.classList.toggle('activo');
});

productGrid.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        const card = event.target.closest('.product-card');
        const titulo = card.querySelector('h3').textContent;
        const precioTexto = card.querySelector('.price').textContent;
        const imagen = card.querySelector('img').src;
        const precioNumero = parseFloat(precioTexto.replace('$', '').replace(',', ''));
        const motoSeleccionada = { titulo, precio: precioNumero, imagen };
        carrito.push(motoSeleccionada);
        actualizarCarritoDOM();
    }
});

function actualizarCarritoDOM() {
    cartBadge.textContent = carrito.length;

    if (carrito.length === 0) {
        cartItemsWrapper.innerHTML = '<p style="text-align:center; margin-top:20px;">El carrito está vacío.</p>';
        cartTotalDisplay.textContent = '0';
        return;
    }

    cartItemsWrapper.innerHTML = '';
    let total = 0;

    carrito.forEach((moto, index) => {
        total = total + moto.precio;
        const itemHTML = `
            <div class="cart-item">
                <img src="${moto.imagen}" alt="${moto.titulo}">
                <div class="item-info">
                    <h4>${moto.titulo}</h4>
                    <span class="item-price">$${moto.precio}</span>
                </div>
                <button class="btn-remove" data-index="${index}">❌</button>
            </div>
        `;
        cartItemsWrapper.insertAdjacentHTML('beforeend', itemHTML);
    });

    cartTotalDisplay.textContent = total;
}

cartItemsWrapper.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-remove')) {
        const index = event.target.getAttribute('data-index');
        carrito.splice(index, 1);
        actualizarCarritoDOM();
    }
});

btnEmptyCart.addEventListener('click', () => {
    carrito = [];
    actualizarCarritoDOM();
});

btnBuy.addEventListener('click', () => {
    if (carrito.length > 0) {
        alert('¡Compra realizada con éxito!');
        carrito = [];
        actualizarCarritoDOM();
    } else {
        alert('El carrito está vacío.');
    }
});

addMotoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nombre = document.querySelector('#moto-name').value;
    const precio = document.querySelector('#moto-price').value;
    const imagen = document.querySelector('#moto-img').value;

    const nuevaMotoHTML = `
        <div class="product-card">
            <img src="${imagen}" alt="${nombre}">
            <div class="card-body">
                <h3>${nombre}</h3>
                <p class="brand">Custom</p>
                <p class="price">$${precio}</p>
                <button class="btn-add add-to-cart">Agregar al carrito</button>
            </div>
        </div>
    `;
    productGrid.insertAdjacentHTML('afterbegin', nuevaMotoHTML);
    addMotoForm.reset();
    alert('Moto agregada: ' + nombre);
});

const diasEl = document.querySelector('#countdown-dias');
const horasEl = document.querySelector('#countdown-horas');
const minutosEl = document.querySelector('#countdown-minutos');
const segundosEl = document.querySelector('#countdown-segundos');

function updateCountdown() {
    const FECHA_OFERTA = new Date('2026-06-30T00:00:00');
    const now = new Date();
    const diff = FECHA_OFERTA - now;

    if (diff <= 0) {
        diasEl.textContent = '00';
        horasEl.textContent = '00';
        minutosEl.textContent = '00';
        segundosEl.textContent = '00';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    diasEl.textContent = days;
    horasEl.textContent = hours;
    minutosEl.textContent = minutes;
    segundosEl.textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);