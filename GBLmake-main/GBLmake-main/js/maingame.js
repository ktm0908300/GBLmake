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
  function addExecuteAnnounce(playerName){
    
  }

  // 밤에 일어난 일
  function addNightAnnounce(text){

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

  // 테스트용(봇 메세지 작성)
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
      addBotMessage(message, "player6");
    }else if (e.key === "7") {
      const message = input.value;
      addBotMessage(message, "player7");
    }else if (e.key === "8") {
      const message = input.value;
      addBotMessage(message, "player8");
    }else if (e.key === "9") {
      const message = input.value;
      addBotMessage(message, "player9");
    }
  });

  // 테스트용(시간 메세지 작성)
  input.addEventListener("keydown", (e) => {
    if (e.key === "0") {
      const message = input.value;
      ChangeTime(message);
    }
  });
});
