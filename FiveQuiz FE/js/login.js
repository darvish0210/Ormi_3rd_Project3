const $loginForm = document.querySelector(".login");
const $userEmailInput = document.querySelector("#user-email");
const $userPwInput = document.querySelector("#user-pw");

$loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = $userEmailInput.value;
  const password = $userPwInput.value;
  login(email, password);
});

let accessToken = null;

function login(email, password) {
  fetch("http://127.0.0.1:8000/account/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      console.log(response);
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      accessToken = data.access;
      const expirationDate = new Date(new Date().getTime() + 30 * 60 * 1000);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("accessTokenExp", expirationDate);
      window.location.href = "./chat.html";
    })
    .catch((error) => {
      console.error("Login Error:", error);
      alert("Login failed.");
    });
}
