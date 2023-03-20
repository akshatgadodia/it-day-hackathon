// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract BlockEstate {
    address contractOwner;
    uint inspectorsCount;
    uint public userCount;
    uint public landsCount;
    uint public documentId;
    uint requestCount;

    constructor() public {
        contractOwner = msg.sender;
    }

    struct LandRegistration {
        uint id;
        uint area;
        string landAddress;
        uint landPrice;
        string allLatitudeLongitude;
        uint propertyPID;
        string physicalSurveyNumber;
        string document;
        bool isforSell;
        address payable ownerAddress;
        bool isLandVerified;
    }

    struct UserDetails {
        address id;
        string name;
        uint age;
        string city;
        string aadharNumber;
        string panNumber;
        string document;
        string email;
        bool isUserVerified;
    }

    struct LandInspector {
        uint id;
        address _addr;
        string name;
        uint age;
        string designation;
        string city;
    }

    struct LandRequest {
        uint reqId;
        address payable sellerId;
        address payable buyerId;
        uint landId;
        reqStatus requestStatus;
        bool isPaymentDone;
    }

    enum reqStatus {requested, accepted, rejected, paymentdone, commpleted}

    mapping(address => LandInspector) public InspectorMapping;
    mapping(uint => address[]) AllLandInspectorList;
    mapping(address => bool)  RegisteredInspectorMapping;
    mapping(address => UserDetails) public UserMapping;
    mapping(uint => address)  AllUsers;
    mapping(uint => address[])  AllUsersList;
    mapping(address => bool)  RegisteredUserMapping;
    mapping(address => uint[])  MyLands;
    mapping(uint => LandRegistration) public Lands;
    mapping(uint => LandRequest) public LandRequestMapping;
    mapping(address => uint[])  MyReceivedLandRequest;
    mapping(address => uint[])  MySentLandRequest;
    mapping(uint => uint[])  AllLandList;
    mapping(uint => uint[])  PaymentDoneList;

    function isContractOwner(address _addr) public view returns(bool){
        if(_addr==contractOwner)
            return true;
        else
            return false;
    }

    function changeContractOwner(address _addr)public {
        require(msg.sender==contractOwner,"you are not contractOwner");
        contractOwner=_addr;
    }

    //-----------------------------------------------LandInspector-----------------------------------------------

    function addLandInspector(address _addr,string memory _name, uint _age, string memory _designation,string memory _city) public returns(bool){
        if(contractOwner!=msg.sender)
            return false;
        require(contractOwner==msg.sender);
        RegisteredInspectorMapping[_addr]=true;
        AllLandInspectorList[1].push(_addr);
        InspectorMapping[_addr] = LandInspector(inspectorsCount,_addr,_name, _age, _designation,_city);
        return true;
    }

    function isLandInspector(address _id) public view returns (bool) {
        if(RegisteredInspectorMapping[_id]){
            return true;
        } else {
            return false;
        }
    }

    function ReturnAllLandIncpectorList() public view returns(address[] memory)
    {
        return AllLandInspectorList[1];
    }

    function removeLandInspector(address _addr) public {
        require(msg.sender==contractOwner,"You are not contractOwner");
        require(RegisteredInspectorMapping[_addr],"Land Inspector not found");
        RegisteredInspectorMapping[_addr]=false;

        uint len=AllLandInspectorList[1].length;
        for(uint i=0;i<len;i++) {
            if(AllLandInspectorList[1][i]==_addr) {
                AllLandInspectorList[1][i]=AllLandInspectorList[1][len-1];
                AllLandInspectorList[1].pop();
                break;
            }
        }
    }

    //-----------------------------------------------UserDetails-----------------------------------------------

    function registerUser(string memory _name, uint _age, string memory _city,string memory _aadharNumber, string memory _panNumber, string memory _document, string memory _email
    ) public {
        require(!RegisteredUserMapping[msg.sender]);

        RegisteredUserMapping[msg.sender] = true;
        userCount++;
        AllUsersList[1].push(msg.sender);
        AllUsers[userCount]=msg.sender;
        UserMapping[msg.sender] = UserDetails(msg.sender, _name, _age, _city,_aadharNumber,_panNumber, _document,_email,false);
    }

    function isUserRegistered(address _addr) public view returns(bool) {
        if (RegisteredUserMapping[_addr]) {
            return true;
        } else {
            return false;
        }
    }

    function verifyUser(address _userId) public {
        require(isLandInspector(msg.sender));
        UserMapping[_userId].isUserVerified=true;
    }

    function isUserVerified(address id) public view returns(bool) {
        return UserMapping[id].isUserVerified;
    }

    function ReturnAllUserList() public view returns(address[] memory) {
        return AllUsersList[1];
    }

    //-----------------------------------------------Land-----------------------------------------------
    function addLand(uint _area, string memory _address, uint landPrice,string memory _allLatiLongi, uint _propertyPID,string memory _surveyNum, string memory _document) public {
        require(isUserVerified(msg.sender));
        landsCount++;
        Lands[landsCount] = LandRegistration(landsCount, _area, _address, landPrice,_allLatiLongi,_propertyPID, _surveyNum , _document,false,msg.sender,false);
        MyLands[msg.sender].push(landsCount);
        AllLandList[1].push(landsCount);
    }

    function ReturnAllLandList() public view returns(uint[] memory) {
        return AllLandList[1];
    }

    function verifyLand(uint _id) public {
        require(isLandInspector(msg.sender));
        Lands[_id].isLandVerified=true;
    }

    function isLandVerified(uint id) public view returns(bool) {
        return Lands[id].isLandVerified;
    }

    function myAllLands(address id) public view returns( uint[] memory) {
        return MyLands[id];
    }

    function makeItforSell(uint id) public {
        require(Lands[id].ownerAddress==msg.sender);
        Lands[id].isforSell=true;
    }

    function requestforBuy(uint _landId) public {
        require(isUserVerified(msg.sender) && isLandVerified(_landId));
        requestCount++;
        LandRequestMapping[requestCount]=LandRequest(requestCount,Lands[_landId].ownerAddress,msg.sender,_landId,reqStatus.requested,false);
        MyReceivedLandRequest[Lands[_landId].ownerAddress].push(requestCount);
        MySentLandRequest[msg.sender].push(requestCount);
    }

    function myReceivedLandRequests() public view returns(uint[] memory) {
        return MyReceivedLandRequest[msg.sender];
    }

    function mySentLandRequests() public view returns(uint[] memory) {
        return MySentLandRequest[msg.sender];
    }

    function acceptRequest(uint _requestId) public {
        require(LandRequestMapping[_requestId].sellerId==msg.sender);
        LandRequestMapping[_requestId].requestStatus=reqStatus.accepted;
    }

    function rejectRequest(uint _requestId) public {
        require(LandRequestMapping[_requestId].sellerId==msg.sender);
        LandRequestMapping[_requestId].requestStatus=reqStatus.rejected;
    }

    function requesteStatus(uint id) public view returns(bool) {
        return LandRequestMapping[id].isPaymentDone;
    }

    function landPrice(uint id) public view returns(uint) {
        return Lands[id].landPrice;
    }

    function makePayment(uint _requestId) public payable {
        require(LandRequestMapping[_requestId].buyerId==msg.sender && LandRequestMapping[_requestId].requestStatus==reqStatus.accepted);

        LandRequestMapping[_requestId].requestStatus=reqStatus.paymentdone;
        Lands[LandRequestMapping[_requestId].landId].ownerAddress.transfer(msg.value);
        LandRequestMapping[_requestId].isPaymentDone=true;
        PaymentDoneList[1].push(_requestId);
    }

    function returnPaymentDoneList() public view returns(uint[] memory) {
        return PaymentDoneList[1];
    }

    function transferOwnership(uint _requestId, string memory documentUrl) public returns(bool) {
        require(isLandInspector(msg.sender));
        
        if(LandRequestMapping[_requestId].isPaymentDone==false)
            return false;

        documentId++;
        LandRequestMapping[_requestId].requestStatus=reqStatus.commpleted;
        MyLands[LandRequestMapping[_requestId].buyerId].push(LandRequestMapping[_requestId].landId);

        uint len=MyLands[LandRequestMapping[_requestId].sellerId].length;
        for(uint i=0;i<len;i++) {
            if(MyLands[LandRequestMapping[_requestId].sellerId][i]==LandRequestMapping[_requestId].landId) {
                MyLands[LandRequestMapping[_requestId].sellerId][i]=MyLands[LandRequestMapping[_requestId].sellerId][len-1];
                MyLands[LandRequestMapping[_requestId].sellerId].pop();
                break;
            }
        }
        Lands[LandRequestMapping[_requestId].landId].document=documentUrl;
        Lands[LandRequestMapping[_requestId].landId].isforSell=false;
        Lands[LandRequestMapping[_requestId].landId].ownerAddress=LandRequestMapping[_requestId].buyerId;
        return true;
    }
}