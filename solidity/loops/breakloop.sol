pragma solidity ^0.8.0;

contract BreakExample {
    bool public found;
    uint public index;
    
    function findNumber(uint[] memory numbers, uint target) public {
        found = false;
        for(uint i = 0; i < numbers.length; i++) {
            if(numbers[i] == target) {
                found = true;
                index = i;
                break; // Exit the loop when target is found
            }
        }
    }
}

