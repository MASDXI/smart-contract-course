// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RevertSample {
    uint public threshold = 10;

    function withdraw(uint _amount) public {
        if (_amount > threshold) {
            revert("Withdrawal amount exceeds threshold");
        }
        
        // Perform the withdrawal logic
        // (This is just a placeholder)
        // For demonstration purposes, we'll just emit an event
        emit Withdrawal(msg.sender, _amount);
    }
    
    event Withdrawal(address indexed user, uint amount);
}
