const API_URL = "https://script.google.com/macros/s/AKfycbxeVu7SSAduuy0V6nLMugDhHCc0geNj-crEiWN46bnZfZDL7R2wdy4jsEE3WgU0IFce/exec"; // your deployed Apps Script URL

async function fetchLeaderboard() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    renderLeaderboard(data);
  } catch (err) {
    console.error("Failed to fetch leaderboard:", err);
    document.getElementById("leaderboard-container").innerHTML =
      "<p>Failed to load leaderboard.</p>";
  }
}

function renderLeaderboard(data) {
  // sort descending by points, don't assume the Sheet is sorted
  const sorted = [...data].sort((a, b) => b.points - a.points);

  const container = document.getElementById("leaderboard-container");
  container.innerHTML = "";

  sorted.forEach(entry => {
    const board = document.createElement("div");
    board.className = "board";
    board.innerHTML = `
      <h2>${entry.name}</h2>
      <p>${entry.points} points</p>
    `;
    container.appendChild(board);
  });
}

fetchLeaderboard();
// Optional: auto-refresh every 30s so it feels "live"
setInterval(fetchLeaderboard, 30000);