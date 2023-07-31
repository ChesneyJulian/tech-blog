const loginForm = document.querySelector('#login-form');
const signupForm = document.querySelector('#signup-form');

const handleLogin = async (event) => {

  event.preventDefault();

  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();
  console.log('USERNAME ', username);
  console.log('PASSWORD ', password);
  if (username && password) {
    const response = await fetch ('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Login failed.');
    }
  }
};

const handleSignup = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#signup-username').value.trim();
  const password = document.querySelector('#signup-password').value.trim();

  if (username && password) {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};



loginForm.addEventListener('submit', handleLogin);
signupForm.addEventListener('submit', handleSignup);