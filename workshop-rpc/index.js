// Importing Web3.js and Ethers.js
const Web3 = require('web3');
const { ethers } = require('ethers');

// Connecting to an Ethereum node using Web3.js
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
web3.eth.getBlockNumber()
    .then(blockNumber => {
        console.log('Current Ethereum block number:', blockNumber);
    })
    .catch(error => {
        console.error('Error connecting to Ethereum:', error);
    });

// Connecting to an Ethereum node using Ethers.js
const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
provider.getBlockNumber()
    .then(blockNumber => {
        console.log('Current Ethereum block number:', blockNumber);
    })
    .catch(error => {
        console.error('Error connecting to Ethereum:', error);
    });

// Comparison with connecting to databases
// Connecting to PostgreSQL
// const { Pool } = require('pg');
// const pgPool = new Pool({
//     user: 'your_username',
//     host: 'localhost',
//     database: 'your_database',
//     password: 'your_password',
//     port: 5432,
// });
// pgPool.query('SELECT NOW()', (err, res) => {
//     if (err) {
//         console.error('Error connecting to PostgreSQL:', err);
//     } else {
//         console.log('Connected to PostgreSQL. Current timestamp:', res.rows[0].now);
//     }
//     pgPool.end();
// });

// Connecting to MongoDB
// const { MongoClient } = require('mongodb');
// const uri = 'mongodb://localhost:27017';
// const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoClient.connect((err, client) => {
//     if (err) {
//         console.error('Error connecting to MongoDB:', err);
//     } else {
//         console.log('Connected to MongoDB.');
//         const db = client.db('your_database');
//         db.command({ serverStatus: 1 }, (err, res) => {
//             if (err) {
//                 console.error('Error checking MongoDB server status:', err);
//             } else {
//                 console.log('MongoDB server status:', res);
//             }
//             client.close();
//         });
//     }
// });
