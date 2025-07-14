//시간별로 관련된 사진이나 내용들을 정리
const WeatherList = {
  DayTime: {
    image: "images/DayTime.png",
    announce: '<span style ="color: red;">아침</span>이 되었습니다. 생존자들은 대화를 시작해주세요.'
  },
  NightTime: {
    image: "images/NightTime.png",
    announce: '<span style ="color: red;">밤</span>이 되었습니다. 마피아들의 시간이 시작됩니다.'
  },
  VoteTime: {
    image: "images/VoteTime.png",
    announce: '<span style ="color: red;">투표 시간</span>이 되었습니다. 생존자들은 마피아를 지목해주세요.'
  }
}

const playerimages = {
  player1: "images/player/player1.png",
  player2: "images/player/player2.png",
  player3: "images/player/player3.png",
  player4: "images/player/player4.png",
  player5: "images/player/player5.png",
  player6: "images/player/player6.png",
  player7: "images/player/player7.png",
  player8: "images/player/player8.png",
  player9: "images/player/player9.png"
}

const playerRoles = {
  player1:"innocent",
  player2:"innocent",
  player3:"mafia",
  player4:"innocent",
  player5:"doctor",
  player6:"innocent",
  player7:"innocent",
  player8:"mafia",
  player9:"innocent",
  user:"innocent"
};

const roleImages = {
  innocent: "images/innocent.png",
  mafia: "images/MafiaKnife.png",
  doctor: "images/DoctorMedkit.png",
  unknown: "images/QuestionImg.png"
};

// 플레이어 아이콘 추가
function renderPlayers(playerCount) {
  const leftContainer = document.getElementById("leftPlayers");
  const rightContainer = document.getElementById("rightPlayers");

  leftContainer.innerHTML = '';
  rightContainer.innerHTML = '';  

  for (let i = 1; i <= playerCount; i++) {
    const playerId = "player" + i;
    const isUser = (i === playerCount);
    const playerBox = document.createElement("div");
    playerBox.className = "player-box";

    // 직업 이미지 경로
    const roleImgSrc = isUser ? roleImages[playerRoles["user"]]: roleImages["unknown"];
    const nameLabel = isUser ? "User" : `player${i}`;
    const playerImgSrc = isUser ? "images/Innocent.png" : playerimages[nameLabel];

    playerBox.innerHTML = `
      <img class="player-icon-img" src="${playerImgSrc}" alt="플레이어" id="player${i}avatarImg">
      <img class="player-role-img" src="${roleImgSrc}" alt="role" id="player${i}roleImg">
      <div class="player-name">${nameLabel}</div>
      <div class="vote-indicator" id="vote-indicator-player${i}"></div>
    `;
    playerBox.id=`player${i}Box`;

    if (i <= Math.floor((playerCount + 1) / 2)) {
      leftContainer.appendChild(playerBox);
    } else {
      rightContainer.appendChild(playerBox);
    }
  }
}

//투표 기록용
var VoteSum = [3,0,4,0,2,0,1,0,0,0];

//투표 인디케이터 업로드
function updateVoteIndicators() {
  for (let i = 1; i <= 9; i++) {
    const indicator = document.getElementById(`vote-indicator-player${i}`);
    if (indicator) {
      const count = VoteSum[i];
      indicator.innerHTML = "●".repeat(count);
    }
  }
}

// 글 공지
function announceMessage(text){
  const announceMessage = document.createElement("div");
  announceMessage.className = "announce-box";

  announceMessage.innerHTML=`
    <p class="announce-message">${text}</p>
  `;
  
  chatContent.appendChild(announceMessage);
  chatContent.scrollTop = chatContent.scrollHeight;
}

// 플레이어 사망시 X 자 표시 추가
function PlayerDeadImage(name) {
  const box = document.getElementById(`${name}Box`);
  const deathImg = document.createElement("img");
  deathImg.className = "player-death-img";
  deathImg.src = "images/DeathMark.png";

  deathImg.alt = "사망";
  box.appendChild(deathImg);
  return;
}

// 직업 공개
function PlayerRoleReveal(name) {
  const roleImg = document.getElementById(`${name}roleImg`);
  roleImg.src = roleImages[playerRoles[name]]
  return;
}

// 플레이어 사망
function PlayerDead(name){
  PlayerDeadImage(name);
  PlayerRoleReveal(name);
}

