pragma solidity ^0.7.5;
pragma abicoder v2;

contract CoalSupplyChain {
    struct UserCoalState{
        uint256 quality;
        uint256 quantity;
        uint256 timestamp;
        string geostamp;
    }

    struct CoalState{
        uint256 quality;
        uint256 quantity;
        address user;
        uint256 timestamp;
        string geostamp;
    }
    
    struct UserDashboardCoal{
        uint256 quality;
        uint256 quantity;
        uint256 coalId;
        uint256 timestamp;
        string geostamp;
    }
    
    mapping(address => mapping(uint256 => UserCoalState)) usersCoal;
    mapping(address => uint256[]) usersCoalIds;
    mapping(uint256 => CoalState[]) shipments;
    
    function newShipment(uint256 coalId, uint256 _quality, uint256 _quantity, string memory _geostamp) public {
        CoalState memory coalState = CoalState({
            quality: _quality, 
            quantity: _quantity, 
            user: msg.sender,
            timestamp: block.timestamp, 
            geostamp: _geostamp
        });
        shipments[coalId].push(coalState);
        
        uint256 shipmentsListSize = shipments[coalId].length;
        for(uint i=0;i<shipmentsListSize;i++){
            address _user = shipments[coalId][i].user;
            if(usersCoal[_user][coalId].timestamp == 0)
                usersCoalIds[_user].push(coalId);
            usersCoal[_user][coalId] = UserCoalState({
                quantity: shipments[coalId][shipmentsListSize-1].quantity,
                quality: shipments[coalId][shipmentsListSize-1].quality,
                timestamp: shipments[coalId][shipmentsListSize-1].timestamp,
                geostamp: shipments[coalId][shipmentsListSize-1].geostamp
            });
        }
    }
    
    function addState(uint256 coalId, uint256 _quality, uint256 _quantity, string memory _geostamp) external {
        if(shipments[coalId].length > 0)
            newShipment(coalId, _quality, _quantity, _geostamp);
    }
    
    function viewShipment(uint256 coalId) external view returns (CoalState[] memory) {
        return shipments[coalId];
    }
    
    function viewDashboard() external view returns (UserDashboardCoal[] memory){
        UserDashboardCoal[] memory userDashboardCoal = new UserDashboardCoal[](usersCoalIds[msg.sender].length);
        for(uint256 i=0;i<usersCoalIds[msg.sender].length;i++){
            UserDashboardCoal memory coal = UserDashboardCoal({
                quality: usersCoal[msg.sender][usersCoalIds[msg.sender][i]].quality,
                quantity: usersCoal[msg.sender][usersCoalIds[msg.sender][i]].quantity,
                coalId: usersCoalIds[msg.sender][i],
                timestamp: usersCoal[msg.sender][usersCoalIds[msg.sender][i]].timestamp,
                geostamp: usersCoal[msg.sender][usersCoalIds[msg.sender][i]].geostamp
            });
            userDashboardCoal[i] = coal;
        }
        return userDashboardCoal;
    }
}