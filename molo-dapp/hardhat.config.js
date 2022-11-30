require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: "<https://polygon-mumbai.g.alchemy.com/v2/pSYYd7SGqr09sTjoHDHyH3ahOgDlW3yy>",
      accounts: process.env.PRIVATE_KEY,
    },
  },
  paths: {
    artifacts: "./artifacts",
  },
};
