// Fungsi untuk mencari lagu
async function searchSong(query) {
  try {
    // Gunakan API dari layanan streaming musik (contoh: Spotify)
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`);
    const data = await response.json();

    // Ambil hasil pencarian lagu
    const songs = data.tracks.items;
    return songs;
  } catch (error) {
    console.error('Error saat mencari lagu: ', error);
    return [];
  }
}

// Mendapatkan berita terbaru tentang cryptocurrency
async function getCryptoNews() {
  try {
    // Gunakan API dari layanan berita cryptocurrency (contoh: CoinDesk)
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
    const data = await response.json();

    // Ambil informasi berita terbaru
    const bitcoinPrice = data.bpi.USD.rate;
    const bitcoinDescription = data.bpi.USD.description;

    // Tampilkan berita kepada pengguna
    document.getElementById('news').innerHTML = `<p>Harga Bitcoin saat ini: ${bitcoinPrice} (${bitcoinDescription})</p>`;
  } catch (error) {
    console.error('Error saat mendapatkan berita cryptocurrency: ', error);
    // Tampilkan pesan kesalahan kepada pengguna
    document.getElementById('news').innerHTML = '<p>Terjadi kesalahan saat mendapatkan berita cryptocurrency.</p>';
  }
}

// Mendapatkan saldo Ethereum pengguna
async function getEthBalance() {
  try {
    // Mendapatkan akses ke Ethereum dari Metamask
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const selectedAccount = accounts[0];

    // Mendapatkan saldo Ethereum
    const balance = await ethereum.request({
      method: 'eth_getBalance',
      params: [selectedAccount, 'latest']
    });

    // Mengubah saldo dari wei ke ether
    const balanceEth = ethers.utils.formatEther(balance);

    // Tampilkan saldo kepada pengguna
    document.getElementById('balance').innerHTML = `<p>Saldo Ethereum Anda: ${balanceEth} ETH</p>`;
  } catch (error) {
    console.error('Error saat mendapatkan saldo Ethereum: ', error);
    // Tampilkan pesan kesalahan kepada pengguna
    document.getElementById('balance').innerHTML = '<p>Terjadi kesalahan saat mendapatkan saldo Ethereum.</p>';
  }
}

// Fungsi untuk menampilkan hasil pencarian lagu
async function searchAndDisplay() {
  const query = document.getElementById('searchInput').value;
  const songs = await searchSong(query);

  // Tampilkan hasil pencarian kepada pengguna
  const songListElement = document.getElementById('songList');
  songListElement.innerHTML = '';

  songs.forEach(song => {
    const songElement = document.createElement('div');
    songElement.classList.add('song');
    songElement.textContent = song.name;
    songListElement.appendChild(songElement);
  });
}
