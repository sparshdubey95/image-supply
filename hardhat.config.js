// filepath: d:\Code Files\image-supply-tracker\image-supply\hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");

const GANACHE_URL = "http://127.0.0.1:8545"; // Adjust if needed

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: { chainId: 1337 },
    ganache: { url: GANACHE_URL }
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
}