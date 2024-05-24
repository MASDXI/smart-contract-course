// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VariableDemo {
    // status declare without state so status is false by the default.
    bool private status;

    // set variable name status to 'true'.
    function setBoolTrue() internal {
        status = true;
    }

    // set variable name status to 'false'.
    function setBoolFalse() internal {
        status = false;
    }

    // call get state of status variable.
    function getStatus() public view returns (bool) {
        return status;
    }

    // return status into uint8 by casting the type.
    function getStatusInUint8() public view returns (uint8) {
        bytes memory statusBytes = bytes(abi.encodePacked(status));
        uint8 statusUint8;
        assembly {
            statusUint8 := mload(add(statusBytes, 0x01))
        }
        return statusUint8;
    }
    
}

// Boolean Contract inherit VariableDemo
contract Boolean is VariableDemo {

    // set bool function.
    function setBool() public {
        if (getStatus() == true) {
            setBoolFalse();
        } else {
            setBoolTrue();
        }
    }

}