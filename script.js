// Elementos do DOM
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitButton = loginForm.querySelector('button[type="submit"]');
const toast = document.getElementById('toast');

// Função para mostrar mensagens toast
function showToast(message, isError = false) {
  toast.textContent = message;
  toast.style.backgroundColor = isError ? '#dc2626' : '#16a34a';
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Função para fazer login
async function handleLogin(e) {
  e.preventDefault();
  
  const email = emailInput.value;
  const password = passwordInput.value;
  
  // Desabilita o botão durante o login
  submitButton.disabled = true;
  submitButton.textContent = 'Entrando...';
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    if (data.user) {
      showToast('Login realizado com sucesso!');
      // Redireciona para pagina_inicial.html após 1 segundo
      setTimeout(() => {
        window.location.href = 'pagina_inicial.html';
      }, 1000);
    }
  } catch (error) {
    showToast(error.message || 'Erro ao fazer login', true);
    submitButton.disabled = false;
    submitButton.textContent = 'Entrar';
  }
}

// Event listeners
loginForm.addEventListener('submit', handleLogin);

// Verifica se já existe uma sessão ativa
async function checkSession() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    window.location.href = 'udson.html';
  }
}

// Verifica a sessão ao carregar a página
checkSession();
