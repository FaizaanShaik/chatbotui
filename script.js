document.addEventListener("DOMContentLoaded", () => {
    // Select elements
    const themeToggle = document.getElementById("toggle-theme");
    const sendButton = document.getElementById("send-button");
    const messageInput = document.getElementById("message-input");
    const chatMessages = document.getElementById("chat-messages");
    const uploadButton = document.getElementById("upload-button");
    const chatHistory = document.getElementById("chat-history");
    const sidebarToggle = document.getElementById("toggle-sidebar");
  
    // Initial messages array
    let messages = [
      { text: "Hello, how can I assist you today?", sender: "bot" },
      { text: "I need legal advice.", sender: "user" },
    ];
  
    // Render chat messages to the screen
    function renderMessages() {
      chatMessages.innerHTML = "";
      messages.forEach((message) => {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${message.sender}`;
        
        const messageContent = document.createElement("div");
        messageContent.className = `message-content ${message.sender}`;
        messageContent.innerText = message.text;
        
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
      });
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  
    // Render chat history
    function renderHistory() {
      chatHistory.innerHTML = "";
      messages.forEach((message) => {
        const historyItem = document.createElement("li");
        historyItem.innerText = `${message.sender === "user" ? "You" : "LegalMind"}: ${message.text}`;
        chatHistory.appendChild(historyItem);
      });
    }
  
    // Handle theme toggle (dark/light mode)
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      themeToggle.textContent =
        document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
    });
  
    // Handle send button click
    sendButton.addEventListener("click", () => {
      const text = messageInput.value.trim();
      if (!text) return;
      messages.push({ text, sender: "user" });
      messageInput.value = "";
      renderMessages();
      renderHistory();
  
      // Simulate bot response
      setTimeout(() => {
        const botReply = {
          text: "Thank you for reaching out. How can I help further?",
          sender: "bot",
        };
        messages.push(botReply);
        renderMessages();
        renderHistory();
      }, 1000);
    });
  
    // Handle file upload button click
    uploadButton.addEventListener("click", () => {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
          messages.push({ text: `File uploaded: ${file.name}`, sender: "user" });
          renderMessages();
          renderHistory();
        }
      });
      fileInput.click();
    });
  
    // Handle sidebar toggle
    sidebarToggle.addEventListener("click", () => {
      document.querySelector(".sidebar").classList.toggle("hidden");
    });
  
    // Initialize the chat
    renderMessages();
    renderHistory();
  
    // Apply ChatGPT-style message bubbles
    const style = document.createElement('style');
    style.innerHTML = `
      .message {
        display: flex;
        padding: 10px;
        margin: 5px 0;
      }
      .message.user {
        justify-content: flex-end;
      }
      .message.bot {
        justify-content: flex-start;
      }
      .message-content {
        max-width: 60%;
        padding: 10px;
        border-radius: 10px;
        font-size: 14px;
      }
      .message-content.user {
        background-color: #00796b;
        color: white;
      }
      .message-content.bot {
        background-color: #e0e0e0;
      }
    `;
    document.head.appendChild(style);
  });
