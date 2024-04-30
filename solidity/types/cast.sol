// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VariableDemo {
    // State variables
    uint public uintVar;
    int public intVar;

    // function setUint(uint256 value) public {
    //     uintVar = value;
    // }
    
    // function setint(int256 value) public {
    //     intVar = value;
    // }

    function castUintToInt(uint256 value) public {
        intVar = int256(value);
    }

    function castIntToUint(int256 value) public {
        uintVar = uint256(value);
    }

    function castBigToSmall(uint256 value) public {
        uintVar = uint8(value);
    }

    function castSmallToBig(uint8 value) public {
        uintVar = uint256(value);
    }
}