//투표 창 띄우기
  function startVotePhase() {
    const totalPlayers = Object.keys(playerimages).length;

    for (let i = 1; i <= totalPlayers; i++) {
      const playerId = "player" + i;
      if (playerId === "user") continue; // 본인 제외

      const playerBox = document.getElementById(`${playerId}Box`);
      if (!playerBox) continue;

      const voteButton = document.createElement("button");
      voteButton.innerText = "투표";
      voteButton.className = "vote-button";
      voteButton.id = `vote-btn-${i}`;
      voteButton.onclick = () => castVote(i);

      playerBox.appendChild(voteButton);
    }
  }

  //투표 입력
  function castVote(target) {
    
    sendingMessage = `player${target}에게 투표하였습니다.`;
    announceMessage(sendingMessage);

    const voteButtons = document.querySelectorAll(".vote-button");
    voteButtons.forEach(btn => btn.remove());

    VoteSum[parseInt(target)]++;

    updateVoteIndicators();
  }

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendButton");
  const chatContent = document.getElementById("chatContent");
  const WeatherImage = document.getElementById("weatherImage");
  // 유저 메시지 추가 함수
  function addPlayerMessage(text) {
    if (!text.trim()) return;

    const messageBox = document.createElement("div");
    messageBox.className = "chat-message-user";

    messageBox.innerHTML = `
      <div class="message-bubble-user">
        <span class="message-text">${text}</span>
      </div>
    `;

    chatContent.appendChild(messageBox);
    chatContent.scrollTop = chatContent.scrollHeight;
  }

  // LLM 메시지 추가 함수
  function addBotMessage(text, playerName) {
    if (!text.trim()) return;

    const messageBox = document.createElement("div");
    messageBox.className = "chat-message-bot";

    messageBox.innerHTML = `
      <div class="bot-chat-image-context">
        <img src=${playerimages[playerName]} alat="이미지" class="bot-image">
        <div class="bot-name">${playerName}</div> 
      </div>
      <div class="message-bubble-bot">
        <span class="message-text">${text}</span>
      </div>
    `;

    chatContent.appendChild(messageBox);
    chatContent.scrollTop = chatContent.scrollHeight;
  }
  
  // 시간 변경
  function ChangeTime(text){
    const announceMessage = document.createElement("div");
    announceMessage.className = "announce-box";

    WeatherImage.style.backgroundImage = `url(${WeatherList[text].image})`;

    announceMessage.innerHTML=`
      <p class="announce-message">${WeatherList[text].announce}</p>
    `;

    chatContent.appendChild(announceMessage);
    chatContent.scrollTop = chatContent.scrollHeight;
  }

  // 처형 공지
  function addExecuteAnnounce(playerName, TieBool){
    const announceMessage = document.createElement("div");
    announceMessage.className = "announce-box";

    if (TieBool === true){
      announceMessage.innerHTML=`
        <p class="announce-message">투표가 동점으로 <span style ="color: red;">아무도</span> 죽지 않았습니다.</p>
      `;

      chatContent.appendChild(announceMessage);
      chatContent.scrollTop = chatContent.scrollHeight;
    }else if (TieBool === false){
      announceMessage.innerHTML=`
        <p class="announce-message">투표결과로 <span style ="color: red;">${playerName}</span>이(가) 처형되었습니다.</p>
      `;

      const announceMessage1 = document.createElement("div");
      announceMessage1.className = "announce-box";

      announceMessage1.innerHTML=`
        <p class="announce-message"><span style ="color: red;">${playerName}</span>은(는) <span style ="color: red;">마피아</span> 였습니다.</p>
      `;

      chatContent.appendChild(announceMessage);
      chatContent.scrollTop = chatContent.scrollHeight;

      chatContent.appendChild(announceMessage1);
      chatContent.scrollTop = chatContent.scrollHeight;
    }

    
  }

  // 밤에 일어난 일
  function addNightAnnounce(DeathPlayer, HealPlayer){
    const announceMessage1 = document.createElement("div");
    announceMessage1.className = "announce-box";

    const announceMessage2 = document.createElement("div");
    announceMessage2.className = "announce-box";

    announceMessage1.innerHTML=`
      <p class="announce-message">밤 중 마피아에 의해 <span style ="color: red;">${DeathPlayer}</span>이(가) 살해되었습니다.</p>
    `;
    announceMessage2.innerHTML=`
      <p class="announce-message">밤 중 의사가 <span style ="color: green;">${HealPlayer}</span>을(를) 살렸습니다.</p>
    `;

    chatContent.appendChild(announceMessage1);
    chatContent.scrollTop = chatContent.scrollHeight;
    chatContent.appendChild(announceMessage2);
    chatContent.scrollTop = chatContent.scrollHeight

    if (HealPlayer === DeathPlayer){
      const announceMessage3 = document.createElement("div");
      announceMessage3.className = "announce-box";

      announceMessage3.innerHTML=`
        <p class="announce-message">의사에 의해 <span style ="color: green;">${HealPlayer}</span>가 생존하였습니다.</p>
      `;

      chatContent.appendChild(announceMessage3);
      chatContent.scrollTop = chatContent.scrollHeight;
    }
  }

  // 전송 버튼 클릭
  sendButton.addEventListener("click", () => {
    const message = input.value;
    addPlayerMessage(message);
    input.value = "";
    input.focus();
  });

  // Enter 키로 전송
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      sendButton.click();
    }
  });

  // 테스트용(봇 메세지 및 공지 작성)
  input.addEventListener("keydown", (e) => {
    if (e.key === "1") {
      const message = input.value;
      addBotMessage(message, "player1");
    }else if (e.key === "2") {
      const message = input.value;
      addBotMessage(message, "player2");
    }else if (e.key === "3") {
      const message = input.value;
      addBotMessage(message, "player3");
    }else if (e.key === "4") {
      const message = input.value;
      addBotMessage(message, "player4");
    }else if (e.key === "5") {
      const message = input.value;
      addBotMessage(message, "player5");
    }else if (e.key === "6") {
      const message = input.value;
      addNightAnnounce("player9", "player9");
    }else if (e.key === "7") {
      const message = input.value;
      addExecuteAnnounce("No-one", true);
    }else if (e.key === "8") {
      const message = input.value;
      addExecuteAnnounce("player5", false);
    }else if (e.key === "9") {
      const message = input.value;
      addNightAnnounce("player7", "player9");
      
    }
  });

  // 테스트용(시간 메세지 작성)
  input.addEventListener("keydown", (e) => {
    if (e.key === "0") {
      const message = input.value;
      ChangeTime(message);
    }
  });

  //플레이어 수 값 불러오기
  const urlParams = new URLSearchParams(window.location.search);
  const count = parseInt(urlParams.get('count')) || 10; //기본은 10으로 설정해둠

  renderPlayers(count); //플레이어 나타내기
});