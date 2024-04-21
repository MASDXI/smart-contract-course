pragma solidity ^0.8.0;

contract ContinueExample {
    uint public oddSum;
    
    function calculateOddSum(uint[] memory numbers) public {
        oddSum = 0;
        for(uint i = 0; i < numbers.length; i++) {
            if(numbers[i] % 2 == 0) {
                continue; // Skip even numbers
            }
            oddSum += numbers[i];
        }
    }
}

