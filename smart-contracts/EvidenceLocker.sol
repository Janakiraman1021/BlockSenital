// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BlockSentinel {
    address public admin;

    struct Complaint {
        string description;
        string firIpfsHash;
        string level;
        address user;
        bool exists;
    }

    struct Evidence {
        string ipfsHash;
        uint256 uploadTime;
        uint256 unlockTime;
        address uploadedBy;
    }

    mapping(address => uint256[]) public userComplaints;
    mapping(uint256 => Complaint) public complaints;
    mapping(uint256 => Evidence[]) public complaintEvidence;
    mapping(address => bool) public authorizedPersonnel;

    uint256 public complaintCount;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this");
        _;
    }

    modifier onlyAuthorized() {
        require(authorizedPersonnel[msg.sender], "Not authorized to upload");
        _;
    }

    modifier onlyComplaintOwner(uint256 id) {
        require(complaints[id].user == msg.sender, "Not your complaint");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    // User registers a complaint
    function registerComplaint(string memory desc) external returns (uint256) {
        complaintCount++;
        complaints[complaintCount] = Complaint(desc, "", "", msg.sender, true);
        userComplaints[msg.sender].push(complaintCount);
        return complaintCount;
    }

    // User updates their complaint
    function updateComplaint(uint256 id, string memory newDesc) external onlyComplaintOwner(id) {
        complaints[id].description = newDesc;
    }

    // Authorized person uploads evidence with IPFS hash and unlock time stored on-chain
    function uploadEvidence(uint256 id, string memory ipfsHash, uint256 unlockTime) external onlyAuthorized {
        require(complaints[id].exists, "Complaint doesn't exist");
        complaintEvidence[id].push(Evidence(ipfsHash, block.timestamp, unlockTime, msg.sender));
    }

    // Authorized person uploads FIR (IPFS hash stored on-chain)
    function uploadFIR(uint256 id, string memory firHash) external onlyAuthorized {
        require(complaints[id].exists, "Complaint doesn't exist");
        complaints[id].firIpfsHash = firHash;
    }

    // Admin sets complaint level
    function setComplaintLevel(uint256 id, string memory level) external onlyAdmin {
        require(complaints[id].exists, "Complaint doesn't exist");
        complaints[id].level = level;
    }

    // Admin adds/removes authorized personnel
    function setAuthorizedPersonnel(address person, bool status) external onlyAdmin {
        authorizedPersonnel[person] = status;
    }

    // View all complaints of the user
    function getMyComplaints() external view returns (uint256[] memory) {
        return userComplaints[msg.sender];
    }

    // View evidence for a specific complaint
    function getEvidence(uint256 id) external view returns (Evidence[] memory) {
        require(
            msg.sender == admin ||
            complaints[id].user == msg.sender,
            "Access denied"
        );
        return complaintEvidence[id];
    }

    // View complaint details (admin or owner)
    function getComplaint(uint256 id) external view returns (Complaint memory) {
        require(
            msg.sender == admin ||
            complaints[id].user == msg.sender,
            "Access denied"
        );
        return complaints[id];
    }
}
