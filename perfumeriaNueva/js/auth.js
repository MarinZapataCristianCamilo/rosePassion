// LOGIN
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = document.getElementById('usuario').value;
  const pass = document.getElementById('contraseña').value;

  const storedUser = localStorage.getItem('user_' + user);
  if (storedUser && storedUser === pass) {
    localStorage.setItem('usuario', user);
    document.getElementById('mensajeLogin').textContent = 'Inicio exitoso ✅';
    setTimeout(() => window.location.href = 'index.html', 1000);
  } else {
    document.getElementById('mensajeLogin').textContent = 'Usuario o contraseña incorrectos ❌';
  }
});

// REGISTRO
document.getElementById('registroForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = document.getElementById('nuevoUsuario').value;
  const pass = document.getElementById('nuevaContraseña').value;

  if (localStorage.getItem('user_' + user)) {
    document.getElementById('mensajeRegistro').textContent = 'El usuario ya existe';
  } else {
    localStorage.setItem('user_' + user, pass);
    document.getElementById('mensajeRegistro').textContent = 'Cuenta creada ✅';
  }
});

