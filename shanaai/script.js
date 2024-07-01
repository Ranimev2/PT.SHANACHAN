document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = 'YOUR_OPENAI_API_KEY_HERE';
    const API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';

    // Remove loading screen
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'none';

    // Handle Chat Form
    const chatForm = document.getElementById('chat-form');
    chatForm.addEventListener('submit', event => {
        event.preventDefault();
        const userInput = document.getElementById('user-input').value;

        // Display loading indicator
        const chatResponse = document.getElementById('chat-response');
        chatResponse.innerHTML = 'Loading...';

        // Fetch response from OpenAI API
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                prompt: userInput,
                max_tokens: 150
            })
        })
        .then(response => response.json())
        .then(data => {
            const answer = data.choices[0].text.trim();
            chatResponse.innerHTML = `<p>${answer}</p>`;
        })
        .catch(error => {
            console.error('Error:', error);
            chatResponse.innerHTML = 'Terjadi kesalahan. Silakan coba lagi.';
        });
    });
});
