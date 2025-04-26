// Store messages in memory (will be cleared on page refresh)
let messages = [];

// Get DOM elements
const messageArea = document.getElementById('messageArea');
const messageInput = document.getElementById('messageInput');
const nameInput = document.getElementById('nameInput');


// Function to send a message
function send() {
    const message = messageInput.value.trim();
    const name = nameInput.value.trim() || 'anonymous';
     
    if (message) {
        // Create message object
        const newMessage = {
            sender: name,
            text: message,
            timestamp: new Date().getTime()
        };
        
        // Add message to array
        messages.push(newMessage);
        
        // Display the message
        displayMessage(newMessage);
        
        // Clear input field
        messageInput.value = '';
        
        // Scroll to bottom
        scrollToBottom();
    }
}

// Function to display a message
function displayMessage(message) {
    const messageElement = document.createElement('div');
    const currentUser = nameInput.value.trim() || 'name';
   console.log(message);
    
    messageElement.className = `message ${message.sender === currentUser ? 'sent' : 'received'}`;
    
    messageElement.innerHTML = `
        <div class="sender">${message.sender}</div>
        <div class="text">${escapeHtml(message.text)}</div>
    `;
    
    messageArea.appendChild(messageElement);
}

// Function to escape HTML to prevent XSS
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Function to scroll chat to bottom
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}

// Listen for Enter key in message input
messageInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        send();
    }
});

// Add some welcome messages
setTimeout(() => {
    const welcomeMessage = {
        sender: 'System',
        text: 'Welcome to the chat! Enter your name and start chatting,Hello! I will disappear soon, bye!',
        timestamp: new Date().getTime()
    };
    displayMessage(welcomeMessage);
}, 20000);


//after some time messages have to disappear/vanish //

function displayMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.textContent = message.text;
    document.getElementById("messages").appendChild(messageDiv);
   
    // Remove after 10 min
    setTimeout(() => {
        messageDiv.remove();
    }, 10000);
}

