// =============================
// PANEL ADMINISTRATIVO - PRODUCTOS
// =============================

const listaProductos = document.getElementById("listaProductos");
const formNuevoProducto = document.getElementById("formNuevoProducto");

// Cargar productos guardados
function cargarProductos() {
  if (!listaProductos) return;

  listaProductos.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("productos")) || [];

  if (productos.length === 0) {
    listaProductos.innerHTML = "<p>No hay productos registrados.</p>";
    return;
  }

  productos.forEach((prod, index) => {
    const fila = document.createElement("div");
    fila.classList.add("fila-producto");
    fila.innerHTML = `
      <div><img src="${prod.imagen || '../img/producto_default.png'}" class="imgProd"></div>
      <div>${prod.nombre}</div>
      <div>${prod.marca}</div>
      <div>$${prod.precio}</div>
      <div>${prod.stock}</div>
      <div>
        <button class="btn btn-editar" onclick="editarProducto(${index})">Editar</button>
        <button class="btn btn-eliminar" onclick="eliminarProducto(${index})">Borrar</button>
      </div>
    `;
    listaProductos.appendChild(fila);
  });
}

// Agregar producto
if (formNuevoProducto) {
  formNuevoProducto.addEventListener("submit", (e) => {
    e.preventDefault();

    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const nuevo = {
      nombre: nombreProd.value.trim(),
      marca: marcaProd.value.trim(),
      precio: parseFloat(precioProd.value),
      stock: parseInt(stockProd.value),
      imagen: imgProd.value.trim() || "../img/producto_default.png"
    };

    productos.push(nuevo);
    localStorage.setItem("productos", JSON.stringify(productos));
    alert("Producto agregado con éxito.");
    formNuevoProducto.reset();
    cargarProductos();
  });
}

// Editar producto
function editarProducto(index) {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  const nuevoPrecio = prompt("Nuevo precio:", productos[index].precio);
  const nuevoStock = prompt("Nuevo stock:", productos[index].stock);

  if (nuevoPrecio !== null) productos[index].precio = parseFloat(nuevoPrecio);
  if (nuevoStock !== null) productos[index].stock = parseInt(nuevoStock);

  localStorage.setItem("productos", JSON.stringify(productos));
  alert("Producto actualizado.");
  cargarProductos();
}

// Eliminar producto
function eliminarProducto(index) {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

  productos.splice(index, 1);
  localStorage.setItem("productos", JSON.stringify(productos));
  alert("Producto eliminado.");
  cargarProductos();
}

// =============================
// PANEL ADMINISTRATIVO - USUARIOS
// =============================

const listaUsuarios = document.getElementById("listaUsuarios");

function cargarUsuarios() {
  if (!listaUsuarios) return;

  listaUsuarios.innerHTML = "";
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (usuarios.length === 0) {
    listaUsuarios.innerHTML = "<p>No hay usuarios registrados.</p>";
    return;
  }

  usuarios.forEach((user, index) => {
    const fila = document.createElement("div");
    fila.classList.add("fila-usuario");
    fila.innerHTML = `
      <div><img src="${user.imagen || '../img/user_default.png'}" class="img-user"></div>
      <div>${user.nombre}</div>
      <div>${user.password.replace(/./g, '*')}</div>
      <div><input type="text" id="nuevoNombre${index}" placeholder="Nuevo nombre"></div>
      <div><input type="password" id="nuevaContra${index}" placeholder="Nueva contraseña"></div>
      <div>
        <button class="btn btn-editar" onclick="editarUsuario(${index})">Editar</button>
        <button class="btn btn-eliminar" onclick="eliminarUsuario(${index})">Eliminar</button>
      </div>
    `;
    listaUsuarios.appendChild(fila);
  });
}

function editarUsuario(index) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const nuevoNombre = document.getElementById(`nuevoNombre${index}`).value.trim();
  const nuevaContra = document.getElementById(`nuevaContra${index}`).value.trim();

  if (nuevoNombre) usuarios[index].nombre = nuevoNombre;
  if (nuevaContra) usuarios[index].password = nuevaContra;

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Usuario actualizado.");
  cargarUsuarios();
}

function eliminarUsuario(index) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;

  usuarios.splice(index, 1);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Usuario eliminado.");
  cargarUsuarios();
}

// =============================
// NAVEGACIÓN ENTRE PANELES Y CERRAR SESIÓN
// =============================

document.addEventListener("DOMContentLoaded", () => {
  const btnUsuarios = document.getElementById("btnUsuarios");
  const btnProductos = document.getElementById("btnProductos");
  const logoutBtn = document.getElementById("logoutBtn");

  if (btnUsuarios) btnUsuarios.addEventListener("click", () => window.location.href = "./admin_usuarios.html");
  if (btnProductos) btnProductos.addEventListener("click", () => window.location.href = "./admin_productos.html");

  // ✅ Cerrar sesión corregido
  if (logoutBtn) logoutBtn.addEventListener("click", () => {
    alert("Sesión cerrada correctamente.");
    localStorage.removeItem("usuarioActivo");
    window.location.href = "../index.html";
  });
});

// =============================
// AUTO-CARGA SEGÚN PÁGINA
// =============================
document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
  cargarUsuarios();
});
