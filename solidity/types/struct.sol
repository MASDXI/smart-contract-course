// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VariableDemo {
    string public sentence;

    enum SEXUAL  { FEMALE, MALE, LGBTQ }

    enum DEGREE { BE, MS, PHD }

    struct Education {
        DEGREE degree;
    }

    struct Info {
        string firstname;
        string lastname;
        Body physical;
        SEXUAL sex;
        mapping(uint256 => uint256) balance;
        Education [] educations;
    }

    struct Body {
        uint8 weight;
        uint8 height;
    }

    Info public information;

    function setSentence(string memory text) public {
        sentence = text;
    }

    function clearSentence() public {
        sentence = "";
    }

    function setInfo(
        string memory firstname, 
        string memory lastname,
        uint8 weight,
        uint8 height,
        SEXUAL sex) public {
        information.firstname = firstname;
        information.lastname = lastname;
        information.physical.weight = weight;
        information.physical.height = height;
        information.sex = sex;
    }
    
    function setEducation(DEGREE degree) public {
        Education memory temp;
        temp.degree = degree;
        information.educations.push(temp);
    }

    function getEducation(uint256 index) public view returns (DEGREE) {
        return information.educations[index].degree;
    }

    function setBalance(uint256 accountNumber,
        uint256 value) public {
        information.balance[accountNumber] = value;
    }

    function getBalance(uint256 accountNumber) 
        public view returns (uint256) {
        return information.balance[accountNumber];
    }
}