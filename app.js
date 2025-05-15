const messagesContainer = document.getElementById("messages");
const input = document.getElementById("user-input");

async function sendMessage() {
  const userText = input.value.trim();
  if (!userText) return;
  
  appendMessage("user", userText);
  input.value = "";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer" + process.env.OPENAI_API_KEY
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: userText }]
    })
  });

  const data = await response.json();
  const aiText = data.choices?.[0]?.message?.content || "Pas de réponse.";
  appendMessage("ai", aiText);
}

function appendMessage(role, text) {
  const msg = document.createElement("div");
  msg.className = "message " + role;
  msg.textContent = text;
  messagesContainer.appendChild(msg);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
