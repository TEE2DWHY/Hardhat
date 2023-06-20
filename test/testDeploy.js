const {ethers} = require("hardhat")
const {assert} = require("chai")


describe("SimpleStorage", ()=>{
  let simpleStorageFactory, simpleStorage
  beforeEach(async()=>{
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage =   await simpleStorageFactory.deploy()
  })

  it("Should start with age number 0", async()=>{
    const age = await simpleStorage.retrieve();
    const expectedAge = "0";
    assert.equal(expectedAge, age.toString());
  })

  it("Should output a new age", async()=>{
    const expectedAge = "4"
    const transactionResponse = await simpleStorage.newAge(2);
    await transactionResponse.wait(1)
    const currentValue = await simpleStorage.retrieve();
    assert.equal(expectedAge, currentValue.toString())
  })
})