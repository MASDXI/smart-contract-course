const { ethers, JsonRpcProvider, WebSocketProvider } = require('ethers');
const { Web3 } = require('web3');

// HTTPS with Etherjs
const ethershttp = async () => {
  const provider = new JsonRpcProvider("http://localhost:8545/");
  const network = await provider.getNetwork();
  console.log("🚀 ~ ethershttp ~ network:", network.chainId)
};

ethershttp();

// Websocket with Ethers
const etherws = async (blocks) => {
    const provider = new WebSocketProvider("ws://localhost:8545/");
    let i = 1;
    provider.on('block', async (blockNubmer) => {
        let hash = await provider.getBlock(blockNubmer);
        console.log("🚀 ~ provider.on ~ hash:", hash)
        console.log('New Block: ' + blockNubmer);
        if (i >= blocks) {
            provider.off('block',);
            process.exit()
        }
        i++;
    });
};

// etherws(15);

const web3 = new Web3('http://localhost:8545');

const web3http = async () => {
    let network = await web3.eth.getChainId();
    console.log("🚀 ~ web3http:", network);
};

web3http();
// For more methods: https://docs.web3js.org/libdocs/Web3Eth
