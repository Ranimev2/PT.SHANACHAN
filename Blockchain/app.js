// Import web3 library
const Web3 = require('web3');

// Initialize Web3 with Infura provider
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'));

// Ethereum address to get blockchain information
const address = '0x...'; // Replace with your Ethereum address

// Get blockchain information
web3.eth.getBlockNumber().then(blockNumber => {
    console.log('Latest block number:', blockNumber);
});

web3.eth.getBalance(address).then(balance => {
    console.log('Balance of', address, 'is:', web3.utils.fromWei(balance, 'ether'), 'ETH');
});

// Subscribe to new block headers
web3.eth.subscribe('newBlockHeaders', (error, result) => {
    if (!error) {
        console.log('New block header:', result);
    } else {
        console.error('Error:', error);
    }
});
