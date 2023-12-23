export const leftSide = document.querySelector(".left-side");
export const welcomeWrapper = document.querySelector(".welcome__wrapper");
export const saveUsernameButton = document.querySelector(".welcome__button");

// левая сторона
export function createWelcome(leftSide) {
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
    leftSide.prepend(welcome);
  }
}

export function saveUsernameButtonHandler() {
  document.querySelector(".welcome__button").addEventListener("click", saveUsername);
}

export function saveUsername() {
  const username = document.querySelector("#usernameInput").value;
  if (username.trim() !== "") {
    localStorage.setItem("username", username);
    removeWelcomeFromDOM(leftSide);
    createGeneralStats(leftSide);
  }
}

export function createGeneralStats(leftSide) {
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
    leftSide.prepend(generalStats);
  }

  const generalStats = generateGeneralStats();
  insertGeneralStatsToDOM();
}

export function removeGeneralStatsFromDOM(leftSide) {
  const generalStats = leftSide.querySelector(".general-stats__wrapper");
  leftSide.removeChild(generalStats);
}

export function removeWelcomeFromDOM(leftSide) {
  const welcomeElement = leftSide.querySelector(".welcome__wrapper");
  leftSide.removeChild(welcomeElement);
}

export function createControlInfo(leftSide) {
  function generateControlInfo() {
    const generalStats = document.createElement("div");
    generalStats.className = "control-info__wrapper";
    generalStats.innerHTML = `      <div class="control-info">
    <h2>Управление: </h2>
    <p>S - вниз</p>
    <p>A - влево</p>
    <p>D - вправо</p>
    <p>SPACE - падение</p>
    <p>Z / M - поворот</p>`
    return generalStats;
  }

  function insertGeneralStatsToDOM() {
    leftSide.prepend(generalStats);
  }

  const generalStats = generateControlInfo();
  insertGeneralStatsToDOM();
}