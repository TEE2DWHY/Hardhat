const ethers = require("hardhat")

const main = async () =>{
  try{
    const simpleStorageFactory  = await ethers.ethers.getContractFactory(
      "SimpleStorage"
    )
    console.log("contract is been deployed");
    const SimpleStorage = await simpleStorageFactory.deploy()
    console.log(SimpleStorage.target)
  }
  catch(err){
    console.log(err.message)
  }
}

main()