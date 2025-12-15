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
    })
    .catch((err) => {
      console.error("Error:", err);
      showToast("red", "Your not admin!");
    })


  console.log("Username:", username);
  console.log("Password:", password);
}
    function showToast(color, text) {
    Toastify({
      text: `${text}`, 
      duration: 5000, // 5 soniya
      gravity: "top", // Yuqori qism
      position: "right", // O'ng tomon
      close: false, 
      stopOnFocus: true, 
      style: {
          background: `${color}`,
          color: "white", // Matn rangini qora qilamiz
          borderRadius: "5px", // Yumaloq burchaklar
          borderLeft: `5px solid ${color}`, // Chap tomonda ko'k rangli chiziq qo'shamiz (progress bar o'rniga)
          // boxShadow: "0 3px 10px rgba(0,0,0,0.1)", // Engil soya
          padding: "15px",
          fontFamily: "Open Sans",
          boxShadow: `2px 0px 10px -3px ${color}`,
          
      },
      
  }).showToast();
}