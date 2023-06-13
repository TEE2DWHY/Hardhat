require("dotenv").config()
require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig */

const GEORLI = process.env.GOERLI_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: GEORLI,
      accounts: [PRIVATE_KEY],
      chainId: 5
    }
  },
  solidity: "0.8.18",
};
