// Se ejecuta cuando se carga la ventana
window.addEventListener('load', () => {
  // Animación de introducción existente
  setTimeout(() => {
    document.getElementById('intro-animation').classList.add('fade-out');
  }, 3000); 

  setTimeout(() => {
    document.getElementById('intro-animation').style.display = 'none';
  }, 4000); 

  // Inicialización del swiper
  var swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      loop: false,
      coverflowEffect: {
        depth: 500,
        modifier: 1,
        slideShadows: true,
        rotate: 0,
        stretch: 0
      }
  });

  document.querySelectorAll('.btn-1').forEach((button, index) => {
    button.addEventListener('click', function() {
        let productContainer = this.closest('.swiper-slide');
        let productName = productContainer.querySelector('.product-txt h3').innerText;
        let productPrice = parseFloat(productContainer.querySelector('.product-txt span').innerText.replace('$', ''));
        let productId = 'product-' + (index + 1); // ID único para cada producto
        let products = JSON.parse(localStorage.getItem('products') || '{}');

        if (products[productId]) {
            products[productId].quantity += 1;
            products[productId].subtotal = products[productId].quantity * productPrice;
        } else {
            products[productId] = { name: productName, quantity: 1, price: productPrice, subtotal: productPrice };
        }

        localStorage.setItem('products', JSON.stringify(products));

        // Mostrar toast "Producto agregado"
        showToast('Producto agregado');
    });
});

function showToast(message) {
  Toastify({
      text: message,
      duration: 1500,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
          background: "linear-gradient(to right, #232323, #FFB900)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
      },
      offset: {
          x: "1.5rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
          y: "1.5rem" // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
      onClick: function(){} // Callback after click
  }).showToast();
}



  // Crear y configurar el botón Comprar
  let buyButton = document.createElement('button');
  buyButton.innerText = 'Carrito';
  buyButton.style.position = 'fixed';
  buyButton.style.right = '20px';
  buyButton.style.bottom = '20px';
  buyButton.style.zIndex = '1000';
  buyButton.onclick = function() {
      window.location.href = '/compra.html'; 
  };
  document.body.appendChild(buyButton);
});
