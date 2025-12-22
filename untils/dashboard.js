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

fetch("https://fakestoreapi.com/products", {
  method: "GET"
})
  .then((response) => response.json())
  .then((date) => fetchData(date));

function fetchData(date, title) {
  date.map(({ id, title, image, category, price, description }) => {
    elTable.innerHTML += `
              <tr class="table-light">
                <td>${id}</td>
                <td>${title}</td>
                <td>${category}</td>
                <td>${description}</td>
                <td>${price}</td>
                <td><img width="100" src="${image}" alt=""></td>
                <td><button class="btn btn-success" onclick="viewProduct(${id})">View</button>
                <button class="btn btn-success" onclick="deleteProducta(${id})">Delete</button>
                </td>
              </tr>
  `;
  });
}

const elCards = document.querySelector("#tables");

elCards.addEventListener("click", () => {
  elTable.style.display = "block";
});

// delete

const deleteProducta = (id) => {
  fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "DELETE"
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        const elItems = document.querySelectorAll(".table-light");
        elItems[id - 1].classList.add("none");
      }
    });
};


// add product
const addProductButton = document.querySelector(".add-product");
const elModal = document.querySelector(".modal");
const elForm = document.querySelector(".form");
const elCanselButton = document.querySelector(".cancel-modal");


addProductButton.addEventListener("click", (e) => {
  e.preventDefault();
  elModal.classList.toggle("none__2");
});

// cancel

elCanselButton.addEventListener("click", (e) => {
  e.preventDefault();
  elModal.classList.toggle("none__2");
});

// Submit
elForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = elForm["title"].value.trim();
  const price = elForm["price"].value.trim();
  const description = elForm["description"].value.trim();
  const category = elForm["category"].value.trim();
  const image = elForm["image"].value.trim();


  const product = {
    title,
    price,
    description,
    category,
    image,
  };

  fetch("https://fakestoreapi.com/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  })
  .then((res) => res.json())
  .then((data) =>{
    if(data){
      elModal.classList.add("none__2");
      showToast("blue", "Product added successfully!");
      elTable.innerHTML += `
              <tr class="table-light">
                <td>${data.id}</td>
                <td>${data.title}</td>
                <td>${data.category}</td>
                <td>${data.description}</td>
                <td>${data.price}</td>
                <td><img width="100" src="${data.image}" alt=""></td>
                <td><button class="btn btn-success" onclick="viewProduct(${data.id})">View</button>
                <button class="btn btn-success" onclick="deleteProducta(${data.id})">Delete</button>
                </td>
              </tr>
  `;
    }
    
  })

});