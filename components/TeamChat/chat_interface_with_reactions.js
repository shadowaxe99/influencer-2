
function toggleReactions() {
  const reactionBox = document.querySelector('.reaction-box');
  reactionBox.classList.toggle('hidden');
}

function addReaction(emoji) {
  const messageBox = document.querySelector('.message-box'); // Replace with your own message box selector
  messageBox.innerHTML += `<span class="reaction">${emoji}</span>`;
  toggleReactions();
}
