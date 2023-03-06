const dotenv = require('dotenv');
const { HardhatNetworkUserConfig } = require('hardhat/types/config');

// Load environment variables from .env file
dotenv.config();

const PRIVATE_KEY = `0x${process.env.PRIVATE_KEY}`;
const POLYGONSCAN_KEY = process.env.POLYGONSCAN_KEY;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config = {
  solidity: '0.8.9',
  networks: {
    mumbai: {
      url: process.env.MUMBAI_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};

// Export config
module.exports = config;
