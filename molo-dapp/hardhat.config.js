/**
* @type import('hardhat/config').HardhatUserConfig
*/

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();



const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {},
    mumbai: {
      url: "<https://polygon-mumbai.g.alchemy.com/v2/pSYYd7SGqr09sTjoHDHyH3ahOgDlW3yy",
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  paths: {
    artifacts: "./artifacts",
  },
};
