// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

import "./interfaces/IMetadataPrinter.sol";

error Unauthorized();

contract BadgeOfAssembly is ERC1155, AccessControl, Ownable {
    using Counters for Counters.Counter;
    using EnumerableSet for EnumerableSet.UintSet;

    struct BadgeMetadata {
        string name;
        string description;
        string image;
        string animationUrl;
        string youtubeUrl;
        address minter;
    }

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    string public _contractURI =
        "https://badge-of-assembly.netlify.app/api/boa";

    IMetadataPrinter private _metadataPrinter;
    Counters.Counter private _tokenId;
    mapping(address => EnumerableSet.UintSet) private _userTokens;
    mapping(address => EnumerableSet.UintSet) private _badgeAdmin;

    mapping(uint256 => BadgeMetadata) public metadata;

    constructor(address metadataPrinter) ERC1155("") {
        _setupRole(MINTER_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);
        _transferOwnership(msg.sender);
        _metadataPrinter = IMetadataPrinter(metadataPrinter);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(AccessControl, ERC1155)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function contractURI() public view returns (string memory) {
        return _contractURI;
    }

    function setContractURI(string calldata newContractURI)
        external
        returns (bool)
    {
        if (!hasRole(ADMIN_ROLE, msgSender())) {
            revert Unauthorized();
        }
        _contractURI = newContractURI;
        return true;
    }

    function setMetadataPrinter(address newContract) external returns (bool) {
        if (!hasRole(ADMIN_ROLE, msgSender())) {
            revert Unauthorized();
        }
        _metadataPrinter = IMetadataPrinter(newContract);
        return true;
    }

    function uri(uint256 tokenID) public view override returns (string memory) {
        return _metadataPrinter.metadata(tokenID);
    }

    function setup(BadgeMetadata calldata _metadata, uint256 initialSupply)
        external
        returns (uint256)
    {
        _tokenId.increment();
        uint256 nextId = _tokenId.current();
        address sender = msgSender();
        metadata[nextId] = _metadata;
        metadata[nextId].minter = sender;
        if (initialSupply > 0) {
            _mint(sender, nextId, initialSupply, "");
            _userTokens[sender].add(nextId);
        }
        _badgeAdmin[sender].add(nextId);
        return nextId;
    }

    function mint(
        address to,
        uint256 tokenID,
        uint256 amount
    ) public returns (bool) {
        BadgeMetadata storage meta = metadata[tokenID];
        if (meta.minter != msgSender()) {
            revert Unauthorized();
        }
        _mint(to, tokenID, amount, "");
        _userTokens[msgSender()].add(tokenID);
        return true;
    }

    function changeMinter(uint256 tokenID, address newMinter)
        public
        returns (bool)
    {
        BadgeMetadata storage meta = metadata[tokenID];
        address sender = msgSender();
        if (meta.minter != sender) {
            revert Unauthorized();
        }
        _badgeAdmin[meta.minter].remove(tokenID);
        meta.minter = newMinter;
        _badgeAdmin[newMinter].add(tokenID);

        return true;
    }

    function userTokens(address userId)
        external
        view
        returns (uint256[] memory)
    {
        return _userTokens[userId].values();
    }

    function tokenAdminOf(address user)
        external
        view
        returns (uint256[] memory)
    {
        return _badgeAdmin[user].values();
    }

    function updateMetadata(uint256 tokenID, BadgeMetadata calldata newMetadata) external returns (bool) {
        BadgeMetadata storage existingMetadata = metadata[tokenID];

        if (existingMetadata.minter != msgSender()) {
            revert Unauthorized();
        }
        metadata[tokenID] = newMetadata;

        return true;
    }

    function msgSender() private view returns (address) {
        return msg.sender;
    }
}
