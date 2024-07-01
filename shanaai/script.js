document.addEventListener("DOMContentLoaded", function() {
    const loadingScreen = document.getElementById("loading");
    loadingScreen.style.display = "none";
});

async function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    const responseDiv = document.getElementById("response");
    const loadingScreen = document.getElementById("loading");

    const apiKey = 'sk-proj-wgEFHaCT0hBQAT5DcEe7T3BlbkFJYy6X9hqGAC63OFSmH3BH';  // Ganti dengan API key Anda
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const data = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userInput }]
    };

    try {
        loadingScreen.style.display = "flex";
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        const message = result.choices[0].message.content;
        responseDiv.value = message;
    } catch (error) {
        console.error('Error:', error);
        responseDiv.value = 'Terjadi kesalahan, silakan coba lagi.';
    } finally {
        loadingScreen.style.display = "none";
    }
}

function swapText() {
    const userInput = document.getElementById("userInput");
    const responseDiv = document.getElementById("response");
    const temp = userInput.value;
    userInput.value = responseDiv.value;
    responseDiv.value = temp;
}
