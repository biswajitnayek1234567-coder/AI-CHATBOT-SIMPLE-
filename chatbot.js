let responses = {};

// Load JSON response database
fetch("responses.json")
    .then(response => response.json())
    .then(data => responses = data)
    .catch(err => console.log("Error loading responses:", err));

function sendMessage() {
    const input = document.getElementById("userInput").value.trim().toLowerCase();
    if(!input) return;

    const chatbox = document.getElementById("chatbox");

    // Display user message
    const userMsg = document.createElement("p");
    userMsg.classList.add("user");
    userMsg.textContent = "You: " + input;
    chatbox.appendChild(userMsg);
    chatbox.scrollTop = chatbox.scrollHeight;

    // Generate bot response
    const botMsg = document.createElement("p");
    botMsg.classList.add("bot");
    botMsg.textContent = "TOJO: " + getResponse(input);
    chatbox.appendChild(botMsg);
    chatbox.scrollTop = chatbox.scrollHeight;

    document.getElementById("userInput").value = "";
}

// Smart response function
function getResponse(input) {
    // Exact match
    if(responses[input]) return responses[input];

    // Keyword matching
    for(const key in responses) {
        if(input.includes(key)) return responses[key];
    }

    // Default fallback
    return responses["default"];
}