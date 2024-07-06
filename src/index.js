import Web3 from 'web3';
import { abi, contractAddress } from './contract'; // Make sure to replace with actual ABI and address

// Connect to Sepolia testnet using Infura
const web3 = new Web3(`https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
const shippingContract = new web3.eth.Contract(abi, contractAddress);

let accounts;

window.addEventListener('load', async () => {
    if (window.ethereum) {
        try {
            // Request account access
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            web3.setProvider(window.ethereum); // Use MetaMask's provider
        } catch (error) {
            console.error("User denied account access");
        }
    } else {
        console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }

    // Event listener for payment button
    document.getElementById('payButton').addEventListener('click', () => {
        shippingContract.methods.receivePayment().send({
            from: accounts[0],
            value: web3.utils.toWei('1', 'ether') // Adjust the value as needed
        })
        .on('transactionHash', (hash) => {
            console.log(`Transaction hash: ${hash}`);
        })
        .on('confirmation', (confirmationNumber, receipt) => {
            console.log(`Confirmation number: ${confirmationNumber}`);
        })
        .on('receipt', (receipt) => {
            console.log(`Transaction receipt: ${receipt}`);
        })
        .on('error', console.error);
    });

    // Event listener for prepare shipment button
    document.getElementById('prepareShipmentButton').addEventListener('click', () => {
        shippingContract.methods.prepareShipment().send({ from: accounts[0] })
        .on('transactionHash', (hash) => {
            console.log(`Transaction hash: ${hash}`);
        })
        .on('confirmation', (confirmationNumber, receipt) => {
            console.log(`Confirmation number: ${confirmationNumber}`);
        })
        .on('receipt', (receipt) => {
            console.log(`Transaction receipt: ${receipt}`);
        })
        .on('error', console.error);
    });

    // Event listener for hold shipment button
    document.getElementById('holdShipmentButton').addEventListener('click', () => {
        shippingContract.methods.holdShipment().send({ from: accounts[0] })
        .on('transactionHash', (hash) => {
            console.log(`Transaction hash: ${hash}`);
        })
        .on('confirmation', (confirmationNumber, receipt) => {
            console.log(`Confirmation number: ${confirmationNumber}`);
        })
        .on('receipt', (receipt) => {
            console.log(`Transaction receipt: ${receipt}`);
        })
        .on('error', console.error);
    });

    // Event listener for withdraw button
    document.getElementById('withdrawButton').addEventListener('click', () => {
        shippingContract.methods.withdrawPayment().send({ from: accounts[0] })
        .on('transactionHash', (hash) => {
            console.log(`Transaction hash: ${hash}`);
        })
        .on('confirmation', (confirmationNumber, receipt) => {
            console.log(`Confirmation number: ${confirmationNumber}`);
        })
        .on('receipt', (receipt) => {
            console.log(`Transaction receipt: ${receipt}`);
        })
        .on('error', console.error);
    });
});
