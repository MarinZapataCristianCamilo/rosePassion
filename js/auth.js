// =============================
// VERIFICAR SESIÓN DE ADMINISTRADOR
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const usuarioActivo = localStorage.getItem("usuarioActivo");

  // Solo permitir acceso al usuario admin
  if (usuarioActivo !== "admin") {
    alert("Acceso restringido. Solo el administrador puede entrar aquí.");
    window.location.href = "../index.html";
    return;
  }

  // Botón para cerrar sesión
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("usuarioActivo");
      alert("Sesión cerrada correctamente.");
      window.location.href = "../index.html";
    });
  }
});

