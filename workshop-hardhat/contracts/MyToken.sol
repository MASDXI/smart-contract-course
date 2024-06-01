// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

// create simple access control via ownable contract.
import "@openzeppelin/contracts/access/Ownable.sol"; 
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20, Ownable {

    // Token name: given name
    // Symbol: given symbol
    constructor (
        string memory name, 
        string memory symbol, 
        uint256 value)  
        ERC20(name, symbol) 
        Ownable(msg.sender) { 
        // msg.sender mean who deploying the smart contract.
        _mint(msg.sender, value); 
    }

    // onlyOwner inherit from
    // '@openzeppelin/contracts/access/Ownable.sol'
    function mint(address account, uint256 value) public onlyOwner {
        _mint(account, value);
    }

}