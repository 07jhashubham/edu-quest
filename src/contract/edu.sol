// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Eduquest{
    
    uint256 currentid = 0;

    enum QuestionStatus { Unanswered, Answered, Pending , Rejected  }

    struct Question{
        uint256 question_id;
        string question;
        string[] options;
        uint8 correct_option;
        string comment;
        address asked_by;
        address answered_by;
        uint grant;
        QuestionStatus status;
    }

    address public owner;

    mapping(address => uint16) public rating;

    Question[] all_questions;
    mapping(address => uint256[]) public asked_questions;
    mapping(address => uint256[]) public answered_questions;
    mapping(uint256 => Question) public question_from_id;

    // modifier onlyOwner() {
    //     require(msg.sender == owner, "Caller is not the owner");
    //     _;
    // }
    receive() external payable {

    }
    constructor() {
        owner = msg.sender;
    }

    event question_posted(address indexed asked_by, uint grant , uint256 question_id);
    event question_answered(address indexed answered_by, uint grant , uint256 question_id);
    event approve(address indexed asked_by , address indexed answered_by , uint grant , uint256 question_id , uint16 rating);
    event reject(address indexed asked_by ,address indexed answered_by, uint grant , uint256 question_id , uint16 rating);

    function getContractBalance() public view returns (uint256) {
        require(msg.sender == owner, "you are not owner");
        return address(this).balance;
    }
    function post_question( string memory _question , string[] memory _options )  public payable{

        //require(msg.value == _grant, "Incorrect Ether sent for the grant");

        Question memory new_quest = Question({
        question_id : ++currentid,
        question : _question,
        options : _options,
        correct_option : 0 ,
        comment : "Not Given",
        asked_by : msg.sender,
        answered_by : address(0) ,
        grant : msg.value,
        status : QuestionStatus.Unanswered
        });

        asked_questions[msg.sender].push(currentid);

        all_questions.push(new_quest);

        question_from_id[currentid] = new_quest;

        emit question_posted(msg.sender, msg.value, currentid);
    }
    function answer_question(uint256 _question_id , uint8 _option_number , string memory _comment  ) public{

        Question storage quest = question_from_id[_question_id];

        quest.comment = _comment;
        quest.correct_option = _option_number;
        quest.status = QuestionStatus.Pending;
        quest.answered_by = msg.sender;

        answered_questions[msg.sender].push(quest.question_id);

        emit question_answered(msg.sender, quest.grant, _question_id);

    }
    function approve_answer(uint256 _question_id) public {

        Question storage quest = question_from_id[_question_id];

        require(quest.asked_by == msg.sender, "Only owner of question is allowed to approve this");
    
        quest.status = QuestionStatus.Answered;
    
        payable(quest.answered_by).transfer(quest.grant);

        rating[msg.sender]++;
        rating[quest.answered_by]++;

        emit approve(msg.sender , quest.answered_by, quest.grant, _question_id , rating[msg.sender]);

    }
    function reject_answer(uint256 _question_id) public {

        Question storage quest = question_from_id[_question_id];

        require(quest.asked_by == msg.sender, "Only owner of question is allowed to reject this");

        quest.status = QuestionStatus.Rejected;
    
        payable(quest.asked_by).transfer(quest.grant);

        rating[msg.sender]--;
        rating[quest.answered_by]--;

        emit reject(msg.sender , quest.answered_by, quest.grant, _question_id , rating[msg.sender]);

    }
    function explorer_by_id(uint256 _question_id) public view returns (Question memory) {
        require(_question_id<=currentid , "This ID does not exist");
        return question_from_id[_question_id];
    }
    function solvable_questions() public view returns (Question[] memory) {
        return all_questions;
    }
    function asked_questions_history() public view returns (uint256[] memory) {      
        return asked_questions[msg.sender];
    }
    function solved_questions() public view returns (uint256[] memory) {
            return answered_questions[msg.sender];
    }
}