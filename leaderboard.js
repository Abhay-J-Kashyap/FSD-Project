function loadLeaderboard() {
    // Get leaderboard scores from localStorage
    //localstorage.clear();
    const scores = JSON.parse(localStorage.getItem('scores')) || [];

    const leaderboardList = document.getElementById("leaderboard-list");
    leaderboardList.innerHTML = ""; // Clear any previous content

    scores.forEach((entry, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.name}</td>
            <td>${entry.score}</td>
        `;
        leaderboardList.appendChild(row);
    });
}

// Load leaderboard when page is ready
document.addEventListener("DOMContentLoaded", loadLeaderboard);
document.getElementById("back-home").addEventListener("click", function() {
window.location.href = "proj.html"; // Navigate to the homepage
});