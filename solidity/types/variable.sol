// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VariableDemo {
    // State variables
    uint public uintVar;
    int public intVar;
    bool public boolVar;
    address public addressVar;
    string public stringVar;
    bytes32 public bytes32Var;
    enum State { Inactive, Active }
    State public enumVar;

    // Array variables
    uint[] public uintArray;
    address[] public addressArray;
    string[] public stringArray;

    // Mapping variables
    mapping(address => uint) public uintMapping;
    mapping(address => bool) public boolMapping;
    mapping(string => uint) public stringMapping;

    // Constructor
    constructor() {
        uintVar = 123;
        intVar = -456;
        boolVar = true;
        addressVar = msg.sender;
        stringVar = "Hello, Solidity!";
        bytes32Var = keccak256(abi.encodePacked(stringVar));
        enumVar = State.Active;

        uintArray.push(1);
        uintArray.push(2);
        uintArray.push(3);

        addressArray.push(msg.sender);
        addressArray.push(address(0x123));

        stringArray.push("foo");
        stringArray.push("bar");

        uintMapping[msg.sender] = 1000;
        boolMapping[msg.sender] = true;
        stringMapping["key"] = 12345;
    }

    // Function to demonstrate local variables
    function demoLocalVariables() public pure returns (uint, address, string memory) {
        uint localVar = 789;
        address addrVar = address(0x456);
        string memory strVar = "Local variable demo";
        return (localVar, addrVar, strVar);
    }

    // Function to update state variables
    function updateStateVariables(uint _newValue, string memory _newString) public {
        uintVar = _newValue;
        stringVar = _newString;
    }

    // Function to add elements to array variables
    function addToArray(uint _value, address _addr, string memory _str) public {
        uintArray.push(_value);
        addressArray.push(_addr);
        stringArray.push(_str);
    }

    // Function to update mapping variables
    function updateMapping(address _addr, bool _boolValue, string memory _key, uint _value) public {
        uintMapping[_addr] = _value;
        boolMapping[_addr] = _boolValue;
        stringMapping[_key] = _value;
    }
}
