document.addEventListener("DOMContentLoaded", () => {
    const API_KEY_NEWS = 'YOUR_NEWS_API_KEY_HERE';
    const API_URL_NEWS = `https://newsapi.org/v2/top-headlines?country=id&apiKey=${API_KEY_NEWS}`;
    const API_URL_CRYPTO = 'https://api.yourcryptoswapservice.com/swap';

    // Fetch Berita AI
    fetch(API_URL_NEWS)
        .then(response => response.json())
        .then(data => {
            const newsContent = document.getElementById('news-content');
            data.articles.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.innerHTML = `
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                `;
                newsContent.appendChild(articleElement);
            });
        })
        .catch(error => console.error('Error fetching news:', error));

    // Crypto Swap
    document.getElementById('crypto-form').addEventListener('submit', event => {
        event.preventDefault();
        const amount = document.getElementById('crypto-amount').value;
        const from = document.getElementById('crypto-from').value;
        const to = document.getElementById('crypto-to').value;

        fetch(API_URL_CRYPTO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount, from, to })
        })
        .then(response => response.json())
        .then(data => {
            const resultElement = document.getElementById('crypto-result');
            resultElement.innerHTML = `
                <p>${amount} ${from} = ${data.result} ${to}</p>
            `;
        })
        .catch(error => console.error('Error with crypto swap:', error));
    });
});
