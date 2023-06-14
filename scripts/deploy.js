require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

const { ethers, run, network } = require("hardhat");

const verifyContract = async (contractAddress) => {
  try {
    await run("verify", {
      address: contractAddress,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already verified");
    } else {
      console.log(error);
    }
  }
};

const main = async () => {
  try {
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    console.log("Contract deployment started...");
    const simpleStorage = await SimpleStorage.deploy();
    console.log("Contract deployed:", simpleStorage.target);

    if (network.config.chainId === "goerli" && process.env.ETHERSCAN_APIKEY) {
      await simpleStorage.waitForDeployment(1);
      await verifyContract(simpleStorage.target);
    }
  } catch (error) {
    console.log(error.message);
  }
};

main();
