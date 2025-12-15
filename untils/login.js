const elForm = document.querySelector(".login-form");
const api = "https://fakestoreapi.com/auth/login";

elForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const username = elForm["username"].value.trim();
  const password = elForm["password"].value.trim();

  const user = {
    username,
    password
  };

  fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then((res) => res.json())
    .then((data) => {
      const token = data.token;

      
      if (token) {
        localStorage.setItem("token", token);


        window.location.href = "../pages/dashboard.html";
      }
    });

  console.log("Username:", username);
  console.log("Password:", password);
}
