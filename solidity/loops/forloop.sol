pragma solidity ^0.8.0;

contract LoopExample {
    uint public sum;
    
    function calculateSum(uint n) public {
        sum = 0;
        // checking condtion before do
        for(uint i = 1; i <= n; i++) {
            sum += i;
        }
    }
}

