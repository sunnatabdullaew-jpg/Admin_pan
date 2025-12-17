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

const elTable = document.querySelector(".table-body");

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((date) => fetchData(date));

function fetchData(date, title) {
  date.map(({id, image, category, price, description }) => {
    elTable.innerHTML += `
              <tr>
                <td>${id}</td>
                <td>${title}</td>
                <td>${category}</td>
                <td>${description}</td>
                <td>${price}</td>
                <td><img width="100" src="${image}" alt=""></td>
                <td><button class="btn btn-success" onclick="viewProduct(${id})">View</button>
                <button class="btn btn-success" onclick="editProduct(${id})">Edit</button>
                <button class="btn btn-success" onclick="deleteProduct(${id})">Delete</button>
                </td>
              </tr>
  `;
  });
}


const elCards = document.querySelector("#tables");

elCards.addEventListener("click", () =>{
  elTable.style.display = "block";
});


const elGraph = document.querySelector(".graph");


// graph




const canvas = document.getElementById("userChart");
const ctx = canvas.getContext("2d");

const totalUsersEl = document.getElementById("total-users");
const activeSessionsEl = document.getElementById("active-sessions");
const serverLoadEl = document.getElementById("server-load");

const buttons = document.querySelectorAll(".chart-btn");

canvas.width = canvas.parentElement.offsetWidth;
canvas.height = 300;

let chartType = "line";
let data = [10, 20, 30, 25, 40, 35, 50];
const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function drawLineChart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const padding = 40;
  const stepX = (canvas.width - padding * 2) / (data.length - 1);
  const scaleY = (canvas.height - padding * 2) / 100;

  ctx.beginPath();
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 3;

  data.forEach((v, i) => {
    const x = padding + i * stepX;
    const y = canvas.height - padding - v * scaleY;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });

  ctx.stroke();

  data.forEach((v, i) => {
    const x = padding + i * stepX;
    const y = canvas.height - padding - v * scaleY;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#0ea5e9";
    ctx.fill();
  });
}

function drawBarChart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const padding = 40;
  const barWidth = (canvas.width - padding * 2) / data.length - 10;
  const scaleY = (canvas.height - padding * 2) / 100;

  data.forEach((v, i) => {
    const x = padding + i * (barWidth + 10);
    const y = canvas.height - padding - v * scaleY;
    const height = v * scaleY;

    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(x, y, barWidth, height);
  });
}

function drawChart() {
  chartType === "line" ? drawLineChart() : drawBarChart();
}

function updateStats() {
  const totalUsers = Math.floor(Math.random() * 500 + 100);
  const activeSessions = Math.floor(Math.random() * 80 + 10);
  const serverLoad = Math.floor(Math.random() * 70 + 10);

  totalUsersEl.textContent = totalUsers;
  activeSessionsEl.textContent = activeSessions;
  serverLoadEl.textContent = serverLoad + "%";

  data.shift();
  data.push(activeSessions);
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    chartType = btn.dataset.type;
    drawChart();
  });
});

drawChart();
updateStats();

setInterval(() => {
  updateStats();
  drawChart();
}, 1500);



const elCharts = document.querySelector("#charts");

elCharts.addEventListener("click", () =>{
  elGraph.style.display = "block";
});

