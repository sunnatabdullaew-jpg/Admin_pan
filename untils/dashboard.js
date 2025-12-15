const logOut = document.querySelector(".logout");

const Logout = () => {
  localStorage.removeItem("token");
  window.location.href = "../index.html";
};

logOut.addEventListener("click", Logout);

function showToast(color, text) {
  Toastify({
    text: `${text}`,
    duration: 5000, // 5 soniya
    gravity: "top", // Yuqori qism
    position: "right", // O'ng tomon
    close: false,
    stopOnFocus: true,
    style: {
      background: "green",
      color: "white", // Matn rangini qora qilamiz
      borderRadius: "5px", // Yumaloq burchaklar
      borderLeft: `5px solid ${color}`, // Chap tomonda ko'k rangli chiziq qo'shamiz (progress bar o'rniga)
      // boxShadow: "0 3px 10px rgba(0,0,0,0.1)", // Engil soya
      padding: "15px",
      fontFamily: "Open Sans",
      boxShadow: `2px 0px 10px -3px ${color}`
    }
  }).showToast();
}
showToast("green", "Welcome Admin!");
