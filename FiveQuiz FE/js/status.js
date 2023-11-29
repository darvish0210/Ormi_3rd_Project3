const accessToken = localStorage.getItem("accessToken");
const accessTokenExp = localStorage.getItem("accessTokenExp");

function updateNavigationLinks() {
  const login = document.querySelector('#login');
  const join = document.querySelector('#join');
  iframe = document.querySelector('#iframe');
  const $logoutButton = document.querySelector(".logoutButton");
  login.addEventListener('click',function(){
    iframe.src = './login.html'
  })
  join.addEventListener('click',function(){
    iframe.src = './join.html'
  })
  if (accessToken && accessTokenExp && new Date() < new Date(accessTokenExp)) {
    $logoutButton.style.display = "inline";
    $logoutButton.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("accessTokenExp");
      window.location.href = "./index.html";
    });
    login.style.display = "none";
    join.style.display = "none";
  } else {
    $logoutButton.style.display = "none";
    $loginLink.style.display = "inline";
    $joinLink.style.display = "inline";
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessTokenExp");
  }
}

updateNavigationLinks();
