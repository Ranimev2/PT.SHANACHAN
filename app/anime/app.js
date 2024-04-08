// URL untuk data anime
const animeDataURL = "https://api.example.com/anime";

// Fungsi untuk mengambil data anime dari API
async function fetchAnimeData() {
  try {
    const response = await fetch(animeDataURL);
    const animeData = await response.json();
    displayAnimeList(animeData);
  } catch (error) {
    console.error("Error fetching anime data:", error);
  }
}

// Fungsi untuk menampilkan daftar anime
function displayAnimeList(animeData) {
  const animeListContainer = document.getElementById("anime-list");
  animeData.forEach(anime => {
    const animeItem = document.createElement("div");
    animeItem.classList.add("anime-item");
    animeItem.innerHTML = `
      <h2>${anime.title}</h2>
      <p>Genre: ${anime.genre}</p>
      <p>Episodes: ${anime.episodes}</p>
    `;
    animeListContainer.appendChild(animeItem);
  });
}

// Panggil fungsi untuk mengambil data anime dari API saat halaman dimuat
window.addEventListener("load", () => {
  fetchAnimeData();
});
