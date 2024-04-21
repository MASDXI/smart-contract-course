// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TryCatchExample {
    event ErrorHandled(string reason);

    function divide(uint _numerator, uint _denominator) public returns (uint result) {
        try this.externalDivideFunction(_numerator, _denominator) returns (uint _result) {
            result = _result;
        } catch Error(string memory reason) {
            emit ErrorHandled(reason);
        } catch (bytes memory) {
            emit ErrorHandled("An error occurred, but it was not a string");
        }
    }

    function externalDivideFunction(uint _numerator, uint _denominator) external pure returns (uint) {
        require(_denominator != 0, "Denominator must be non-zero");
        return _numerator / _denominator;
    }
}
