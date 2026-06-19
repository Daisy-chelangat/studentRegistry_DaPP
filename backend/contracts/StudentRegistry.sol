// SPDX-License-Identifier: MIT


pragma solidity ^0.8.24;

contract StudentRegistry {

    address public owner;
    struct Student {
        uint256 id;
        string name;
        uint256 age;
        string course;
        bool exists;

    }

    mapping(uint256 => Student) private students;
    uint256[] private studentIds;
    uint256 private nextId;


    event StudentAdded(uint256 id, string name, uint256 age, string course);
    event StudentUpdated(uint256 id, string name, uint256 age, string course);
    event StudentDeleted(uint256 id);

    modifier onlyOwner(){
        require(msg.sender == owner, "Not authorized: only owner (teacher) can perform this action");
        _;
    }

    constructor(){
        owner = msg.sender;
    }

     function addStudent(string memory _name, uint256 _age, string memory _course) public onlyOwner {
        uint256 id = nextId;
        students[id]= Student(id, _name ,_age ,_course, true);
        studentIds.push (id);
        nextId++;

        emit StudentAdded(id, _name, _age, _course);
    }

    function getStudent(uint256 _id) public view returns (uint256, string memory, uint256, string memory) {
        require(students[_id].exists, "Student does not exist");
        Student memory s = students[_id];
        return (s.id, s.name, s.age, s.course);
    }
    
    function getAllStudents() public view returns (Student[] memory) {
        uint256 activeCount = 0;
        for (uint256 i = 0; i < studentIds.length; i++) {
            if (students[studentIds[i]].exists) {
                activeCount++;
            }
        }

        Student[] memory result = new Student[](activeCount);
        uint256 index = 0;
        for (uint256 i = 0; i < studentIds.length; i++) {
            if (students[studentIds[i]].exists) {
                result[index] = students[studentIds[i]];
                index++;
            }
        }
        return result;
    }

    function updateStudent(uint256 _id, string memory _name, uint256 _age, string memory _course) public onlyOwner {
        require(students[_id].exists, "Student does not exist");

        students[_id].name = _name;
        students[_id].age = _age;
        students[_id].course = _course;

        emit StudentUpdated(_id, _name, _age, _course);
    }

    function deleteStudent(uint256 _id) public onlyOwner {
        require(students[_id].exists, "Student does not exist");

        delete students[_id];

        emit StudentDeleted(_id);
    }
}


