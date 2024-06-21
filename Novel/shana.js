document.addEventListener("DOMContentLoaded", () => {
    const sliderInner = document.querySelector('.slider-inner');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    let currentIndex = 0;

    function updateSlider() {
        const slideWidth = slides[0].offsetWidth + 10; // slide width + margin
        const newTransform = -currentIndex * slideWidth;
        sliderInner.style.transform = `translateX(${newTransform}px)`;
    }

    nextButton.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    const novels = [
        { title: "Novel 1", thumbnail: "https://via.placeholder.com/100x150" },
        { title: "Novel 2", thumbnail: "https://via.placeholder.com/100x150" },
        { title: "Novel 3", thumbnail: "https://via.placeholder.com/100x150" },
        { title: "Novel 4", thumbnail: "https://via.placeholder.com/100x150" },
    ];

    const novelList = document.getElementById('novel-list');

    novels.forEach(novel => {
        const novelItem = document.createElement('div');
        novelItem.classList.add('novel-item');
        
        const novelImage = document.createElement('img');
        novelImage.src = novel.thumbnail;
        novelImage.alt = novel.title;
        
        const novelTitle = document.createElement('h3');
        novelTitle.textContent = novel.title;
        
        novelItem.appendChild(novelImage);
        novelItem.appendChild(novelTitle);
        
        novelList.appendChild(novelItem);
    });

    const mangas = [
        { title: "Manga 1", thumbnail: "https://via.placeholder.com/100x150", link: "https://example.com/manga1" },
        { title: "Manga 2", thumbnail: "https://via.placeholder.com/100x150", link: "https://example.com/manga2" },
        { title: "Manga 3", thumbnail: "https://via.placeholder.com/100x150", link: "https://example.com/manga3" },
        { title: "Manga 4", thumbnail: "https://via.placeholder.com/100x150", link: "https://example.com/manga4" },
    ];

    const mangaList = document.getElementById('manga-list');

    mangas.forEach(manga => {
        const mangaItem = document.createElement('div');
        mangaItem.classList.add('manga-item');

        const mangaLink = document.createElement('a');
        mangaLink.href = manga.link;
        mangaLink.target = "_blank";
        
        const mangaImage = document.createElement('img');
        mangaImage.src = manga.thumbnail;
        mangaImage.alt = manga.title;
        
        const mangaTitle = document.createElement('h3');
        mangaTitle.textContent = manga.title;

        mangaLink.appendChild(mangaImage);
        mangaItem.appendChild(mangaLink);
        mangaItem.appendChild(mangaTitle);
        
        mangaList.appendChild(mangaItem);
    });
});
          
