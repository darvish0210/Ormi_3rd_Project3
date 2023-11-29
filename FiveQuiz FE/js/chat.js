const accessToken = localStorage.getItem("accessToken");
const chatbox = document.querySelector(".chat-box");
const StartButton = document.querySelector(".startbtn");
const UserInput = document.querySelector("#user-input");
const SendButton = document.querySelector(".sendbtn");
const requestData = {
    prompt: `주관식 상식 퀴즈를 1개 출제해줘. 형식은 퀴즈:문제 방식으로 출력되도록 나타내줘. `,
};
function printmsg(msg){
    const Msg = document.createElement("div");
    Msg.className = 'msg';
    Msg.textContent = msg;
    chatbox.prepend(Msg);
};

StartButton.addEventListener('click',function(){
    if (!accessToken) {
        alert("먼저 로그인을 해주세요");
        return;
    }
    StartButton.style.display="none";
    chatGptAPI(requestData);
})
SendButton.addEventListener('click',async function(){
    if (!accessToken) {
        alert("먼저 로그인을 해주세요");
        return;
    }
    const input = {
        prompt: UserInput.value+' is 정답인지 아닌지 여부를 알려줘. 정답이 아니라면 정답도 알려줘.'
    };
    await chatGptAPI(input);
    wait(5);
    await chatGptAPI(requestData);
});

async function chatGptAPI(requestData, callback) {
    fetch("http://127.0.0.1:8000/chat/", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestData),
    redirect: "follow",
    })
    .then((response) => {
        if (response.status === 429) {
        alert("오늘의 횟수를 전부 사용하셨습니다. 내일 다시 시도해주세요.");
        return;
        }
        return response.json();
    })
    .then((data) => {
        const answer = data.response;
        printmsg(answer);
        closeLoading();
        callback(answer);
    })
    .catch((error) => {
        console.error("Fetch 에러:", error);
        closeLoading();
        alert("데이터를 불러오는 데 실패했습니다");
    });
};


function wait(sec) {
    let start = Date.now(), now = start;
    while (now - start < sec * 1000) {
        now = Date.now();
    }
}



