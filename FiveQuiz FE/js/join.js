const signupForm = document.querySelector(".join");
const joinEmailInput = document.querySelector("#join-email");
const joinPwInput = document.querySelector("#join-pw");

signupForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = joinEmailInput.value;
  const password = joinPwInput.value;
  signup(email, password);
});

function signup(email, password) {
  fetch("http://127.0.0.1:8000/account/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.status !== 201) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(() => {
      alert("회원가입 되었습니다. 이제 로그인이 가능합니다");
      window.location.href = "./login.html";
    })
    .catch((error) => {
      console.error("Signup Error:", error);
      alert("회원가입에 실패했습니다. 양식에 맞게 입력해주세요.");
    });
}
