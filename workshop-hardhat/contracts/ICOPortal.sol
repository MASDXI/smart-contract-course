// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

// create simple access control via ownable contract.
import "@openzeppelin/contracts/access/Ownable.sol"; 
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ICOPortal is Ownable {
    // type interface for communicate with ERC20 contract.
    IERC20 private _token;
    IERC20 private _paymentToken;

    uint256 public pricePerToken;
    uint256 public pricePerEther;

    constructor (IERC20 token, IERC20 payment) Ownable(msg.sender) {
        _token = token;
        _paymentToken = payment;
    }

    // This function is executed when a contract receives plain Ether (without data)
    receive() external payable {}

    modifier checkBalanceEnough(uint256 amount) {
        require(_token.balanceOf(address(this)) >= amount,"not enough token for buy");
        _;
    }

    function setPrice(uint256 newPricePerToken) public {
        pricePerToken = newPricePerToken;
    }

    function setPriceEther(uint256 newPricePerEther) public {
        pricePerEther = newPricePerEther;
    }

    function calculatePrice(uint256 amount) public view returns (uint256) {
        return amount * pricePerToken;
    }

    function calculatePriceEther(uint256 amount) public view returns (uint256) {
        return amount * pricePerEther;
    }

    function buyTokenWithToken(uint256 amount) public checkBalanceEnough(amount) {
        uint256 calcaulatedPrice = calculatePrice(amount);
        _paymentToken.transferFrom(msg.sender, owner(), calcaulatedPrice);
        _token.transfer(msg.sender, amount);
    }

    function buyTokenWithEther(uint256 amount) public checkBalanceEnough (amount) payable {
        uint256 calcaulatedPrice = calculatePriceEther(msg.value);
        require(msg.value >= calcaulatedPrice,"can't buy with zero Ether");
        _token.transfer(msg.sender, amount);
        (bool sent, bytes memory data) = owner().call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        // TODO change ether back to the buyer
    }

}
