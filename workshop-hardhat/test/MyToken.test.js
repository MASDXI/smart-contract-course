const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  const { parseEther, formatEther } = require("ethers");
  
  describe("MyToken", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployMyTokenLockFixture() {
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
      const name = "My Token"; // given name to token
      const symbol = "Ny"; // given symbol to token
      const amount = parseEther("1000000000"); // pre-mint token
      const MyToken = await ethers.getContractFactory("MyToken");
      const token = await MyToken.deploy(name, symbol, amount);
  
      return { token, owner, otherAccount, name, symbol, amount };
    }
  
    describe("Deployment", function () {
      it("Should set the right symbol", async function () {
        const { token , symbol } = await loadFixture(deployMyTokenLockFixture);
        expect(await token.symbol()).to.equal(symbol);
      });
  
      it("Should set the right name", async function () {
        const { token, name } = await loadFixture(deployMyTokenLockFixture);
        // expect(action).to.equal(your expect)
        expect(await token.name()).to.equal(name);
      });
    });
  
    describe("Mint Token", function () {
      describe("Validations", function () {
        it("Should revert with the right error if caller not owner", async function () {
          const { token, otherAccount } = await loadFixture(deployMyTokenLockFixture);
          const otherAccountAddress = await otherAccount.getAddress();
          await expect(token.connect(otherAccount).mint(otherAccountAddress, parseEther("1")))
            .to.be.reverted;
        });
      });
  
      describe("Transfers", function () {
        it("Should mint the funds to the caller", async function () {
          const { token, owner, amount } = await loadFixture(deployMyTokenLockFixture);
          const OwnerAddress = await owner.getAddress();
          await token.mint(OwnerAddress, parseEther("1"));
          const value = (await token.balanceOf(OwnerAddress)).toString();
          console.log("🚀 ~ value:", formatEther(value));
          // expect().to.equal(0);
        });
      });
    });
  });
  