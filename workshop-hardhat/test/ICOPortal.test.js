const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  const { parseEther, formatEther, provider } = require("ethers");
  
  describe("ICOPortal", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployICOPortalLockFixture() {
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
      const name = "My Token"; // given name to token
      const symbol = "Ny"; // given symbol to token
      const amount = parseEther("1000000000"); // pre-mint token
      // load contract from artifacts.
      const MockToken = await ethers.getContractFactory("MockToken");
      const MyToken = await ethers.getContractFactory("MyToken");
      const ICOPortal = await ethers.getContractFactory("ICOPortal");
      // deploy contract in sequence.
      const mockToken = await MockToken.deploy();
      const token = await MyToken.deploy(name, symbol, amount);
      const ico = await ICOPortal.deploy(token.getAddress(), mockToken.getAddress());
      return { mockToken, token, ico, owner, otherAccount, name, symbol, amount };
    }
  
    describe("Deployment", function () {
      it("Should set the right price per token", async function () {
        const { ico } = await loadFixture(deployICOPortalLockFixture);
        await ico.setPrice(1);
        expect(await ico.pricePerToken()).to.equal(1);
      });
  
      it("Should set the right price per ether", async function () {
        const { ico } = await loadFixture(deployICOPortalLockFixture);
        await ico.setPriceEther(1);
        expect(await ico.pricePerEther()).to.equal(1);
      });

      it("Should get the right token balance of ICO contract", async function () {
        const { ico, token, owner } = await loadFixture(deployICOPortalLockFixture);
        const icoAddress = await ico.getAddress();
        expect(await token.balanceOf(icoAddress)).to.equal(0);
        // deposit token to ico contract via minting function.
        await token.connect(owner).mint(icoAddress, parseEther("1000000"));
        expect(await token.balanceOf(icoAddress)).to.equal(parseEther("1000000"));
        // deposit token to ico contract via transfer function.
        await token.connect(owner).transfer(icoAddress, parseEther("1"));
        expect(await token.balanceOf(icoAddress)).to.equal(parseEther("1000001"))
      });      
    });
  
    describe("Buy Token", function () {
      describe("Validations", function () {
        it("Should revert with the right error if token not enough to buy", async function () {
          const { ico, otherAccount } = await loadFixture(deployICOPortalLockFixture);
          await expect(ico.connect(otherAccount).buyTokenWithToken(1000)).to.be.revertedWith("not enough token for buy");
        });
      });

      describe("Functional", function () {
        it("Should success buy token with token", async function () {
          const { ico, token, owner, otherAccount, mockToken } = await loadFixture(deployICOPortalLockFixture);
          const icoAddress = await ico.getAddress();
          expect(await token.balanceOf(icoAddress)).to.equal(0);
          // deposit token to ico contract via minting function.
          await token.connect(owner).mint(icoAddress, parseEther("1000000"));
          expect(await token.balanceOf(icoAddress)).to.equal(parseEther("1000000"));
          // deposit token to ico contract via transfer function.
          await token.connect(owner).transfer(icoAddress, parseEther("1"));
          expect(await token.balanceOf(icoAddress)).to.equal(parseEther("1000001"));

          await ico.connect(owner).setPrice(1);
          const ownerAddress = await owner.getAddress();
          const otherAccountAddress = await otherAccount.getAddress();
          //  other account approve mock token to ico contract 1000
          await mockToken.connect(otherAccount).approve(icoAddress, 1000);
          // mint for other account 1000
          await mockToken.connect(otherAccount).mint(otherAccountAddress, 1000);
          await ico.connect(otherAccount).buyTokenWithToken(1000);
          console.log("otherAccount myToken amount",await token.connect(otherAccount).balanceOf(otherAccount));
          console.log("otherAccount mockToken amount",await mockToken.connect(otherAccount).balanceOf(otherAccount));
          console.log("ico mockToken amount",await mockToken.connect(otherAccount).balanceOf(icoAddress));
          console.log("owner mockToken amount",await mockToken.connect(owner).balanceOf(ownerAddress));
        });

        it("Should success buy token with token", async function () {
          const { ico, token, owner, otherAccount, mockToken } = await loadFixture(deployICOPortalLockFixture);
          const icoAddress = await ico.getAddress();
          expect(await token.balanceOf(icoAddress)).to.equal(0);
          // deposit token to ico contract via minting function.
          await token.connect(owner).mint(icoAddress, parseEther("1000000"));
          expect(await token.balanceOf(icoAddress)).to.equal(parseEther("1000000"));
          // deposit token to ico contract via transfer function.
          await token.connect(owner).transfer(icoAddress, parseEther("1"));
          expect(await token.balanceOf(icoAddress)).to.equal(parseEther("1000001"));

          await ico.connect(owner).setPriceEther(1);
          const ownerAddress = await owner.getAddress();
          const otherAccountAddress = await otherAccount.getAddress();
          console.log("before owner ether amount", formatEther(await ethers.provider.getBalance(ownerAddress)));
          console.log("before otherAccount ether amount", formatEther(await ethers.provider.getBalance(otherAccountAddress)));
          await ico.connect(otherAccount).buyTokenWithEther(1000,{value:1000});
          console.log("otherAccount myToken amount", formatEther(await token.connect(otherAccount).balanceOf(otherAccount)));
          console.log("after otherAccount ether amount", formatEther((await ethers.provider.getBalance(otherAccountAddress))));
          console.log("ico ether amount", formatEther(await ethers.provider.getBalance(icoAddress)));
          console.log("after owner ether amount", formatEther(await ethers.provider.getBalance(ownerAddress)));
        });
      });
  
      describe("Withdrawals", function () {
        it("Should withdraw the funds to the owner", async function () {
          const { token, owner, amount } = await loadFixture(deployICOPortalLockFixture);
          const OwnerAddress = await owner.getAddress();
          await token.mint(OwnerAddress, parseEther("1"));
          const value = (await token.balanceOf(OwnerAddress)).toString();
          console.log("🚀 ~ value:", formatEther(value));
          // expect().to.equal(0);
        });
      });
    });
  });
  