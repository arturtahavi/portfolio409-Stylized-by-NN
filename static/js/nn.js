const API_KEY = "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"
const MODEL = "xiaomi/mimo-v2-flash:free"

let messages = []

async function sendRequest() {
    let text = document.getElementById("userInput").value

    if (text == "") {
        alert("Введите текст")
        return
    }
    messages.push({
        role: "user",
        content: text
    });

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "Xiaomi",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "xiaomi/mimo-v2-flash:free",
            messages: messages
        })
    })

    const result = await response.json()

    const answer = result.choices[0].message.content


    messages.push({
        role: "assistant",
        content: answer
    });

    const output = document.getElementById("output");
    if (output) {
        output.innerHTML += `<div><b>AI:</b> ${answer}</div>`;
    }

   
}
