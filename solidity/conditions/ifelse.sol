// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IfElseExample {
    uint public number;

    // Function to set the value of 'number' based on a condition
    function setNumber(uint _value) public {
        if (_value > 10) {
            number = _value;
        } else {
            number = 0;
        }
    }

    // Function to check if 'number' is greater than 10
    function checkNumber() public view returns (bool) {
        if (number > 10) {
            return true;
        } else {
            return false;
        }
    }
}
