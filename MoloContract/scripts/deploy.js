// Import the necessary libraries
// const { ethers } = require('hardhat');
const hre = require("hardhat");
const { writeFileSync } = require('fs');
require('dotenv').config();

// Declare the main function as an async function
async function main() {
  // Compile the contract if needed
  await hre.ethers.getContractFactory('MoloContract')

  // Get the deployer's signer account
  const [deployer] = await hre.ethers.getSigners()

  console.log("Deploying contracts with the account:", deployer.address);

  // Get the contract factory for the MoloContract
  const MoloContract = await hre.ethers.getContractFactory('MoloContract');

  // Deploy the contract and assign it to a variable
  const moloContract = await MoloContract.deploy();

  // Wait for the contract to be deployed and confirmed
  await moloContract.deployed();

  // Log the address of the deployed contract to the console
  console.log('MoloContract deployed to:', moloContract.address)

  // Convert the contract ABI to a string and store it in a variable
  const contractAbi = JSON.stringify(moloContract.abi)

  // Write the contract address, owner address, and ABI to a config file
  writeFileSync(
    './config.js',
    `
    export const contractAddress = "${moloContract.address}"
    export const ownerAddress = "${deployer.address}"
    export const contractAbi = ${contractAbi}
    `
  )
}

// Call the main function, then exit the process with exit code 0 if successful
// If an error occurs, log it to the console and exit the process with exit code 1
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
