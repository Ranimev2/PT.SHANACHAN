const animeList = [
    { title: "One Piece", description: "Action, Adventure, Comedy", genre: "Shounen" },
    { title: "Naruto", description: "Action, Adventure, Fantasy", genre: "Shounen" },
    { title: "Attack on Titan", description: "Action, Drama, Fantasy", genre: "Shounen" },
    { title: "My Hero Academia", description: "Action, Comedy, Super Power", genre: "Shounen" },
    { title: "Sword Art Online", description: "Action, Adventure, Fantasy", genre: "Shounen" },
    { title: "Death Note", description: "Mystery, Psychological, Supernatural", genre: "Shounen" },
    // Add more anime as needed
];

let bookmarkedAnime = [];

function renderAnimeList(animeData) {
    const animeListElement = document.getElementById('anime-list');
    animeListElement.innerHTML = '';

    animeData.forEach(anime => {
        const animeCard = document.createElement('div');
        animeCard.classList.add('anime-card');
        animeCard.innerHTML = `
            <h2>${anime.title}</h2>
            <p>${anime.description}</p>
            <p><strong>Genre:</strong> ${anime.genre}</p>
        `;
        animeCard.addEventListener('click', () => openModal(anime));
        animeListElement.appendChild(animeCard);
    });
}

function openModal(anime) {
    const modal = document.getElementById('anime-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const bookmarkBtn = document.getElementById('bookmark-btn');

    modalTitle.textContent = anime.title;
    modalDescription.textContent = anime.description;

    if (bookmarkedAnime.includes(anime)) {
        bookmarkBtn.textContent = "Remove Bookmark";
        bookmarkBtn.classList.add('bookmarked');
    } else {
        bookmarkBtn.textContent = "Bookmark";
        bookmarkBtn.classList.remove('bookmarked');
    }

    modal.style.display = "block";

    const closeModalBtn = document.getElementsByClassName("close")[0];
    closeModalBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    bookmarkBtn.onclick = function() {
        if (bookmarkedAnime.includes(anime)) {
            const index = bookmarkedAnime.indexOf(anime);
            bookmarkedAnime.splice(index, 1);
            bookmarkBtn.textContent = "Bookmark";
            bookmarkBtn.classList.remove('bookmarked');
        } else {
            bookmarkedAnime.push(anime);
            bookmarkBtn.textContent = "Remove Bookmark";
            bookmarkBtn.classList.add('bookmarked');
        }
    }
}

document.getElementById('all-anime-btn').addEventListener('click', () => renderAnimeList(animeList));
document.getElementById('bookmarked-anime-btn').addEventListener('click', () => renderAnimeList(bookmarkedAnime));

document.addEventListener('DOMContentLoaded', () => {
    renderAnimeList(animeList);
});
              
