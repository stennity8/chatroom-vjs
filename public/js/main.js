const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room })

// Message from server
socket.on('message', message => {
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight
});

// Message submti
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get message text
  const msg = e.target.elements.msg.value;

  // Emit message to server
  socket.emit('chatMessage', msg)

  // Clear input
  e.target.elements.msg.value = ''
  e.target.elements.msg.focus()
});

// Output message to DOM
function outputMessage({ username, text, time }) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p className="meta">${username} <span>${time}</span></p>
  <p className="text">
    ${text}
  </p>`
  document.querySelector('.chat-messages').appendChild(div);
}