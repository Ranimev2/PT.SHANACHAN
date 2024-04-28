// Import web3 library
const Web3 = require('web3');

// Initialize Web3 menggunakan Metamask provider
window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            // Request izin akses ke akun pengguna jika belum terhubung
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Metamask connected:', window.web3);
            // Panggil fungsi untuk memuat data blockchain setelah Metamask terhubung
            loadData();
        } catch (error) {
            console.error('User denied access to Metamask:', error);
        }
    } else {
        console.error('Metamask not detected!');
    }
});

// Fungsi untuk memuat data blockchain
async function loadData() {
    // Cek apakah akun pengguna tersedia
    const accounts = await window.web3.eth.getAccounts();
    if (accounts.length > 0) {
        const address = accounts[0];
        console.log('User account:', address);
        // Ambil saldo BNB akun pengguna
        const balance = await window.web3.eth.getBalance(address);
        console.log('Account balance:', window.web3.utils.fromWei(balance, 'ether'), 'BNB');
        // Ambil nomor blok terbaru
        const blockNumber = await window.web3.eth.getBlockNumber();
        console.log('Latest block number:', blockNumber);
    } else {
        console.error('No accounts found!');
    }
}
