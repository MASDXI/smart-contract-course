const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  
  describe("MockToken", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployMockTokenLockFixture() {
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
  
      const MockToken = await ethers.getContractFactory("MockToken");
      const token = await MockToken.deploy();
  
      return { token, owner, otherAccount };
    }
  
    describe("Deployment", function () {
      it("Should set the right symbol", async function () {
        const { token } = await loadFixture(deployMockTokenLockFixture);
        
        expect(await token.symbol()).to.equal("USDT");
      });
  
      it("Should set the right name", async function () {
        const { token } = await loadFixture(deployMockTokenLockFixture);
        // expect(action).to.equal(your expect)
        expect(await token.name()).to.equal("Tether USD");
      });
  
      it("Should set the decimals to 6", async function () {
        const { token } = await loadFixture(deployMockTokenLockFixture);
  
        expect(await token.decimals()).to.equal(6);
      });
    });
  
    describe("Mint Token", function () {
  
      describe("Transfers", function () {
        it("Should mint the funds to the caller", async function () {
          const { token, owner } = await loadFixture(deployMockTokenLockFixture);
          const OwnerAddress = await owner.getAddress();
          await token.mint(OwnerAddress, 10n);
          expect(await token.balanceOf(OwnerAddress)).to.equal(10n);
        });
      });
    });
  });
  