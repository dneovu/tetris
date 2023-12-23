export const bodyWrapper = document.querySelector(".body__wrapper");
export const welcomeWrapper = document.querySelector(".welcome__wrapper");
export const saveUsernameButton = document.querySelector(".welcome__button");

// левая сторона
export function createWelcome(bodyWrapper) {
  const welcome = generateWelcome();
  insertWelcomeToDOM();
  function generateWelcome() {
    const welcome = document.createElement("div");
    welcome.className = "welcome__wrapper";
    welcome.innerHTML = `<div class="welcome">
    <label for="usernameInput">ВВЕДИТЕ ИМЯ</label>
    <input type="text" id="usernameInput">
    <button class="welcome__button">Сохранить</button>
  </div>`;
    return welcome;
  }

  function insertWelcomeToDOM() {
    bodyWrapper.prepend(welcome);
  }
}

export function saveUsernameButtonHandler() {
  document.querySelector(".welcome__button").addEventListener("click", saveUsername);
}

export function saveUsername() {
  const username = document.querySelector("#usernameInput").value;
  if (username.trim() !== "") {
    localStorage.setItem("username", username);
    removeWelcomeFromDOM(bodyWrapper);
    createGeneralStats(bodyWrapper);
  }
}

export function createGeneralStats(bodyWrapper) {
  function generateGeneralStats() {
    const username = localStorage.getItem("username");
    const generalStats = document.createElement("div");
    generalStats.className = "general-stats__wrapper";
    generalStats.innerHTML = `      <div class="general-stats">
    <h2>Здравствуй, ${username}</h2>
    <p>Лучшие игры: </p>
    <div class="general-stats__place" data-place="1">1. ${localStorage.getItem(
      "first-place"
    )}</div>
    <div class="general-stats__place" data-place="2">2. ${localStorage.getItem(
      "second-place"
    )}</div>
    <div class="general-stats__place" data-place="3">3. ${localStorage.getItem(
      "third-place"
    )}</div>
  </div>`;
    return generalStats;
  }

  function insertGeneralStatsToDOM() {
    bodyWrapper.prepend(generalStats);
  }

  const generalStats = generateGeneralStats();
  insertGeneralStatsToDOM();
}

export function removeGeneralStatsFromDOM(bodyWrapper) {
  const generalStats = bodyWrapper.querySelector(".general-stats__wrapper");
  bodyWrapper.removeChild(generalStats);
}

export function removeWelcomeFromDOM(bodyWrapper) {
  const welcomeElement = bodyWrapper.querySelector(".welcome__wrapper");
  bodyWrapper.removeChild(welcomeElement);
}
