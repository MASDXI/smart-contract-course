// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RequiredRevertExample {
    address public owner;
    uint public threshold = 100;

    constructor() {
        owner = msg.sender;
    }

    function withdraw(uint _amount) public {
        require(msg.sender == owner, "Only the owner can withdraw");
        require(_amount <= threshold, "Withdrawal amount exceeds threshold");

        // Perform the withdrawal logic
        // (This is just a placeholder)
        // For demonstration purposes, we'll just emit an event
        emit Withdrawal(msg.sender, _amount);
    }

    event Withdrawal(address indexed user, uint amount);
}
