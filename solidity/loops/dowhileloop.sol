pragma solidity ^0.8.0;

contract LoopExample {
    uint public sum;
    
    function calculateSum(uint n) public {
        sum = 0;
        uint i = 1; 
        do {
            sum += i;
            i++;
        } while(i <= n);
    }
}

