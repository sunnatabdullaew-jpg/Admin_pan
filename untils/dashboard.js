const logOut = document.querySelector('.logout');

const Logout = () => {
  localStorage.removeItem('token');
  window.location.href = '../index.html';
}

logOut.addEventListener("click", Logout);