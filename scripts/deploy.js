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

    if (network.config.chainId === 5 && process.env.ETHERSCAN_APIKEY) {
      await simpleStorage.waitForDeployment(6); // we wait for 6 bocks confirmation before proceeding to verify contract
      await verifyContract(simpleStorage.target);
    }

    // CALL CONTRACT METHODS IN HARDHAT
    const age = await simpleStorage.retrieve()
    console.log(age.toString())
    const transactionResponse = await simpleStorage.newAge(8)
    console.log(transactionResponse);
    await transactionResponse.wait(1); // wait for one block confirmation before retireving new age value
    const newAge = await simpleStorage.retrieve();
    console.log(newAge.toString());
  } catch (error) {
    console.log(error.message);
  }
};

main();
