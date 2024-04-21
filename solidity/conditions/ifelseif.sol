// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ElseIfExample {
    uint public number;

    function setNumber(uint _value) public {
        if (_value > 100) {
            number = _value;
        } else if (_value < 50) {
            number = _value * 2;
        } else {
            number = _value + 5;
        }
    }

    function checkNumber() public view returns (string memory) {
        if (number > 100) {
            return "Greater than 100";
        } else if (number < 50) {
            return "Less than 50";
        } else {
            return "Between 50 and 100";
        }
    }
}

