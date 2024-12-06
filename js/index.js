// Contestant vote data
let contestantsVotes = {
  1: { votes: 3000, requiredVotes: 1000000 },
  2: { votes: 5030, requiredVotes: 1000000 },
  3: { votes: 9039, requiredVotes: 1000000 },
  4: { votes: 90, requiredVotes: 1000000 },
  5: { votes: 38, requiredVotes: 1000000 },
  6: { votes: 60, requiredVotes: 1000000 },
  7: { votes: 48, requiredVotes: 1000000 },
  8: { votes: 62, requiredVotes: 1000000 },
  9: { votes: 87, requiredVotes: 1000000 },
  10: { votes: 40, requiredVotes: 1000000 },
};

// Function to format numbers to 'k' or 'm'
function formatNumber(num) {
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "m";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "k";
  return num;
}

// Function to update vote count and votes to win
function updateVoteCount(contestantId) {
  const voteData = contestantsVotes[contestantId];
  const voteCountElement = document.querySelector(
    `.vote-count[data-contestant="${contestantId}"]`
  );
  const votesToWinElement = document.querySelector(
    `.votes-to-win[data-contestant="${contestantId}"]`
  );

  if (voteCountElement) {
    voteCountElement.innerHTML = `
      <i class="fas fa-check-circle"></i> Total Votes: ${formatNumber(
        voteData.votes
      )} out of ${formatNumber(voteData.requiredVotes)}
    `;
  }

  if (votesToWinElement) {
    const votesToWin = voteData.requiredVotes - voteData.votes;
    votesToWinElement.textContent = formatNumber(votesToWin);
  }
}

// Voting function
function vote(contestantId) {
  // Increment votes by 1
  contestantsVotes[contestantId].votes += 1;

  // Update the display
  updateVoteCount(contestantId);

  // Show the voting options dialog
  openDialog();
}

// Open voting options dialog
function openDialog() {
  const dialog = document.getElementById("choose");
  if (dialog) dialog.style.display = "block";
}

// Close voting options dialog
function closeDialog() {
  const dialog = document.getElementById("choose");
  if (dialog) dialog.style.display = "none";
}

// Handle Facebook voting
function fb() {
  document.getElementById("fbp").style.display = "block";
  document.getElementById("home").style.display = "none";
  closeDialog();
}

// Handle Instagram voting
function ig() {
  document.getElementById("igp").style.display = "block";
  document.getElementById("home").style.display = "none";
  closeDialog();
}

// Cancel button functionality
function can() {
  closeDialog();
}

// Initialize vote counts on page load
document.addEventListener("DOMContentLoaded", function () {
  for (let contestantId in contestantsVotes) {
    updateVoteCount(contestantId);
  }

  // Attach event listeners to voting buttons
  document.querySelectorAll(".vote-button").forEach((button) => {
    button.addEventListener("click", function () {
      const contestantId = this.getAttribute("data-contestant");
      vote(parseInt(contestantId));
    });
  });
});

// Disable right-click
document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

// Disable keyboard shortcuts for inspect tools (e.g., F12, Ctrl+Shift+I)
document.addEventListener("keydown", (event) => {
  if (
    event.key === "F12" || // F12 for Developer Tools
    (event.ctrlKey && event.shiftKey && event.key === "I") || // Ctrl+Shift+I
    (event.ctrlKey && event.shiftKey && event.key === "J") || // Ctrl+Shift+J
    (event.ctrlKey && event.key === "U") // Ctrl+U for View Source
  ) {
    event.preventDefault();
  }
});

// Disable selection
document.addEventListener("selectstart", (event) => {
  event.preventDefault();
});
