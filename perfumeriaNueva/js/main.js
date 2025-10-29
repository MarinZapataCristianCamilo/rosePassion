// =============================
// REGISTRO DE NUEVOS USUARIOS
// =============================
document.getElementById("registroForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const nuevoUsuario = document.getElementById("nuevoUsuario").value.trim();
  const nuevaContraseña = document.getElementById("nuevaContraseña").value.trim();

  if (!nuevoUsuario || !nuevaContraseña) {
    document.getElementById("mensajeRegistro").textContent = "Completa todos los campos.";
    return;
  }

  // Guardado individual (para compatibilidad con login actual)
  localStorage.setItem("user_" + nuevoUsuario, nuevaContraseña);

  // Guardado dentro de un arreglo global de usuarios (para panel admin)
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verificar si ya existe
  if (usuarios.some((u) => u.nombre === nuevoUsuario)) {
    document.getElementById("mensajeRegistro").textContent = "El usuario ya existe.";
    return;
  }

  usuarios.push({
    nombre: nuevoUsuario,
    password: nuevaContraseña,
    imagen: "../img/user_default.png"
  });

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  document.getElementById("mensajeRegistro").textContent = "Usuario registrado correctamente.";
  e.target.reset();
});


// =============================
// LOGIN
// =============================
document.getElementById("loginForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = document.getElementById("usuario").value.trim();
  const pass = document.getElementById("contraseña").value.trim();

  const storedPass = localStorage.getItem("user_" + user);

  if (storedPass && storedPass === pass) {
    localStorage.setItem("usuarioActivo", user);
    document.getElementById("mensajeLogin").textContent = "Inicio de sesión exitoso.";

    setTimeout(() => {
      if (user === "admin") {
        window.location.href = "admin/admin_productos.html";
      } else {
        window.location.href = "index.html";
      }
    }, 1000);
  } else {
    document.getElementById("mensajeLogin").textContent = "Usuario o contraseña incorrectos.";
  }
});


// =============================
// CARRUSEL AUTOMÁTICO
// =============================
let currentIndex = 0;

function showSlide(index) {
  const slides = document.querySelector(".slides");
  const total = document.querySelectorAll(".slide").length;
  if (!slides || total === 0) return;
  currentIndex = (index + total) % total;
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

document.querySelector(".next")?.addEventListener("click", () => showSlide(currentIndex + 1));
document.querySelector(".prev")?.addEventListener("click", () => showSlide(currentIndex - 1));

setInterval(() => showSlide(currentIndex + 1), 5000);


// =============================
// GESTIÓN DE SESIÓN GLOBAL
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const usuarioActivo = localStorage.getItem("usuarioActivo");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (usuarioActivo) {
    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-block";
  } else {
    if (loginBtn) loginBtn.style.display = "inline-block";
    if (logoutBtn) logoutBtn.style.display = "none";
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("usuarioActivo");
      alert("Sesión cerrada correctamente.");
      window.location.href = "index.html";
    });
  }
  if (!localStorage.getItem("user_admin")) {
  localStorage.setItem("user_admin", "567");
}

});
