// =============================
// CARRITO DE COMPRAS
// =============================

// Cargar carrito desde localStorage o iniciar vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Agregar producto al carrito desde botones con clase "agregar-carrito"
document.querySelectorAll(".agregar-carrito").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-id");
    const nombre = btn.getAttribute("data-nombre");
    const precio = parseFloat(btn.getAttribute("data-precio"));

    agregarAlCarrito(id, nombre, precio);
  });
});

function agregarAlCarrito(id, nombre, precio) {
  const productoExistente = carrito.find((p) => p.id === id);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ id, nombre, precio, cantidad: 1 });
  }

  guardarCarrito();
  actualizarCarrito();
}

// Guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Actualizar la tabla del carrito (solo si existe la tabla en la página actual)
function actualizarCarrito() {
  const tablaBody = document.querySelector("#tablaCarrito tbody");
  const totalCarrito = document.getElementById("totalCarrito");

  if (!tablaBody || !totalCarrito) return; // si no estamos en carrito.html, salir

  tablaBody.innerHTML = "";

  let total = 0;
  carrito.forEach((producto, index) => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${producto.precio.toLocaleString()}</td>
      <td>
        <button class="cantidad-btn restar" data-index="${index}">-</button>
        ${producto.cantidad}
        <button class="cantidad-btn sumar" data-index="${index}">+</button>
      </td>
      <td>$${subtotal.toLocaleString()}</td>
      <td><button class="eliminar-btn" data-index="${index}">🗑️</button></td>
    `;
    tablaBody.appendChild(fila);
  });

  totalCarrito.textContent = `$${total.toLocaleString()}`;
  guardarCarrito();

  // Eventos para aumentar o disminuir cantidad
  document.querySelectorAll(".sumar").forEach((btn) => {
    btn.addEventListener("click", () => cambiarCantidad(btn.dataset.index, 1));
  });
  document.querySelectorAll(".restar").forEach((btn) => {
    btn.addEventListener("click", () => cambiarCantidad(btn.dataset.index, -1));
  });

  // Evento para eliminar un producto
  document.querySelectorAll(".eliminar-btn").forEach((btn) => {
    btn.addEventListener("click", () => eliminarProducto(btn.dataset.index));
  });
}

function cambiarCantidad(index, cambio) {
  carrito[index].cantidad += cambio;
  if (carrito[index].cantidad <= 0) carrito.splice(index, 1);
  guardarCarrito();
  actualizarCarrito();
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  actualizarCarrito();
}

// Botón para vaciar todo el carrito
document.getElementById("vaciarCarrito")?.addEventListener("click", () => {
  if (confirm("¿Deseas vaciar todo el carrito?")) {
    carrito = [];
    guardarCarrito();
    actualizarCarrito();
  }
});

// Botón "Finalizar compra"
document.getElementById("checkoutBtn")?.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  alert("Gracias por tu compra. Tu pedido ha sido procesado.");
  carrito = [];
  guardarCarrito();
  actualizarCarrito();
});

// Mostrar el carrito si estamos en carrito.html
document.addEventListener("DOMContentLoaded", actualizarCarrito);
