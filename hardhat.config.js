require("dotenv").config();
require("./tasks/blockNumber");
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require("solidity-coverage");
/** @type import('hardhat/config').HardhatUserConfig */

const GEORLI = process.env.GOERLI_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_APIKEY = process.env.ETHERSCAN_APIKEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: GEORLI,
      accounts: [PRIVATE_KEY],
      chainId: 5
    },
    localhost:{
      url: "http://127.0.0.1:8545/",
      chainId: 31337
    }
  },
  solidity: "0.8.18",
   etherscan:{
    apiKey: ETHERSCAN_APIKEY
  },
  gasReporter:{
    enabled: true,
    // outputFile: "gas-report.txt",
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: "MATIC"
  }
};
