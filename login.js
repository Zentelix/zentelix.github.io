const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let valid = true;
  emailError.textContent = '';
  passwordError.textContent = '';

  if (!emailInput.value) {
    emailError.textContent = 'El correo es obligatorio.';
    valid = false;
  } else if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
    emailError.textContent = 'Formato de correo inválido.';
    valid = false;
  }

  if (!passwordInput.value) {
    passwordError.textContent = 'La contraseña es obligatoria.';
    valid = false;
  } else if (
    // Para fer@example.com permitimos mínimo 3 caracteres
    !(
      (emailInput.value === 'fer@example.com' && passwordInput.value.length >= 3) ||
      passwordInput.value.length >= 6
    )
  ) {
    passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres (3 para fer@example.com).';
    valid = false;
  }

  if (!valid) return;

  // Validación simple para demo - permitimos dos cuentas
  if (
    (emailInput.value === 'admin@zentelix.com' && passwordInput.value === '123456') ||
    (emailInput.value === 'fer@example.com' && passwordInput.value === '123')
  ) {
    alert('Login exitoso');
    window.location.href = 'dashboard.html';
  } else {
    alert('Usuario o contraseña incorrectos');
  }
});
