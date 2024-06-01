// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockToken is ERC20 {

    // Token name: Tether USD
    // Symbol: USDT
    constructor () ERC20("Tether USD","USDT") {}

    function mint(address account, uint256 value) public {
        // _mint inherit from
        // 'openzeppelin/contracts/token/ERC20/ERC20.sol'
        _mint(account, value);
    }

    function decimals() public pure override returns (uint8) {
        return 6;
    }

}