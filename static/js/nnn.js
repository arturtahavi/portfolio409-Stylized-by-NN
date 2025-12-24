const API_KEY = "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";
const MODEL = "xiaomi/mimo-v2-flash:free";
const API_URL = "https://corsproxy.io/?https://openrouter.ai/api/v1/chat/completions";

let messages = [];

async function sendRequest() {
    let text = document.getElementById("userInput").value.trim();
    
    if (!text) {
        alert("Введите текст");
        return;
    }
    
    // Добавляем в историю и показываем
    messages.push({ role: "user", content: text });
    const output = document.getElementById("output");
    if (output) output.innerHTML += `<div><b>Вы:</b> ${text}</div>`;
    
    // Очищаем поле и блокируем
    const input = document.getElementById("userInput");
    input.value = "";
    input.disabled = true;
    
    try {
        // Отправляем запрос
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "HTTP-Referer": window.location.origin,
                "X-Title": "Xiaomi Chat",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: MODEL,
                messages: messages
            })
        });
        
        const result = await response.json();
        const answer = result.choices[0].message.content;
        
        // Сохраняем и показываем ответ
        messages.push({ role: "assistant", content: answer });
        if (output) output.innerHTML += `<div><b>AI:</b> ${answer}</div><hr>`;
        
    } catch (error) {
        console.error("Ошибка:", error);
        if (output) output.innerHTML += `<div style="color:red;">Ошибка: ${error.message}</div>`;
    } finally {
        input.disabled = false;
        input.focus();
    }
}

// Добавляем обработчик Enter
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById("userInput");
    if (input) {
        input.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                sendRequest();
            }
        });
    }
});