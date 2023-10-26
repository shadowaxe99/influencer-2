// ...existing JavaScript...
document.addEventListener("DOMContentLoaded", function() {
  let buttons = document.querySelectorAll('.reaction-button');
  buttons.forEach(function(button) {
    button.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  });
  
  // Typewriter effect
  const message = "Hello! How can I assist you today?";
  let i = 0;
  function typeWriter() {
    if (i < message.length) {
      document.querySelector('.chat-message').innerHTML += message.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }
  typeWriter();
});
