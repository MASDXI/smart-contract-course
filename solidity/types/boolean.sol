// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VariableDemo {
    bool private status;

    function setBoolTrue() internal {
        status = true;
    }

    function setBoolFalse() internal {
        status = false;
    }

    function getStatus() public view returns (bool) {
        return status;
    }

    function getStatusInUint8() public view returns (uint8) {
        bytes memory statusBytes = bytes(abi.encodePacked(status));
        uint8 statusUint8;
        assembly {
            statusUint8 := mload(add(statusBytes, 0x01))
        }
        return statusUint8;
    }
    
}

contract Boolean is VariableDemo {

    function setBool() public {
        if (getStatus() == true) {
            setBoolFalse();
        } else {
            setBoolTrue();
        }
    }

}